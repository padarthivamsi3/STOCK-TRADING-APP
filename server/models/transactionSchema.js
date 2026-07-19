const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    type: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Bank Transfer"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transactions", transactionSchema);