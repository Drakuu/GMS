import Gym from '@/models/gym.model';
import { httpError } from '@/utils/apiHelpers';

/**
 * Returns the single active gym owned by the logged-in Admin.
 * Throws if none or more than one active gym is found.
 */
export async function getGymIdForAdminOrFail(requester) {
   const adminId = requester._id || requester.id;

   const gyms = await Gym.find({ ownerUserId: adminId, status: 'Active' })
      .select('_id')
      .lean();

   if (gyms.length === 0) {
      throw httpError(400, 'No active gym found for this admin');
   }
   if (gyms.length > 1) {
      // If you support multi-gym admins later, switch this to accept a query param
      throw httpError(409, 'Multiple active gyms found for this admin');
   }
   return gyms[0]._id;
}
