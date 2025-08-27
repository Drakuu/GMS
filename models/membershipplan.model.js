import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

/**
 * Membership plans created by a Gym Admin for Members/Trainers.
 * Always tied to a gym (tenant). No platform fields here.
 */
const MembershipPlanSchema = new Schema(
   {
      gymId: { type: Types.ObjectId, ref: 'Gym', required: true, index: true },

      name: { type: String, required: true, trim: true },
      description: { type: String },

      // who can this plan apply to?
      applicableTo: { type: [String], enum: ['member', 'trainer'], default: ['member'] },

      currency: { type: String, default: 'PKR' },
      price: { type: Number, required: true, min: 0 },
      signupFee: { type: Number, default: 0, min: 0 },
      taxPercent: { type: Number, default: 0, min: 0, max: 100 },

      duration: {
         unit: { type: String, enum: ['day', 'week', 'month', 'year'], default: 'month' },
         count: { type: Number, default: 1, min: 1 },
      },

      sessionsIncluded: { type: Number, default: 0, min: 0 }, // 0 = unlimited
      classBookingsPerWeek: { type: Number, default: 0, min: 0 },
      visitsPerWeek: { type: Number, default: 0, min: 0 },

      multiBranchAccess: { type: Boolean, default: false },
      allowedHours: [
         { dow: { type: Number, min: 0, max: 6 }, start: String, end: String }
      ],

      freezePolicy: {
         allowed: { type: Boolean, default: true },
         maxDays: { type: Number, default: 30, min: 0 },
         minBlockDays: { type: Number, default: 7, min: 0 },
      },

      renewalGraceDays: { type: Number, default: 7, min: 0 },
      lateCancelFee: { type: Number, default: 0, min: 0 },
      bookingWindowDays: { type: Number, default: 14, min: 0 },

      status: { type: String, enum: ['Active', 'Inactive', 'Archived'], default: 'Active', index: true },
      isFeatured: { type: Boolean, default: false },
      order: { type: Number, default: 0 },

      benefits: [String],
      tags: [String],
      colorHex: String,

      createdBy: { type: Types.ObjectId, ref: 'User' },
   },
   { timestamps: true }
);

// unique per gym
MembershipPlanSchema.index({ gymId: 1, name: 1 }, { unique: true });

export default mongoose.models.MembershipPlan
   || mongoose.model('MembershipPlan', MembershipPlanSchema);
