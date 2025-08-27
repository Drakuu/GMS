import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester, pickUserForToken } from '@/utils/authControllerUtils';
import { requireRole } from '@/utils/apiHelpers';

export async function PATCH(req) {
   try {
      await connectDB();

      // auth
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      // id from query
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
         return apiResponse.error('Bad Request', { error: 'Valid user id is required' }, 400);
      }

      // parse body
      const body = await req.json();
      if (!body || typeof body !== 'object') {
         return apiResponse.error('Bad Request', { error: 'Body is required' }, 400);
      }

      // whitelist updatable fields
      const allowed = [
         'user_name',
         'user_email',
         'user_phone',
         'user_role',
         'is_verified',
         'isDeleted',
         'gym_id', // <-- IMPORTANT
      ];
      const update = {};

      for (const key of allowed) {
         if (body[key] !== undefined) update[key] = body[key];
      }

      // Cast/normalize gym_id if present
      if (update.gym_id !== undefined) {
         // Allow null to clear
         if (update.gym_id === null || update.gym_id === 'null' || update.gym_id === '') {
            update.gym_id = null;
         } else {
            if (!mongoose.Types.ObjectId.isValid(update.gym_id)) {
               return apiResponse.error('Bad Request', { error: 'Invalid gym_id' }, 400);
            }

            // Optional: verify the gym exists (and optionally active)
            const gym = await Gym.findById(update.gym_id).select('_id isActive status ownerUserId');
            if (!gym) {
               return apiResponse.error('Error', { error: 'Gym not found' }, 400);
            }
            // If Admin role, ensure they own that gym
            const role = String(requester.role || requester.user_role || '');
            if (
               role === 'Admin' &&
               String(gym.ownerUserId) !== String(requester._id || requester.id)
            ) {
               return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
            }

            update.gym_id = new mongoose.Types.ObjectId(update.gym_id);
         }
      }

      if (!Object.keys(update).length) {
         return apiResponse.error('Bad Request', { error: 'No fields to update' }, 400);
      }

      const updated = await User.findByIdAndUpdate(
         id,
         { $set: update },
         { new: true, runValidators: true, context: 'query' }
      )
         // ensure gym_id is included in projection
         .select(
            '_id user_identifier user_name user_email user_phone user_role gym_id otp_attempts login_attempts is_verified isDeleted login_history audit_logs createdAt updatedAt last_login'
         )
         .lean();

      if (!updated) {
         return apiResponse.error('Not Found', { error: 'User not found' }, 404);
      }

      return apiResponse.success({ user: updated }, 'User updated successfully');
   } catch (err) {
      return apiResponse.error(
         err.status ? 'Error' : 'Server Error',
         { error: err.message },
         err.status || 500
      );
   }
}
