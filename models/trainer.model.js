import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const common = {
  userId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  user_identifier: { type: String, index: true },
  gymId: { type: Types.ObjectId, ref: 'Gym', required: true, index: true },

  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active', index: true },
  joinDate: { type: Date, default: Date.now },

  emergencyContact: {
    name: String,
    phone: String,
    relation: String,
  },

  notes: String,
};

const TrainerSchema = new Schema({
  ...common,

  specialization: [String],
  experienceYears: { type: Number, min: 0 },

  // Now points directly at the Member collection
  assignedMembers: [{ type: Types.ObjectId, ref: 'Member' }],

  availabilitySchedule: [
    {
      day: { type: Number, min: 0, max: 6 }, // 0=Sun ... 6=Sat
      timeSlots: [{ start: String, end: String }],
    }
  ],

  hourlyRate: { type: Number, min: 0 },
  certifications: [String],
  socialLinks: {
    instagram: String,
    linkedin: String,
    youtube: String,
  },
}, { timestamps: true });

TrainerSchema.index({ gymId: 1, userId: 1 }, { unique: true });

export default mongoose.models.Trainer || mongoose.model('Trainer', TrainerSchema);
