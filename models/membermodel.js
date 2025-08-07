const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
  membershipStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  startDate: Date,
  bmi: Number,
  height: Number,
  weight: Number,
  age: Number,
  gender: String,
  goal: String,
  emergencyContactName: String,
  emergencyContactPhone: String,
  memberemail: { type: String, required: true, unique: true },
  gaurdian_name:String,
  Status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

module.exports = mongoose.model("Member", memberSchema);
