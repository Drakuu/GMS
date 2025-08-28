import connectDB from '@/lib/connectDB';
import SubscriptionPlan from '@/models/subscriptionPlan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick } from '@/utils/apiHelpers';

export async function PATCH(req) {
   try {
      await connectDB();
      await requireRole(req, ['SuperAdmin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id) return apiResponse.error('Bad Request', { error: 'id is required' }, 400);

      const body = await req.json();

      const allowed = [
         'name', 'description', 'currency', 'price', 'interval', 'trialDays',
         'stripePriceId', 'stripeProductId', 'features', 'limits', 'status'
         // 'key' is intentionally NOT updatable to keep URLs/config stable.
      ];
      const data = pick(body, allowed);

      const updated = await SubscriptionPlan.findByIdAndUpdate(
         id,
         { $set: data },
         { new: true, runValidators: true }
      ).lean();

      if (!updated) return apiResponse.error('Not Found', { error: 'Plan not found' }, 404);

      return apiResponse.success({ plan: updated }, 'Subscription plan updated');
   } catch (err) {
      const status = err.status || 500;
      const name = status === 500 ? 'Server Error' : 'Error';
      return apiResponse.error(name, { error: err.message }, status);
   }
}
