import connectDB from '@/lib/connectDB';
import Trainer from '@/models/trainer.model';
import Member from '@/models/member.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick } from '@/utils/apiHelpers';
import { enforceGymLimitForCreate } from '@/utils/tenantLimits';
import { upsertUserForStaff } from '@/utils/upsertUserFromStaff';
import { getGymIdForAdminOrFail } from '@/utils/resolveGymFromRequester';

export async function POST(req) {
   try {
      await connectDB();

      // Only Admins can create trainers for THEIR gym
      const requester = await requireRole(req, ['Admin'], getRequester);

      const body = await req.json();
      const { user: userPayload, trainer: trainerPayload = {} } = body || {};

      // 🔑 derive gym from token
      const gymId = await getGymIdForAdminOrFail(requester);

      // Create/update the User; set role=Trainer
      const { userId, user_identifier } = await upsertUserForStaff(userPayload, 'Trainer', gymId);

      // Enforce plan limit (uses gym.limits.maxStaff)
      await enforceGymLimitForCreate(gymId, 'trainer');

      // Validate assignedMembers (must be members in the same gym)
      if (Array.isArray(trainerPayload.assignedMembers) && trainerPayload.assignedMembers.length) {
         const count = await Member.countDocuments({ _id: { $in: trainerPayload.assignedMembers }, gymId });
         if (count !== trainerPayload.assignedMembers.length) {
            return apiResponse.error('Bad Request', { error: 'assignedMembers must be valid members from the same gym' }, 400);
         }
      }

      const allowed = [
         'specialization', 'experienceYears', 'assignedMembers', 'availabilitySchedule',
         'hourlyRate', 'certifications', 'socialLinks', 'status', 'joinDate', 'emergencyContact', 'notes'
      ];
      const data = pick(trainerPayload, allowed);

      const created = await Trainer.create({
         ...data,
         gymId,
         userId,
         user_identifier,
         status: data.status || 'Active',
      });

      return apiResponse.success({ trainer: created }, 'Trainer created', 201);
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
