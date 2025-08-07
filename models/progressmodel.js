const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  gymId: { type: mongoose.Types.ObjectId, ref: "Gym", required: true },
  memberId: { type: mongoose.Types.ObjectId, ref: "Member", required: true },
  date: { type: Date, default: Date.now },
  weight: Number,
  bodyFat: Number,
  muscleMass: Number,
  strengthLevel: String,
  trainerComment: String, 
});

module.exports = mongoose.model("Progress", progressSchema);
