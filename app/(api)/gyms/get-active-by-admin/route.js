// app/(api)/gyms/get-active-by-admin/route.js
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole } from '@/utils/apiHelpers';

function resolveUserId(r) {
   return (
      r?.id ||
      r?._id ||
      r?.user?.id ||
      r?.user?._id ||
      r?.userId ||
      r?.uid ||
      ''
   );
}

export async function GET(req) {
   try {
      await connectDB();

      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);
      const role = String(requester?.role || requester?.user_role || '').trim();

      const { searchParams } = new URL(req.url);
      // support both ?id= and ?adminId=
      const queryId = searchParams.get('id') || searchParams.get('adminId');

      // default to the id from token
      let adminId = String(resolveUserId(requester));

      if (role === 'SuperAdmin' && queryId) {
         adminId = queryId;
      } else if (role === 'Admin' && queryId && queryId !== adminId) {
         return apiResponse.error('Forbidden', { error: 'Not allowed for this id' }, 403);
      }

      if (!adminId) {
         return apiResponse.error('Bad Request', { error: 'adminId could not be resolved' }, 400);
      }
      if (!mongoose.Types.ObjectId.isValid(adminId)) {
         return apiResponse.error('Bad Request', { error: 'Invalid adminId' }, 400);
      }

      const adminObjectId = new mongoose.Types.ObjectId(adminId);

      const filter = {
         $and: [
            { ownerUserId: adminObjectId },
            { $or: [{ isActive: true }, { status: 'Active' }] },
            { $or: [{ isDeleted: { $ne: true } }, { deleted: { $ne: true } }] },
         ],
      };

      const gym = await Gym.findOne(filter)
         .lean()
         .select('_id name gym_identifier ownerUserId isActive status createdAt updatedAt');

      if (!gym) {
         return apiResponse.error('Error', { error: 'No active gym found for this admin' }, 400);
      }
      // console.log('requester keys', Object.keys(requester || {}), requester);

      return apiResponse.success({ gym }, 'Active gym retrieved successfully');
   } catch (err) {
      return apiResponse.error(
         err.status ? 'Error' : 'Server Error',
         { error: err.message },
         err.status || 500
      );
   }
}
