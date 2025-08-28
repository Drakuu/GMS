import connectDB from '@/lib/connectDB';
import Member from '@/models/member.model';
import MembershipPlan from '@/models/membershipplan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick } from '@/utils/apiHelpers';
import { enforceGymLimitForCreate } from '@/utils/tenantLimits';
import { upsertUserForStaff } from '@/utils/upsertUserFromStaff';
import { getGymIdForAdminOrFail } from '@/utils/resolveGymFromRequester';

export async function POST(req) {
   try {
      await connectDB();

      // Only Admins can create members for THEIR gym
      const requester = await requireRole(req, ['Admin'], getRequester);

      const body = await req.json();
      const { user: userPayload, member: memberPayload = {} } = body || {};

      // 🔑 derive gym from token
      const gymId = await getGymIdForAdminOrFail(requester);

      // Create/update the User; set role=Member; returns ids
      const { userId, user_identifier } = await upsertUserForStaff(userPayload, 'Member', gymId);

      // Enforce plan limit (uses gym.limits.maxMembers)
      await enforceGymLimitForCreate(gymId, 'member');

      // Optional membership plan validation (must belong to this gym)
      if (memberPayload.membershipPlanId) {
         const plan = await MembershipPlan.findById(memberPayload.membershipPlanId).lean();
         if (!plan) return apiResponse.error('Bad Request', { error: 'Invalid membershipPlanId' }, 400);
         if (String(plan.gymId) !== String(gymId)) {
            return apiResponse.error('Bad Request', { error: 'Plan belongs to another gym' }, 400);
         }
         if (plan.status !== 'Active') {
            return apiResponse.error('Conflict', { error: 'Plan is not Active' }, 409);
         }
         if (!plan.applicableTo?.includes('member')) {
            return apiResponse.error('Bad Request', { error: 'Plan not applicable to members' }, 400);
         }
      }

      const allowed = [
         'membershipPlanId', 'membershipStatus', 'startDate', 'endDate',
         'heightCm', 'weightKg', 'bmi', 'age', 'gender', 'goal', 'medicalNotes',
         'guardianName', 'guardianPhone', 'status', 'joinDate', 'emergencyContact', 'notes'
      ];
      const data = pick(memberPayload, allowed);

      const created = await Member.create({
         ...data,
         gymId,
         userId,
         user_identifier,
         status: data.status || 'Active',
      });

      return apiResponse.success({ member: created }, 'Member created', 201);
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
