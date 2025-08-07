const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Can be one or many
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" }, // null for SuperAdmin messages to admins
  message: { type: String, required: true },
  roleScope: { type: String, enum: ["Admin", "Trainer", "Member", "AllGyms"], required: true },
  type: { type: String, enum: ["message", "notification"], required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
