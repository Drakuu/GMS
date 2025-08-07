// models/dietPlan.js
const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema({
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true },
  memberId: { type: mongoose.Types.ObjectId, ref: "Member" },
  trainerId: { type: mongoose.Types.ObjectId, ref: "Trainer" },
  dailyMealPlan: mongoose.Schema.Types.Mixed, // { Breakfast: "Oats", ... }
  calories: Number,
  macros: {
    carbs: String,
    protein: String,
    fat: String
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("DietPlan", dietPlanSchema);
