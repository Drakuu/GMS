import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Member from '@/models/member.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, parsePagination } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);
      const role = String(requester.role || requester.user_role || '');
      const requesterId = String(requester.id || '');

      const { page, limit, q, status, searchParams } = parsePagination(req.url);
      const gymIdParam = searchParams.get('gymId');

      let gymIdToUse;

      if (role === 'Admin') {
         // Prefer token’s gym; allow ?gymId= only if it matches the token
         const tokenGymId = requester.gym_id ? String(requester.gym_id) : null;
         if (!tokenGymId && !gymIdParam) {
            return apiResponse.error('Conflict', { error: 'Admin has no assigned gym' }, 409);
         }
         if (gymIdParam && tokenGymId && String(gymIdParam) !== tokenGymId) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }
         gymIdToUse = gymIdParam || tokenGymId;
      } else {
         // SuperAdmin must provide a gymId (you can relax this if you want “all gyms”)
         if (!gymIdParam) {
            return apiResponse.error('Bad Request', { error: 'gymId is required' }, 400);
         }
         gymIdToUse = gymIdParam;
      }

      if (!mongoose.Types.ObjectId.isValid(gymIdToUse)) {
         return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);
      }
      const gid = new mongoose.Types.ObjectId(gymIdToUse);

      // If Admin, you may also verify ownership OR same-gym if you want to be strict:
      // (Optional) ensure the gym exists and (optionally) belongs to the admin
      if (role === 'Admin') {
         const gym = await Gym.findById(gid).select('ownerUserId').lean();
         if (!gym) return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);

         // Allow either owner OR same-gym (token already ensured same-gym above)
         const isOwner = gym.ownerUserId && String(gym.ownerUserId) === requesterId;
         // If you only want owners, uncomment:
         // if (!isOwner) return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
      }

      // Build filter
      const filter = { gymId: gid };
      if (status) filter.status = status;
      if (q) {
         filter.$or = [
            { notes: { $regex: q, $options: 'i' } },
            // add more member fields here if you want server-side search on this collection
         ];
      }

      const [total, members] = await Promise.all([
         Member.countDocuments(filter),
         Member.find(filter)
            .populate({
               path: 'userId',
               select: 'user_name user_email user_phone user_identifier user_role',
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
      ]);

      return apiResponse.success(
         { members, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
         'Members retrieved successfully'
      );
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
