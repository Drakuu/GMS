const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, enum:["Basic","Best","Premium"]},
  features: [String],
  price: Number,
  durationInDays: Number,
  maxMembers: { type: Number, required: true },
  maxTrainers: { type: Number, required: true },
  maxClasses: { type: Number, default: 10 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false } // SuperAdmin
}, { timestamps: true });

module.exports = mongoose.model("Package", packageSchema);
