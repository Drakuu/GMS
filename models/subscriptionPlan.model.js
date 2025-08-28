import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Platform-level subscription plan (for gyms/tenants).
 * Created by Super Admin. Chosen by a Gym.
 */
const SubscriptionPlanSchema = new Schema(
   {
      key: { type: String, required: true, unique: true, trim: true }, // "starter", "pro", "scale"
      name: { type: String, required: true, trim: true },
      description: { type: String },

      currency: { type: String, default: 'USD' },
      price: { type: Number, required: true, min: 0 },
      interval: { type: String, enum: ['month', 'year'], default: 'month' },
      trialDays: { type: Number, default: 14, min: 0 },

      // Stripe bindings
      stripePriceId: { type: String, index: true },
      stripeProductId: { type: String },

      // Feature flags and limits that a gym inherits
      features: {
         pos: { type: Boolean, default: true },
         classes: { type: Boolean, default: true },
         crm: { type: Boolean, default: false },
         checkin: { type: Boolean, default: true },
         reports: { type: Boolean, default: true },
         apiAccess: { type: Boolean, default: false },
      },
      limits: {
         maxStaff: { type: Number, default: 10 },
         maxMembers: { type: Number, default: 1000 },
         branches: { type: Number, default: 1 },
      },

      status: { type: String, enum: ['Active', 'Archived'], default: 'Active', index: true },
   },
   { timestamps: true }
);

export default mongoose.models.SubscriptionPlan
   || mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
