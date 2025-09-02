// models/SubscriptionPlan.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubscriptionPlanSchema = new Schema(
   {
      key: { type: String, required: true, unique: true, trim: true },
      name: { type: String, required: true, trim: true },
      description: { type: String },
      currency: { type: String, default: 'USD' },
      price: { type: Number, required: true, min: 0 },
      interval: { type: String, enum: ['month', 'year'], default: 'month' },
      trialDays: { type: Number, default: 14, min: 0 },

      // Stripe integration
      stripePriceId: { type: String, index: true },
      stripeProductId: { type: String },

      // Feature flags
      features: {
         memberManagement: { type: Boolean, default: true },
         attendanceTracking: { type: Boolean, default: true },
         paymentTracking: { type: Boolean, default: true },
         reports: { type: Boolean, default: true },
         notifications: { type: Boolean, default: true },
         multiBranch: { type: Boolean, default: false },
      },

      // Usage limits
      limits: {
         maxTrainers: { type: Number, default: 10 },
         maxMembers: { type: Number, default: 1000 },
         maxBranches: { type: Number, default: 1 },
      },

      // For display ordering
      displayOrder: { type: Number, default: 0 },
      isPopular: { type: Boolean, default: false },

      status: { type: String, enum: ['Active', 'Archived'], default: 'Active', index: true },
   },
   { timestamps: true }
);

export default mongoose.models.SubscriptionPlan || mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);