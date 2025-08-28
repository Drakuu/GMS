import connectDB from '@/lib/connectDB';
import MembershipPlan from '@/models/membershipplan.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick } from '@/utils/apiHelpers';

export async function PATCH(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id) return apiResponse.error('Bad Request', { error: 'id is required' }, 400);

      const plan = await MembershipPlan.findById(id);
      if (!plan) return apiResponse.error('Not Found', { error: 'Plan not found' }, 404);

      // Admin may only update a plan in their own gym
      const role = (requester.role || requester.user_role || '').toString();
      if (role === 'Admin') {
         const gym = await Gym.findById(plan.gymId).select('ownerUserId');
         if (!gym) return apiResponse.error('Bad Request', { error: 'Gym missing for plan' }, 400);
         if (String(gym.ownerUserId) !== String(requester._id || requester.id)) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }
      }

      const body = await req.json();
      const allowed = [
         // gymId cannot be changed via normal update
         'name', 'description', 'applicableTo', 'currency', 'price', 'signupFee', 'taxPercent',
         'duration', 'sessionsIncluded', 'classBookingsPerWeek', 'visitsPerWeek', 'multiBranchAccess',
         'allowedHours', 'freezePolicy', 'renewalGraceDays', 'lateCancelFee', 'bookingWindowDays',
         'status', 'isFeatured', 'order', 'benefits', 'tags', 'colorHex'
      ];
      const data = pick(body, allowed);

      Object.assign(plan, data);
      await plan.save();

      return apiResponse.success({ plan }, 'Membership plan updated');
   } catch (err) {
      const status = err.code === 11000 ? 409 : (err.status || 500);
      const msg = err.code === 11000 ? 'Duplicate plan name for this gym' : err.message;
      return apiResponse.error(status === 500 ? 'Server Error' : 'Error', { error: msg }, status);
   }
}
