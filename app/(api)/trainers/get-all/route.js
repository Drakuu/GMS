import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Trainer from '@/models/trainer.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, parsePagination } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const role = String(requester.role || requester.user_role || '');
      const { page, limit, q, status, searchParams } = parsePagination(req.url);
      const gymIdParam = searchParams.get('gymId');

      // Resolve gymId
      let gymIdToUse;
      if (role === 'Admin') {
         const tokenGymId = requester.gym_id ? String(requester.gym_id) : null;
         if (!tokenGymId) {
            return apiResponse.error('Conflict', { error: 'Admin has no assigned gym' }, 409);
         }
         // If Admin passes a gymId, it must match their token
         if (gymIdParam && tokenGymId !== String(gymIdParam)) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }
         gymIdToUse = tokenGymId;
      } else {
         // SuperAdmin: require explicit gymId (change this if you want “all gyms”)
         if (!gymIdParam) {
            return apiResponse.error('Bad Request', { error: 'gymId is required' }, 400);
         }
         gymIdToUse = String(gymIdParam);
      }

      if (!mongoose.Types.ObjectId.isValid(gymIdToUse)) {
         return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);
      }
      const gid = new mongoose.Types.ObjectId(gymIdToUse);

      // Verify gym exists (cheap guard)
      const gym = await Gym.findById(gid).select('_id ownerUserId').lean();
      if (!gym) return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);

      // Build filter
      const filter = { gymId: gid };
      if (status) filter.status = status;
      if (q) {
         filter.$or = [
            { notes: { $regex: q, $options: 'i' } },
            // specialization is an array of strings; regex works against array elements
            { specialization: { $regex: q, $options: 'i' } },
         ];
      }

      const [total, trainers] = await Promise.all([
         Trainer.countDocuments(filter),
         Trainer.find(filter)
            .populate({ path: 'userId', select: 'user_name user_email user_phone user_identifier user_role' })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
      ]);

      return apiResponse.success(
         { trainers, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
         'Trainers retrieved successfully'
      );
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
