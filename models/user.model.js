import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_name: { type: String, },
  user_email: { type: String, required: true, unique: true },
  user_phone: { type: String, },
  user_password: { type: String, required: true },
  user_role: { type: String, enum: ["SuperAdmin", "Admin", "Trainer", "Member"], },
  gym_id: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
  user_otp: { type: String },
  user_otp_expiry: { type: Date },
  is_verified: { type: Boolean, default: false },
  last_login: { type: Date },
  isDeleted: { type: Boolean }
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;