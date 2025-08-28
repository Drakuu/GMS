// app/(api)/gyms/update/route.js
import connectDB from '@/lib/connectDB';
import Gym from '@/models/gym.model';
import SubscriptionPlan from '@/models/subscriptionPlan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick, canManageGym } from '@/utils/apiHelpers';

export async function PATCH(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id) return apiResponse.error('Bad Request', { error: 'id is required' }, 400);

      const gym = await Gym.findById(id);
      if (!gym) return apiResponse.error('Not Found', { error: 'Gym not found' }, 404);

      if (!canManageGym(requester, gym)) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      const body = await req.json();
      const allowed = [
         'name', 'subdomain', 'code', 'phone', 'email', 'logoUrl', 'address',
         'timezone', 'currency', 'locale', 'status', 'notes',
         // optionally switch plan
         'planId',
         // optionally override features/limits if SuperAdmin
         'features', 'limits'
      ];
      const data = pick(body, allowed);

      // If planId is provided, switch platform plan and refresh features/limits
      if (data.planId) {
         const plan = await SubscriptionPlan.findById(data.planId).lean();
         if (!plan) return apiResponse.error('Bad Request', { error: 'Invalid planId' }, 400);

         gym.subscription = {
            ...(gym.subscription || {}),
            planId: plan._id,
            // keep stripe fields as-is unless you re-checkout; you can update stripePriceId if needed
            stripePriceId: plan.stripePriceId || gym.subscription?.stripePriceId,
         };
         gym.features = plan.features;
         gym.limits = plan.limits;
         delete data.planId;
      }

      // Only SuperAdmin may set features/limits directly
      const role = (requester.role || requester.user_role || '').toString();
      if (data.features && role !== 'SuperAdmin') delete data.features;
      if (data.limits && role !== 'SuperAdmin') delete data.limits;

      Object.assign(gym, data);
      const saved = await gym.save();

      return apiResponse.success({ gym: saved }, 'Gym updated');
   } catch (err) {
      const status = err.status || (err.code === 11000 ? 409 : 500);
      const msg = err.code === 11000 ? 'Duplicate subdomain/code/gym_identifier' : err.message;
      return apiResponse.error(status === 500 ? 'Server Error' : 'Error', { error: msg }, status);
   }
}
