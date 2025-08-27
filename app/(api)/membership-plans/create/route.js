import connectDB from '@/lib/connectDB';
import MembershipPlan from '@/models/membershipplan.model';
import Gym from '@/models/gym.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick, canManageGym } from '@/utils/apiHelpers';

export async function POST(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin', 'Admin'], getRequester);

      const body = await req.json();
      const allowed = [
         'gymId', 'name', 'description', 'applicableTo', 'currency', 'price', 'signupFee', 'taxPercent',
         'duration', 'sessionsIncluded', 'classBookingsPerWeek', 'visitsPerWeek', 'multiBranchAccess',
         'allowedHours', 'freezePolicy', 'renewalGraceDays', 'lateCancelFee', 'bookingWindowDays',
         'status', 'isFeatured', 'order', 'benefits', 'tags', 'colorHex'
      ];
      const data = pick(body, allowed);

      if (!data.gymId || !data.name || typeof data.price !== 'number') {
         return apiResponse.error('Bad Request', { error: 'gymId, name, price are required' }, 400);
      }

      // Gym must exist and be manageable by requester (unless SuperAdmin)
      const gym = await Gym.findById(data.gymId);
      if (!gym) return apiResponse.error('Bad Request', { error: 'Invalid gymId' }, 400);

      const role = (requester.role || requester.user_role || '').toString();
      if (role !== 'SuperAdmin' && !canManageGym(requester, gym)) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }
      if (gym.status !== 'Active') {
         return apiResponse.error('Conflict', { error: 'Gym is not Active' }, 409);
      }

      // Defaults
      if (!Array.isArray(data.applicableTo) || data.applicableTo.length === 0) {
         data.applicableTo = ['member']; // sensible default
      }

      const created = await MembershipPlan.create({
         ...data,
         createdBy: requester._id || requester.id,
      });

      return apiResponse.success({ plan: created }, 'Membership plan created', 201);
   } catch (err) {
      const status = err.code === 11000 ? 409 : (err.status || 500);
      const msg = err.code === 11000 ? 'Duplicate plan name for this gym' : err.message;
      return apiResponse.error(status === 500 ? 'Server Error' : 'Error', { error: msg }, status);
   }
}
