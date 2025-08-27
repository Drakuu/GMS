import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Member from '@/models/member.model';
import MembershipPlan from '@/models/membershipplan.model';
import Gym from '@/models/gym.model';
import User from '@/models/user.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick, canManageGym } from '@/utils/apiHelpers';

export async function PATCH(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
         return apiResponse.error('Bad Request', { error: 'Valid id is required' }, 400);
      }

      // Load member & gym for permission checks
      const memberDoc = await Member.findById(id);
      if (!memberDoc) return apiResponse.error('Not Found', { error: 'Member not found' }, 404);

      const gym = await Gym.findById(memberDoc.gymId).select('_id ownerUserId status').lean();
      if (!gym) return apiResponse.error('Bad Request', { error: 'Gym missing' }, 400);

      if (!canManageGym(requester, gym)) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      // Parse body: support both { user, member } and legacy flat body
      const body = await req.json();
      const userPayload = body?.user || {};
      const memberPayload = body?.member ?? body ?? {};

      // 1) Update linked USER (only safe fields)
      const allowedUser = ['user_name', 'user_email', 'user_phone'];
      const userUpdate = {};
      for (const k of allowedUser) if (userPayload[k] !== undefined) userUpdate[k] = userPayload[k];

      if (Object.keys(userUpdate).length) {
         await User.updateOne(
            { _id: memberDoc.userId },
            { $set: userUpdate },
            { runValidators: true }
         );
      }

      // 2) Update MEMBER (block height/weight/goal here)
      const allowedMember = [
         'membershipPlanId', 'membershipStatus',
         'startDate', 'endDate',
         // intentionally NOT accepting: 'heightCm','weightKg','goal','bmi'
         'age', 'gender', 'medicalNotes',
         'guardianName', 'guardianPhone',
         'status', 'joinDate', 'emergencyContact', 'notes',
      ];
      const data = pick(memberPayload, allowedMember);

      // Handle membership plan validation / clearing
      if ('membershipPlanId' in data) {
         // allow explicit null/empty to clear the plan
         if (data.membershipPlanId === null || data.membershipPlanId === '') {
            data.membershipPlanId = undefined;
         } else {
            if (!mongoose.Types.ObjectId.isValid(data.membershipPlanId)) {
               return apiResponse.error('Bad Request', { error: 'Invalid membershipPlanId' }, 400);
            }
            const plan = await MembershipPlan.findById(data.membershipPlanId).lean();
            if (!plan) return apiResponse.error('Bad Request', { error: 'Invalid membershipPlanId' }, 400);
            if (String(plan.gymId) !== String(memberDoc.gymId)) {
               return apiResponse.error('Bad Request', { error: 'Plan belongs to another gym' }, 400);
            }
            if (plan.status !== 'Active') {
               return apiResponse.error('Conflict', { error: 'Plan is not Active' }, 409);
            }
            if (!plan.applicableTo?.includes('member')) {
               return apiResponse.error('Bad Request', { error: 'Plan not applicable to members' }, 400);
            }
         }
      }

      if (Object.keys(data).length) Object.assign(memberDoc, data);
      await memberDoc.save();

      // 3) Return fresh doc (hide height/weight/goal)
      const fresh = await Member.findById(memberDoc._id)
         .select('-heightCm -weightKg -goal')
         .populate({ path: 'userId', select: 'user_name user_email user_phone user_identifier user_role' })
         .lean();

      return apiResponse.success({ member: fresh }, 'Member updated');
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
