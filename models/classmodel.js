const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  gymId: mongoose.Types.ObjectId,
  trainerId: mongoose.Types.ObjectId,
  name: String,
  description: String,
  schedule: Date,
  slots: Number,
  bookedMembers: [{ type: mongoose.Types.ObjectId, ref: "Member" }],
  Status: { type: String, enum: ["Active", "Inactive"], default: "Active" } 
});

module.exports = mongoose.model("Class", classSchema);
