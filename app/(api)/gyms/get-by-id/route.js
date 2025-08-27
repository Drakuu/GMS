// app/(api)/gyms/get-by-id/route.js
import connectDB from '@/lib/connectDB';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, } from '@/utils/apiHelpers';

export async function GET(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id) return apiResponse.error('Bad Request', { error: 'id is required' }, 400);

      const gym = await Gym.findById(id).lean();
      if (!gym) return apiResponse.error('Not Found', { error: 'Gym not found' }, 404);

      // Admin can only fetch own gym
      const role = (requester.role || requester.user_role || '').toString();
      if (role === 'Admin' && String(gym.ownerUserId) !== String(requester._id || requester.id)) {
         return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
      }

      return apiResponse.success({ gym }, 'Gym retrieved successfully');
   } catch (err) {
      return apiResponse.error(err.status ? 'Error' : 'Server Error', { error: err.message }, err.status || 500);
   }
}
