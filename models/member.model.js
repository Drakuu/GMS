// models/member.model.js
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

const MemberSchema = new Schema({
   ...common,

   membershipStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'Expired', 'Paused'],
      default: 'Active',
      index: true,
   },
   membershipPlanId: { type: Types.ObjectId, ref: 'MembershipPlan' },

   startDate: Date,
   endDate: Date,

   // (legacy; you can remove later)
   heightCm: { type: Number, min: 0, select: false },
   weightKg: { type: Number, min: 0, select: false },
   bmi: { type: Number, min: 0, select: false },

   age: { type: Number, min: 0, max: 120 },
   gender: { type: String, enum: ['male', 'female', 'other'] },

   goal: { type: String, select: false },
   medicalNotes: String,
   guardianName: String,
   guardianPhone: String,

   // 🔗 references to other domain docs (keep Member lean)
   dietPlanIds: [{ type: Types.ObjectId, ref: 'DietPlan' }],
   workoutPlanIds: [{ type: Types.ObjectId, ref: 'WorkoutPlan' }],
   progressIds: [{ type: Types.ObjectId, ref: 'Progress' }],
   classIds: [{ type: Types.ObjectId, ref: 'ClassSession' }],
}, { timestamps: true });

MemberSchema.index({ gymId: 1, userId: 1 }, { unique: true });

MemberSchema.pre('validate', function (next) {
   // kept for back-compat; will not usually run since fields are select:false
   if (this.heightCm && this.weightKg) {
      const h = this.heightCm / 100;
      if (h > 0) this.bmi = +(this.weightKg / (h * h)).toFixed(2);
   }
   next();
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
