// services/stripeService.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class StripeService {
   // Create a new Stripe customer
   async createCustomer(email, name, metadata = {}) {
      try {
         const customer = await stripe.customers.create({
            email,
            name,
            metadata
         });
         return customer;
      } catch (error) {
         console.error('Error creating Stripe customer:', error);
         throw error;
      }
   }

   // Create a subscription
   async createSubscription(customerId, priceId, trialEnd = null) {
      try {
         const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            trial_end: trialEnd ? Math.floor(trialEnd.getTime() / 1000) : undefined,
            expand: ['latest_invoice.payment_intent'],
         });
         return subscription;
      } catch (error) {
         console.error('Error creating Stripe subscription:', error);
         throw error;
      }
   }

   // Cancel a subscription
   async cancelSubscription(subscriptionId, cancelAtPeriodEnd = true) {
      try {
         const subscription = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: cancelAtPeriodEnd,
         });
         return subscription;
      } catch (error) {
         console.error('Error canceling Stripe subscription:', error);
         throw error;
      }
   }

   // Update subscription (change plan)
   async updateSubscription(subscriptionId, newPriceId) {
      try {
         const subscription = await stripe.subscriptions.retrieve(subscriptionId);

         const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: false,
            proration_behavior: 'create_prorations',
            items: [{
               id: subscription.items.data[0].id,
               price: newPriceId,
            }],
         });

         return updatedSubscription;
      } catch (error) {
         console.error('Error updating Stripe subscription:', error);
         throw error;
      }
   }

   // Handle webhook events
   async handleWebhook(event) {
      try {
         switch (event.type) {
            case 'customer.subscription.updated':
               await this.handleSubscriptionUpdated(event.data.object);
               break;
            case 'customer.subscription.deleted':
               await this.handleSubscriptionDeleted(event.data.object);
               break;
            case 'invoice.payment_failed':
               await this.handlePaymentFailed(event.data.object);
               break;
            case 'invoice.payment_succeeded':
               await this.handlePaymentSucceeded(event.data.object);
               break;
            default:
               console.log(`Unhandled event type: ${event.type}`);
         }
      } catch (error) {
         console.error('Error handling webhook:', error);
         throw error;
      }
   }

   // Implement webhook handlers
   async handleSubscriptionUpdated(subscription) {
      // Update gym subscription status in database
      const Gym = mongoose.model('Gym');
      const gym = await Gym.findOne({ 'subscription.stripeSubscriptionId': subscription.id });

      if (gym) {
         gym.subscription.status = subscription.status;
         gym.subscription.currentPeriodStart = new Date(subscription.current_period_start * 1000);
         gym.subscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
         gym.subscription.cancelAtPeriodEnd = subscription.cancel_at_period_end;

         await gym.save();
      }
   }

   async handleSubscriptionDeleted(subscription) {
      const Gym = mongoose.model('Gym');
      const gym = await Gym.findOne({ 'subscription.stripeSubscriptionId': subscription.id });

      if (gym) {
         gym.subscription.status = 'canceled';
         await gym.save();
      }
   }

   async handlePaymentFailed(invoice) {
      const Gym = mongoose.model('Gym');
      const gym = await Gym.findOne({ 'subscription.stripeCustomerId': invoice.customer });

      if (gym) {
         gym.subscription.paymentFailureCount += 1;
         gym.subscription.lastPaymentError = invoice.last_payment_error || 'Payment failed';

         if (gym.subscription.paymentFailureCount >= 3) {
            gym.subscription.status = 'unpaid';
         }

         await gym.save();
      }
   }

   async handlePaymentSucceeded(invoice) {
      const Gym = mongoose.model('Gym');
      const gym = await Gym.findOne({ 'subscription.stripeCustomerId': invoice.customer });

      if (gym) {
         gym.subscription.paymentFailureCount = 0;
         gym.subscription.lastPaymentError = null;
         gym.subscription.latestInvoice = invoice.id;

         await gym.save();
      }
   }
}

export default new StripeService();