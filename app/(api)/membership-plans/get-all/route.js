import connectDB from '@/lib/connectDB';
import MembershipPlan from '@/models/membershipplan.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, parsePagination, } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { page, limit, q, status, searchParams } = parsePagination(req.url);
      const gymId = searchParams.get('gymId');
      const applicable = searchParams.get('applicableTo'); // 'member' | 'trainer'

      if (!gymId) return apiResponse.error('Bad Request', { error: 'gymId is required' }, 400);

      // Admin can only read their own gym
      const role = (requester.role || requester.user_role || '').toString();
      if (role === 'Admin') {
         const gym = await Gym.findById(gymId).select('ownerUserId');
         if (!gym) return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);
         if (String(gym.ownerUserId) !== String(requester._id || requester.id)) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }
      }

      const filter = { gymId };
      if (status) filter.status = status;
      if (applicable) filter.applicableTo = applicable;
      if (q) {
         filter.$or = [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $regex: q, $options: 'i' } },
         ];
      }

      const total = await MembershipPlan.countDocuments(filter);
      const plans = await MembershipPlan.find(filter)
         .sort({ order: 1, createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .lean();

      return apiResponse.success(
         { plans, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
         'Membership plans retrieved successfully'
      );
   } catch (err) {
      return apiResponse.error(err.status ? 'Error' : 'Server Error', { error: err.message }, err.status || 500);
   }
}
