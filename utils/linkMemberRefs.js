// utils/linkMemberRefs.js
import mongoose from 'mongoose';
import Member from '@/models/member.model';

const fieldMap = {
   dietPlan: 'dietPlanIds',
   workoutPlan: 'workoutPlanIds',
   progress: 'progressIds',
   class: 'classIds',
};

/**
 * Adds the child document id to the appropriate array on Member.
 * Safe for standalone Mongo (no transactions).
 */
export async function linkChildToMember({ gymId, memberId, childId, kind }) {
   if (!fieldMap[kind]) throw new Error(`Unknown kind: ${kind}`);
   const field = fieldMap[kind];

   const ok = [gymId, memberId, childId].every(mongoose.Types.ObjectId.isValid);
   if (!ok) throw new Error('Invalid ids for linkChildToMember');

   const res = await Member.updateOne(
      { _id: memberId, gymId },
      { $addToSet: { [field]: childId } }
   );

   if (res.matchedCount !== 1) {
      throw new Error(`Member not found or gym mismatch while linking ${kind}`);
   }
}
