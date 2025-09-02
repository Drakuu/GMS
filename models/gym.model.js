// models/Gym.js
import mongoose from 'mongoose';

const GymSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gym_identifier: { type: String, unique: true, index: true },
    code: { type: String, trim: true, uppercase: true, unique: true, sparse: true },

    // For multi-branch support
    is_main_branch: { type: Boolean, default: false },
    parent_branch: { type: Types.ObjectId, ref: 'Gym', default: null }, // Reference to main branch

    ownerUserId: { type: Types.ObjectId, ref: 'User', index: true },

    // Contact
    phone: String,
    email: String,
    logoUrl: String,
    address: {
      line1: String, line2: String, city: String, state: String, country: String, postalCode: String,
    },

    timezone: { type: String, default: 'Asia/Karachi' },
    currency: { type: String, default: 'PKR' },
    locale: { type: String, default: 'en-PK' },
    status: { type: String, enum: ['Active', 'Suspended', 'Closed'], default: 'Active', index: true },

    /** Platform subscription selection + Stripe state */
    subscription: {
      planId: { type: Types.ObjectId, ref: 'SubscriptionPlan', index: true },
      status: { type: String, enum: ['trialing', 'active', 'past_due', 'canceled', 'incomplete', 'unpaid'], default: 'trialing' },
      trialEndsAt: { type: Date },
      currentPeriodStart: { type: Date },
      currentPeriodEnd: { type: Date },
      cancelAtPeriodEnd: { type: Boolean, default: false },

      // Stripe identifiers
      stripeCustomerId: { type: String, index: true },
      stripeSubscriptionId: { type: String, index: true },
      stripePriceId: { type: String },

      // For tracking payment failures
      latestInvoice: { type: String },
      paymentFailureCount: { type: Number, default: 0 },
      lastPaymentError: { type: String },
    },

    // Track usage against plan limits
    usage: {
      members: { type: Number, default: 0 },
      trainers: { type: Number, default: 0 },
      branches: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },

    notes: String,
    createdBy: { type: Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { transform(_d, r) { delete r.__v; return r; }, virtuals: true },
    toObject: { virtuals: true },
  }
);

GymSchema.index({ name: 'text' });

GymSchema.virtual('ownerUser', {
  ref: 'User',
  localField: 'ownerUserId',
  foreignField: '_id',
  justOne: true,
  options: { select: '_id user_identifier user_name user_email' },
});

// Virtual for child branches
GymSchema.virtual('childBranches', {
  ref: 'Gym',
  localField: '_id',
  foreignField: 'parent_branch',
});

export default mongoose.models.Gym || mongoose.model('Gym', GymSchema);