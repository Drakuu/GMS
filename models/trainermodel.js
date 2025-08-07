const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
  specialization: String,
  experience: String,
  assignedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  availabilitySchedule: [{
    day: String,
    timeSlots: [String]  // E.g., ["9:00 AM - 10:00 AM"]
  }],
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

module.exports = mongoose.model("Trainer", trainerSchema);
