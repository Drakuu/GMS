import connectDB from '@/lib/connectDB';
import SubscriptionPlan from '@/models/subscriptionPlan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, parsePagination } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();

      // SuperAdmin and Admin can read
      await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { page, limit, q, status } = parsePagination(req.url);

      const filter = {};
      if (status) filter.status = status;
      if (q) {
         filter.$or = [
            { key: { $regex: q, $options: 'i' } },
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
         ];
      }

      const total = await SubscriptionPlan.countDocuments(filter);
      const plans = await SubscriptionPlan.find(filter)
         .sort({ createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .lean();

      return apiResponse.success(
         { plans, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
         'Plans retrieved successfully'
      );
   } catch (err) {
      const status = err.status || 500;
      const name = status === 500 ? 'Server Error' : 'Error';
      return apiResponse.error(name, { error: err.message }, status);
   }
}
