// models/workoutPlan.model.js
import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const WorkoutPlanSchema = new Schema({
  gymId: { type: Types.ObjectId, ref: 'Gym', required: true, index: true },
  memberId: { type: Types.ObjectId, ref: 'Member', required: true, index: true },
  trainerId: { type: Types.ObjectId, ref: 'Trainer', required: true, index: true },

  weekDayWisePlan: Schema.Types.Mixed, // e.g. { Monday: ["Chest", "Triceps"], ... }
  notes: String,

  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  isDeleted: { type: Boolean, default: false, index: true },

  createdBy: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  updatedBy: { type: Types.ObjectId, ref: 'User' },
}, { timestamps: true });

WorkoutPlanSchema.index({ gymId: 1, memberId: 1, isDeleted: 1 });

export default mongoose.models.WorkoutPlan || mongoose.model('WorkoutPlan', WorkoutPlanSchema);
