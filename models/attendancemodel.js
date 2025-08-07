const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  memberId: { type: mongoose.Types.ObjectId, ref: "Member", required: true },
  gymId: { type: mongoose.Types.ObjectId, ref: "Gym", required: true },
  date: { type: Date, default: Date.now },
  checkInTime: { type: String },
  method: { type: String, enum: ["QR", "Face", "Manual"], default: "Manual" }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
