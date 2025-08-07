const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ["SuperAdmin","admin", "trainer", "member"], default: "member" },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
  name: String,
  phone: String,
  profileImage: String,
  otp: String,
  otpExpiry: Date,
  isVerified: { type: Boolean, default: false }

});
let User;
try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', userSchema);
}
module.exports = mongoose.model("User", userSchema);
