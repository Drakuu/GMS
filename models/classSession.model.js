// models/classSession.model.js
import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const ClassSessionSchema = new Schema({
  gymId: { type: Types.ObjectId, ref: 'Gym', required: true, index: true },
  trainerId: { type: Types.ObjectId, ref: 'Trainer', required: true, index: true },

  name: { type: String, required: true },
  description: String,
  schedule: { type: Date, required: true, index: true },
  slots: { type: Number, min: 1, default: 10 },

  bookedMembers: [{ type: Types.ObjectId, ref: 'Member' }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },

  createdBy: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  updatedBy: { type: Types.ObjectId, ref: 'User' },
}, { timestamps: true });

ClassSessionSchema.index({ gymId: 1, trainerId: 1, schedule: 1 });

export default mongoose.models.ClassSession || mongoose.model('ClassSession', ClassSessionSchema);
