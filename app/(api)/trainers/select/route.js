import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Member from '@/models/member.model';
import Trainer from '@/models/trainer.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole } from '@/utils/apiHelpers';

export async function POST(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['Member'], getRequester);

      // const { memberId: rawMemberId, trainerId } = await req.json();
      let body;
      try { body = await req.json(); }
      catch { return apiResponse.error('Bad Request', { error: 'Invalid JSON body' }, 400); }
      const { memberId: rawMemberId, trainerId } = body;
      if (!trainerId || !mongoose.Types.ObjectId.isValid(trainerId)) {
         return apiResponse.error('Bad Request', { error: 'Valid trainerId is required' }, 400);
      }

      // Resolve the caller's member record
      let member;
      if (rawMemberId) {
         if (!mongoose.Types.ObjectId.isValid(rawMemberId)) {
            return apiResponse.error('Bad Request', { error: 'Invalid memberId' }, 400);
         }
         member = await Member.findById(rawMemberId).select('userId gymId status');
         if (!member) return apiResponse.error('Not Found', { error: 'Member not found' }, 404);
         if (String(member.userId) !== String(requester.id || requester._id)) {
            return apiResponse.error('Forbidden', { error: 'You can only update your own membership' }, 403);
         }
      } else {
         // Auto-resolve by token (userId + gym_id)
         const userId = String(requester.id || requester._id || '');
         const gid = requester.gym_id ? String(requester.gym_id) : null;
         if (!userId || !gid) {
            return apiResponse.error('Conflict', { error: 'Could not resolve your member record from token' }, 409);
         }
         member = await Member.findOne({ userId, gymId: gid }).select('gymId status');
         if (!member) return apiResponse.error('Not Found', { error: 'Member record not found for this user/gym' }, 404);
      }

      const trainer = await Trainer.findById(trainerId).select('gymId assignedMembers');
      if (!trainer) return apiResponse.error('Not Found', { error: 'Trainer not found' }, 404);

      // Must be same gym
      if (String(member.gymId) !== String(trainer.gymId)) {
         return apiResponse.error('Bad Request', { error: 'Trainer is not in your gym' }, 400);
      }

      // Add member to trainer with $addToSet (race-safe)
      const updateRes = await Trainer.updateOne(
         { _id: trainer._id, gymId: trainer.gymId },
         { $addToSet: { assignedMembers: member._id } }
      );

      if (updateRes.matchedCount !== 1) {
         return apiResponse.error('Error', { error: 'Failed to update trainer' }, 500);
      }

      return apiResponse.success({ ok: true, trainerId: trainer._id, memberId: member._id }, 'Trainer selected');
   } catch (err) {
      const code = err.status || 500;
      return apiResponse.error(code === 500 ? 'Server Error' : 'Error', { error: err.message }, code);
   }
}
