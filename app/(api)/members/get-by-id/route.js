import connectDB from '@/lib/connectDB';
import Member from '@/models/member.model';
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

      const doc = await Member.findById(id)
         .populate({ path: 'userId', select: 'user_name user_email user_phone user_identifier user_role' })
         .lean();
      if (!doc) return apiResponse.error('Not Found', { error: 'Member not found' }, 404);

      const role = (requester.role || requester.user_role || '').toString();
      if (role === 'Admin') {
         const gym = await Gym.findById(doc.gymId).select('ownerUserId');
         if (!gym) return apiResponse.error('Bad Request', { error: 'Gym missing' }, 400);
         if (String(gym.ownerUserId) !== String(requester._id || requester.id)) {
            return apiResponse.error('Forbidden', { error: 'Not your gym' }, 403);
         }
      }

      return apiResponse.success({ member: doc }, 'Member retrieved successfully');
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
