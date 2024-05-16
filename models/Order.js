const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  details: [
    {
      pizza: {
        type: Schema.Types.ObjectId,
        ref: "pizzas",
      },
      size: {
        type: String,
        enum: [10, 12, 14, 16],
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      toppings: [String],
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orders", OrderSchema);
