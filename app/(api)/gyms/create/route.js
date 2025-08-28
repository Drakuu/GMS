import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Gym from '@/models/gym.model';
import User from '@/models/user.model';
import SubscriptionPlan from '@/models/subscriptionPlan.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';
import { requireRole, pick } from '@/utils/apiHelpers';
import { generateGymId } from '@/utils/UniqueNameGenerator/gymIdGenerator';

export async function POST(req) {
   try {
      await connectDB();
      const requester = await requireRole(req, ['SuperAdmin'], getRequester);

      const body = await req.json();
      const allowed = [
         'name', 'subdomain', 'code', 'phone', 'email', 'logoUrl', 'address',
         'timezone', 'currency', 'locale', 'ownerUserId', 'notes', 'planId'
      ];
      const data = pick(body, allowed);

      // Basic validation
      if (!data.name) {
         return apiResponse.error('Bad Request', { error: 'name is required' }, 400);
      }
      if (!data.ownerUserId || !mongoose.Types.ObjectId.isValid(data.ownerUserId)) {
         return apiResponse.error('Bad Request', { error: 'Valid ownerUserId is required' }, 400);
      }

      // Validate owner
      const owner = await User.findById(data.ownerUserId)
         .select('_id user_role isDeleted gym_id user_identifier user_name user_email')
         .lean();
      if (!owner) return apiResponse.error('Error', { error: 'Owner user not found' }, 400);
      if (owner.isDeleted) return apiResponse.error('Error', { error: 'Owner user is deleted' }, 400);
      if (owner.user_role !== 'Admin') {
         return apiResponse.error('Error', { error: 'Owner must have Admin role' }, 400);
      }
      if (owner.gym_id) {
         return apiResponse.error('Error', { error: 'This admin already has a gym' }, 409);
      }

      // Plan (optional)
      let subscription, features, limits;
      if (data.planId) {
         if (!mongoose.Types.ObjectId.isValid(data.planId)) {
            return apiResponse.error('Bad Request', { error: 'Invalid planId' }, 400);
         }
         const plan = await SubscriptionPlan.findById(data.planId).lean();
         if (!plan) return apiResponse.error('Bad Request', { error: 'Invalid planId' }, 400);

         subscription = {
            planId: plan._id,
            status: 'trialing',
            trialEndsAt: new Date(Date.now() + (plan.trialDays || 0) * 86400000),
            stripePriceId: plan.stripePriceId,
         };
         features = plan.features;
         limits = plan.limits;
      }

      const gym_identifier = await generateGymId(data.name);

      // 1) Create gym
      const created = await Gym.create({
         ...data,
         gym_identifier,
         subscription,
         features,
         limits,
         createdBy: requester._id || requester.id,
      });

      // 2) Link gym -> user
      const linkRes = await User.updateOne(
         { _id: owner._id, gym_id: { $in: [null, undefined] } }, // prevent overwriting if changed meanwhile
         { $set: { gym_id: created._id } }
      );

      if (linkRes.modifiedCount !== 1) {
         // Compensating action: remove the orphan gym
         await Gym.findByIdAndDelete(created._id);
         return apiResponse.error('Error', { error: 'Failed to link gym to owner user' }, 500);
      }

      // 3) Return gym populated with minimal owner info
      const gymWithOwner = await Gym.findById(created._id)
         .populate({ path: 'ownerUserId', select: '_id user_identifier user_name user_email' })
         .lean();

      return apiResponse.success({ gym: gymWithOwner }, 'Gym created', 201);
   } catch (err) {
      // Handle dup keys: subdomain/code/gym_identifier
      const status = err.status || (err.code === 11000 ? 409 : 500);
      const msg = err.code === 11000 ? 'Duplicate subdomain/code/gym_identifier' : err.message;
      return apiResponse.error(status === 500 ? 'Server Error' : 'Error', { error: msg }, status);
   }
}
