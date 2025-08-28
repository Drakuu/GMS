// app/api/diet-plans/create/route.js
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import DietPlan from '@/models/dietPlan.model';
import Member from '@/models/member.model';
import Gym from '@/models/gym.model';
import { linkChildToMember } from '@/utils/linkMemberRefs';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, canManageGym, pick } from '@/utils/apiHelpers';

export async function POST(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin', 'Trainer'], getRequester);

      const body = await req.json();
      const allowed = ['gymId', 'memberId', 'trainerId', 'dailyMealPlan', 'calories', 'macros', 'status'];
      const data = pick(body, allowed);

      // basic validation
      for (const k of ['gymId', 'memberId']) {
         if (!data[k] || !mongoose.Types.ObjectId.isValid(data[k])) {
            return apiResponse.error('Bad Request', { error: `Valid ${k} is required` }, 400);
         }
      }

      // gym & member checks
      const gym = await Gym.findById(data.gymId).select('status ownerUserId').lean();
      if (!gym) return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);
      if (gym.status !== 'Active') return apiResponse.error('Conflict', { error: 'Gym is not Active' }, 409);

      const member = await Member.findById(data.memberId).select('gymId').lean();
      if (!member || String(member.gymId) !== String(data.gymId)) {
         return apiResponse.error('Bad Request', { error: 'Member not in this gym' }, 400);
      }

      // permission: Admins of this gym or Trainers assigned by your policy
      if (!canManageGym(requester, gym)) {
         // If trainers should be allowed for their gym, add your trainer-gym check here
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      // create
      const created = await DietPlan.create({
         ...data,
         createdBy: requester.id,
      });

      // link to Member
      await linkChildToMember({
         gymId: data.gymId,
         memberId: data.memberId,
         childId: created._id,
         kind: 'dietPlan',
      });

      return apiResponse.success({ plan: created }, 'Diet plan created', 201);
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
