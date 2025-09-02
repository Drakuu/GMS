// services/subscriptionService.js
import StripeService from './subscriptions/stripeService.js';
import Gym from '../models/Gym.js';
import SubscriptionPlan from '../models/SubscriptionPlan.js';

class SubscriptionService {
   // Create a new subscription for a gym
   async createGymSubscription(gymId, planId, paymentMethodId = null) {
      try {
         const gym = await Gym.findById(gymId).populate('ownerUser');
         const plan = await SubscriptionPlan.findById(planId);

         if (!gym || !plan) {
            throw new Error('Gym or plan not found');
         }

         // Create Stripe customer if not exists
         if (!gym.subscription.stripeCustomerId) {
            const customer = await StripeService.createCustomer(
               gym.ownerUser.user_email,
               gym.name,
               { gymId: gym._id.toString() }
            );
            gym.subscription.stripeCustomerId = customer.id;
         }

         // Calculate trial end date
         const trialEnd = plan.trialDays > 0 ?
            new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000) :
            null;

         // Create subscription
         const subscription = await StripeService.createSubscription(
            gym.subscription.stripeCustomerId,
            plan.stripePriceId,
            trialEnd
         );

         // Update gym with subscription details
         gym.subscription.planId = plan._id;
         gym.subscription.stripeSubscriptionId = subscription.id;
         gym.subscription.stripePriceId = plan.stripePriceId;
         gym.subscription.status = subscription.status;
         gym.subscription.trialEndsAt = trialEnd;
         gym.subscription.currentPeriodStart = new Date(subscription.current_period_start * 1000);
         gym.subscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);

         await gym.save();

         return { gym, subscription };
      } catch (error) {
         console.error('Error creating gym subscription:', error);
         throw error;
      }
   }

   // Change a gym's subscription plan
   async changeSubscriptionPlan(gymId, newPlanId) {
      try {
         const gym = await Gym.findById(gymId);
         const newPlan = await SubscriptionPlan.findById(newPlanId);

         if (!gym || !newPlan) {
            throw new Error('Gym or plan not found');
         }

         if (!gym.subscription.stripeSubscriptionId) {
            throw new Error('Gym does not have an active subscription');
         }

         // Update subscription in Stripe
         const updatedSubscription = await StripeService.updateSubscription(
            gym.subscription.stripeSubscriptionId,
            newPlan.stripePriceId
         );

         // Update gym details
         gym.subscription.planId = newPlan._id;
         gym.subscription.stripePriceId = newPlan.stripePriceId;
         gym.subscription.status = updatedSubscription.status;

         await gym.save();

         return { gym, subscription: updatedSubscription };
      } catch (error) {
         console.error('Error changing subscription plan:', error);
         throw error;
      }
   }

   // Cancel a gym's subscription
   async cancelSubscription(gymId, cancelAtPeriodEnd = true) {
      try {
         const gym = await Gym.findById(gymId);

         if (!gym.subscription.stripeSubscriptionId) {
            throw new Error('Gym does not have an active subscription');
         }

         const canceledSubscription = await StripeService.cancelSubscription(
            gym.subscription.stripeSubscriptionId,
            cancelAtPeriodEnd
         );

         gym.subscription.status = canceledSubscription.status;
         gym.subscription.cancelAtPeriodEnd = canceledSubscription.cancel_at_period_end;

         await gym.save();

         return { gym, subscription: canceledSubscription };
      } catch (error) {
         console.error('Error canceling subscription:', error);
         throw error;
      }
   }

   // Check if a gym is within its usage limits
   async checkUsageLimits(gymId) {
      try {
         const gym = await Gym.findById(gymId).populate('subscription.planId');
         const plan = gym.subscription.planId;

         if (!plan) {
            return { withinLimits: false, exceeded: [] };
         }

         const exceeded = [];

         // Check each limit
         if (gym.usage.members > plan.limits.maxMembers) {
            exceeded.push('members');
         }

         if (gym.usage.trainers > plan.limits.maxTrainers) {
            exceeded.push('trainers');
         }

         if (gym.usage.branches > plan.limits.maxBranches) {
            exceeded.push('branches');
         }

         return {
            withinLimits: exceeded.length === 0,
            exceeded,
            limits: plan.limits,
            currentUsage: gym.usage
         };
      } catch (error) {
         console.error('Error checking usage limits:', error);
         throw error;
      }
   }

   // Get subscription status for a gym
   async getSubscriptionStatus(gymId) {
      try {
         const gym = await Gym.findById(gymId).populate('subscription.planId');

         if (!gym) {
            throw new Error('Gym not found');
         }

         const isTrialActive = gym.subscription.trialEndsAt &&
            new Date() < gym.subscription.trialEndsAt;

         const isActive = gym.subscription.status === 'active' ||
            gym.subscription.status === 'trialing';

         return {
            isActive,
            isTrialActive,
            trialEndsAt: gym.subscription.trialEndsAt,
            currentPeriodEnd: gym.subscription.currentPeriodEnd,
            status: gym.subscription.status,
            plan: gym.subscription.planId,
            cancelAtPeriodEnd: gym.subscription.cancelAtPeriodEnd
         };
      } catch (error) {
         console.error('Error getting subscription status:', error);
         throw error;
      }
   }
}

export default new SubscriptionService();