import connectDB from '@/lib/connectDB';
import MembershipPlan from '@/models/membershipplan.model';
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
      if (!id) return apiResponse.error('Bad Request', { error: 'id is required' }, 400);

      const plan = await MembershipPlan.findById(id).lean();
      if (!plan) return apiResponse.error('Not Found', { error: 'Plan not found' }, 404);

      const role = (requester.role || requester.user_role || '').toString();
      if (role === 'Admin') {
         const gym = await Gym.findById(plan.gymId).select('ownerUserId');
         if (!gym) return apiResponse.error('Bad Request', { error: 'Gym missing for plan' }, 400);
         if (String(gym.ownerUserId) !== String(requester._id || requester.id)) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }
      }

      return apiResponse.success({ plan }, 'Membership plan retrieved successfully');
   } catch (err) {
      return apiResponse.error(err.status ? 'Error' : 'Server Error', { error: err.message }, err.status || 500);
   }
}
