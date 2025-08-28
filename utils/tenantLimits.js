import mongoose from 'mongoose';
import Gym from '@/models/gym.model';
import Member from '@/models/member.model';
import Trainer from '@/models/trainer.model';
import { httpError } from '@/utils/apiHelpers';

const { ObjectId } = mongoose.Types;

/**
 * Enforce per-gym limits before creating a member/trainer.
 * @param {string|ObjectId} gymId
 * @param {'member'|'trainer'} type
 * @returns {Promise<{gym: any, remaining: number}>}
 */
export async function enforceGymLimitForCreate(gymId, type) {
   if (!ObjectId.isValid(gymId)) throw httpError(400, 'Invalid gymId');
   const gid = new ObjectId(gymId);

   // Fetch only what we need
   const gym = await Gym.findById(gid).select('status limits').lean();
   if (!gym) throw httpError(400, 'Invalid gymId');
   if (gym.status !== 'Active') throw httpError(409, 'Gym is not Active');

   if (type !== 'member' && type !== 'trainer') {
      throw httpError(400, 'Invalid type (expected "member" or "trainer")');
   }

   // Be schema-tolerant: gymId OR gym_id; also ignore soft-deleted rows if present
   const baseFilter = {
      $and: [
         { $or: [{ gymId: gid }, { gym_id: gid }] },
         { $or: [{ isDeleted: { $ne: true } }, { deleted: { $ne: true } }] },
      ],
   };

   const current =
      type === 'member'
         ? await Member.countDocuments(baseFilter)
         : await Trainer.countDocuments(baseFilter);

   const limitKey = type === 'member' ? 'maxMembers' : 'maxStaff';
   const max = Number(gym?.limits?.[limitKey]);

   // If max is a finite number, enforce; otherwise treat as unlimited
   if (Number.isFinite(max) && current >= max) {
      throw httpError(
         409,
         type === 'member'
            ? 'Member limit reached for this gym'
            : 'Staff (trainer) limit reached for this gym'
      );
   }

   const remaining = Number.isFinite(max) ? Math.max(0, max - current) : Infinity;
   return { gym, remaining };
}
