const mongoose = require("mongoose");
 const subscriptionSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  gymId: mongoose.Types.ObjectId,
  plan:  { type: String, enum: ["Basic", "Premium", "Custom"] },
  price: Number,
  status: { type: String, enum: ["Active", "Cancelled"] },
  startDate: Date,
  endDate: Date,
  stripeCustomerId: String,
  stripeSubscriptionId: String
});


module.exports = mongoose.model("Payment", subscriptionSchema);
