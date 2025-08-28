import connectDB from '@/lib/connectDB';
import SubscriptionPlan from '@/models/subscriptionPlan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick } from '@/utils/apiHelpers';

export async function POST(req) {
   try {
      await connectDB();
      await requireRole(req, ['SuperAdmin'], getRequester);

      const body = await req.json();

      const allowed = [
         'key', 'name', 'description', 'currency', 'price', 'interval', 'trialDays',
         'stripePriceId', 'stripeProductId', 'features', 'limits', 'status'
      ];
      const data = pick(body, allowed);

      // minimal server-side validation
      if (!data.key || !data.name || typeof data.price !== 'number') {
         return apiResponse.error('Bad Request', { error: 'key, name, price are required' }, 400);
      }

      const created = await SubscriptionPlan.create(data);
      return apiResponse.success({ plan: created }, 'Subscription plan created', 201);
   } catch (err) {
      if (err.code === 11000) {
         return apiResponse.error('Conflict', { error: 'Plan key already exists' }, 409);
      }
      const status = err.status || 500;
      const name = status === 500 ? 'Server Error' : 'Error';
      return apiResponse.error(name, { error: err.message }, status);
   }
}
