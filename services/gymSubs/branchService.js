// services/branchService.js
import Gym from '../models/Gym.js';
import SubscriptionService from './subscriptionService.js';

class BranchService {
   // Create a new branch for a gym
   async createBranch(parentGymId, branchData, userId) {
      try {
         const parentGym = await Gym.findById(parentGymId);

         if (!parentGym) {
            throw new Error('Parent gym not found');
         }

         // Check if the plan allows multiple branches
         const usageCheck = await SubscriptionService.checkUsageLimits(parentGymId);

         if (usageCheck.exceeded.includes('branches')) {
            throw new Error('Plan limit exceeded for branches');
         }

         // Create the new branch
         const newBranch = new Gym({
            ...branchData,
            parent_branch: parentGymId,
            ownerUserId: parentGym.ownerUserId,
            subscription: {
               planId: parentGym.subscription.planId,
               status: parentGym.subscription.status,
               stripeCustomerId: parentGym.subscription.stripeCustomerId,
               stripeSubscriptionId: parentGym.subscription.stripeSubscriptionId,
               stripePriceId: parentGym.subscription.stripePriceId,
               trialEndsAt: parentGym.subscription.trialEndsAt,
               currentPeriodStart: parentGym.subscription.currentPeriodStart,
               currentPeriodEnd: parentGym.subscription.currentPeriodEnd,
            },
            createdBy: userId
         });

         await newBranch.save();

         // Update branch count in parent gym
         parentGym.usage.branches += 1;
         parentGym.usage.lastUpdated = new Date();
         await parentGym.save();

         return newBranch;
      } catch (error) {
         console.error('Error creating branch:', error);
         throw error;
      }
   }

   // Get all branches for a gym
   async getBranches(gymId) {
      try {
         const branches = await Gym.find({
            $or: [
               { _id: gymId }, // Include the main gym
               { parent_branch: gymId } // Include all child branches
            ]
         }).populate('ownerUser', 'user_name user_email');

         return branches;
      } catch (error) {
         console.error('Error fetching branches:', error);
         throw error;
      }
   }

   // Update a branch
   async updateBranch(branchId, updateData) {
      try {
         const branch = await Gym.findByIdAndUpdate(
            branchId,
            updateData,
            { new: true, runValidators: true }
         );

         return branch;
      } catch (error) {
         console.error('Error updating branch:', error);
         throw error;
      }
   }

   // Delete a branch
   async deleteBranch(branchId) {
      try {
         const branch = await Gym.findById(branchId);

         if (!branch) {
            throw new Error('Branch not found');
         }

         if (!branch.parent_branch) {
            throw new Error('Cannot delete main branch');
         }

         // Decrement branch count in parent gym
         const parentGym = await Gym.findById(branch.parent_branch);
         if (parentGym) {
            parentGym.usage.branches = Math.max(0, parentGym.usage.branches - 1);
            parentGym.usage.lastUpdated = new Date();
            await parentGym.save();
         }

         // Soft delete the branch
         branch.status = 'Closed';
         await branch.save();

         return branch;
      } catch (error) {
         console.error('Error deleting branch:', error);
         throw error;
      }
   }
}

export default new BranchService();