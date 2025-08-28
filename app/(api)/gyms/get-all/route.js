// app/(api)/gyms/get-all/route.js
import connectDB from '@/lib/connectDB';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, parsePagination } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      // Only SuperAdmin can list all gyms
      await requireRole(req, ['SuperAdmin'], getRequester);

      const { page, limit, q, status } = parsePagination(req.url);
      const filter = {};
      if (status) filter.status = status;
      if (q) {
         filter.$or = [
            { name: { $regex: q, $options: 'i' } },
            { subdomain: { $regex: q, $options: 'i' } },
            { gym_identifier: { $regex: q, $options: 'i' } },
            { code: { $regex: q, $options: 'i' } },
         ];
      }

      const total = await Gym.countDocuments(filter);
      const gyms = await Gym.find(filter)
         .sort({ createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .lean();

      return apiResponse.success(
         { gyms, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
         'Gyms retrieved successfully'
      );
   } catch (err) {
      return apiResponse.error(err.status ? 'Error' : 'Server Error', { error: err.message }, err.status || 500);
   }
}
