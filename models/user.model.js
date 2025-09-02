// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_identifier: {
    type: String,
    unique: true,
    sparse: true
  },
  user_name: { type: String },
  user_email: { type: String, required: true, unique: true, lowercase: true },
  user_phone: { type: String },
  user_password: { type: String, required: true, select: false },
  user_role: {
    type: String,
    enum: ["SuperAdmin", "Admin", "Trainer", "Member"],
    default: "Member"
  },
  // Reference to the primary gym (for trainers/members)
  gym_id: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
  // For gym owners/admins who might manage multiple branches
  managed_gyms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gym" }],
  user_otp: { type: String, select: false },
  user_otp_expiry: { type: Date, select: false },
  otp_attempts: {
    count: { type: Number, default: 0, select: false },
    last_attempt: { type: Date, select: false }
  },
  login_attempts: {
    count: { type: Number, default: 0, select: false },
    last_attempt: { type: Date, select: false }
  },
  is_locked: { type: Boolean, default: false, select: false },
  lock_until: { type: Date, select: false },
  is_verified: { type: Boolean, default: false },
  last_login: { type: Date },
  isDeleted: { type: Boolean, default: false },
  login_history: [{
    timestamp: { type: Date, default: Date.now },
    ip_address: String,
    user_agent: String,
    status: String // 'success' or 'failed'
  }],
  audit_logs: [{
    action: String,
    ip: String,
    user_agent: String,
    metadata: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true,
});

userSchema.pre('save', function (next) {
  if (!this.otp_attempts) {
    this.otp_attempts = { count: 0, last_attempt: null };
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;