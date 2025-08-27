import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

/**
 * Gym (Tenant). One per company/location (or parent org if multi-branch).
 * Links to a platform SubscriptionPlan and caches limits/features for speed.
 */
const GymSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subdomain: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    // inside GymSchema
    gym_identifier: { type: String, unique: true, index: true }, // e.g., IFG-4821
    code: { type: String, trim: true, uppercase: true, unique: true, sparse: true }, // optional short code


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
      status: { type: String, enum: ['trialing', 'active', 'past_due', 'canceled', 'incomplete'], default: 'trialing' },
      trialEndsAt: { type: Date },
      stripeCustomerId: { type: String },
      stripeSubscriptionId: { type: String },
      stripePriceId: { type: String },
      currentPeriodStart: { type: Date },
      currentPeriodEnd: { type: Date },
    },

    /** Cached features/limits from the selected platform plan (can be overridden per gym if needed) */
    features: {
      pos: Boolean, classes: Boolean, crm: Boolean, checkin: Boolean, reports: Boolean, apiAccess: Boolean,
    },
    limits: {
      maxStaff: Number, maxMembers: Number, branches: Number,
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

// in gym.model.js
GymSchema.virtual('ownerUser', {
  ref: 'User',
  localField: 'ownerUserId',
  foreignField: '_id',
  justOne: true,
  options: { select: '_id user_identifier user_name user_email' },
});



export default mongoose.models.Gym || mongoose.model('Gym', GymSchema);
