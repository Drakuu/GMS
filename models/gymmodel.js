const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  name: String,
  address: String,
  logo: String,
  number:String,
  gymemail: { type: String, required: true, unique: true },
  gymid:{type: String, required: true, unique: true},
  owner:String,
  ownernumber:String,
  subscriptionPlan: { type: String, enum: ["Basic", "Premium", "Custom"] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model("Gym", gymSchema);
