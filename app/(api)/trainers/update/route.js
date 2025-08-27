import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Trainer from '@/models/trainer.model';
import Member from '@/models/member.model';
import Gym from '@/models/gym.model';
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

      const trainerDoc = await Trainer.findById(id);
      if (!trainerDoc) return apiResponse.error('Not Found', { error: 'Trainer not found' }, 404);

      const gym = await Gym.findById(trainerDoc.gymId).select('_id ownerUserId status').lean();
      if (!gym) return apiResponse.error('Bad Request', { error: 'Gym missing' }, 400);
      if (!canManageGym(requester, gym)) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      const body = await req.json();
      const allowed = [
         'specialization', 'experienceYears', 'assignedMembers', 'availabilitySchedule',
         'hourlyRate', 'certifications', 'socialLinks', 'status', 'joinDate', 'emergencyContact', 'notes'
      ];
      const data = pick(body, allowed);

      // Normalize specialization if provided as a comma-separated string
      if (typeof data.specialization === 'string') {
         data.specialization = data.specialization.split(',').map(s => s.trim()).filter(Boolean);
      }

      // Validate assignedMembers: must be unique, valid ObjectIds, and belong to same gym
      if (Array.isArray(data.assignedMembers)) {
         const uniqueIds = [...new Set(data.assignedMembers.filter(Boolean).map(String))];

         if (!uniqueIds.every(mongoose.Types.ObjectId.isValid)) {
            return apiResponse.error('Bad Request', { error: 'assignedMembers contains invalid ids' }, 400);
         }

         const oids = uniqueIds.map(v => new mongoose.Types.ObjectId(v));
         const count = await Member.countDocuments({ _id: { $in: oids }, gymId: trainerDoc.gymId });
         if (count !== uniqueIds.length) {
            return apiResponse.error('Bad Request', { error: 'assignedMembers must be members of the same gym' }, 400);
         }

         data.assignedMembers = oids; // deduped & cast
      }

      Object.assign(trainerDoc, data);
      await trainerDoc.save();

      const fresh = await Trainer.findById(trainerDoc._id)
         .populate({ path: 'userId', select: 'user_name user_email user_phone user_identifier user_role' })
         .populate({ path: 'assignedMembers', select: 'user_identifier gymId status' })
         .lean();

      return apiResponse.success({ trainer: fresh }, 'Trainer updated');
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
