import connectDB from '@/lib/connectDB';
import SubscriptionPlan from '@/models/subscriptionPlan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id) return apiResponse.error('Bad Request', { error: 'id is required' }, 400);

      const plan = await SubscriptionPlan.findById(id).lean();
      if (!plan) return apiResponse.error('Not Found', { error: 'Plan not found' }, 404);

      return apiResponse.success({ plan }, 'Plan retrieved successfully');
   } catch (err) {
      const status = err.status || 500;
      const name = status === 500 ? 'Server Error' : 'Error';
      return apiResponse.error(name, { error: err.message }, status);
   }
}
