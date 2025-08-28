import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_identifier: {
    type: String,
    unique: true,
    sparse: true // Allows null values but ensures uniqueness for non-null values
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
  gym_id: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
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

// Add pre-save hook to ensure otp_attempts is properly initialized
userSchema.pre('save', function (next) {
  if (!this.otp_attempts) {
    this.otp_attempts = { count: 0, last_attempt: null };
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;