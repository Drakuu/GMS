const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema({
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true }, // Multi-tenant scope
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  weekDayWisePlan: mongoose.Schema.Types.Mixed, // Example: { Monday: ["Chest", "Triceps"], Tuesday: ["Back"] }
  notes: String,
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
