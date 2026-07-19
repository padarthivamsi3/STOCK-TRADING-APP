const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    count: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stockExchange: {
      type: String,
      required: true,
      enum: ["NASDAQ", "NYSE"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stocks", stockSchema);