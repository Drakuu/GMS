// models/dietPlan.model.js
import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const DietPlanSchema = new Schema({
  gymId: { type: Types.ObjectId, ref: 'Gym', required: true, index: true },
  memberId: { type: Types.ObjectId, ref: 'Member', required: true, index: true },
  trainerId: { type: Types.ObjectId, ref: 'Trainer' },

  dailyMealPlan: Schema.Types.Mixed, // e.g. { Breakfast: "Oats", ... }
  calories: Number,
  macros: {
    carbs: String,
    protein: String,
    fat: String,
  },

  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  isDeleted: { type: Boolean, default: false, index: true },

  // 👇 who created it
  createdBy: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  updatedBy: { type: Types.ObjectId, ref: 'User' },
}, { timestamps: true });

DietPlanSchema.index({ gymId: 1, memberId: 1, isDeleted: 1 });

export default mongoose.models.DietPlan || mongoose.model('DietPlan', DietPlanSchema);
