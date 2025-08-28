const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  senderId: mongoose.Types.ObjectId,
  receiverId: mongoose.Types.ObjectId,
  message: String,
  timestamp: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false }
});
module.exports = mongoose.model("chat", messageSchema);