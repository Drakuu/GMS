import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Trainer from '@/models/trainer.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
         return apiResponse.error('Bad Request', { error: 'Valid id is required' }, 400);
      }

      // 1) Load minimal trainer first (for auth)
      const trainerLite = await Trainer.findById(id).select('gymId').lean();
      if (!trainerLite) return apiResponse.error('Not Found', { error: 'Trainer not found' }, 404);

      const role = String(requester.role || requester.user_role || '');
      if (role === 'Admin') {
         const tokenGymId = requester.gym_id ? String(requester.gym_id) : null;
         if (!tokenGymId) {
            return apiResponse.error('Conflict', { error: 'Admin has no assigned gym' }, 409);
         }

         // Token gym must match trainer's gym
         if (String(trainerLite.gymId) !== tokenGymId) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }

         // (Optional) Also verify this gym exists and is owned by the admin, if that’s part of your policy
         // If you only rely on tokenGymId, you can remove this block.
         const gym = await Gym.findById(trainerLite.gymId).select('ownerUserId').lean();
         if (!gym) return apiResponse.error('Bad Request', { error: 'Gym missing' }, 400);
         const requesterId = String(requester.id || '');
         const isOwner = gym.ownerUserId && String(gym.ownerUserId) === requesterId;
         // If you require ownership, uncomment the next line:
         // if (!isOwner) return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
      }

      // 2) Authorized — fetch full doc with populates
      const doc = await Trainer.findById(id)
         .populate({ path: 'userId', select: 'user_name user_email user_phone user_identifier user_role' })
         .populate({ path: 'assignedMembers', select: 'user_identifier gymId status' })
         .lean();

      // It could have been deleted between the two reads
      if (!doc) return apiResponse.error('Not Found', { error: 'Trainer not found' }, 404);

      return apiResponse.success({ trainer: doc }, 'Trainer retrieved successfully');
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
