// models/progress.model.js
import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const ProgressSchema = new Schema({
  gymId: { type: Types.ObjectId, ref: 'Gym', required: true, index: true },
  memberId: { type: Types.ObjectId, ref: 'Member', required: true, index: true },
  trainerId: { type: Types.ObjectId, ref: 'Trainer' },

  date: { type: Date, default: Date.now, index: true },
  entries: [{
    weight: Number,
    bodyFat: Number,
    muscleMass: Number,
    strengthLevel: String,
    trainerComment: String,
  }],

  createdBy: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  updatedBy: { type: Types.ObjectId, ref: 'User' },
}, { timestamps: true });

ProgressSchema.index({ gymId: 1, memberId: 1, date: 1 });

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
