const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PizzaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("pizzas", PizzaSchema);
