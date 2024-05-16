const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

// Middleware for authentication
const authenticate = require("../middlewares/authenticate");

// Register User
router.post("/register", (req, res) => {
  if (req.body.password !== req.body.confirmPassword)
    res.status(400).json({ error: "Incorrect password" });
  const { confirmPassword, ...userData } = req.body;
  const newUser = new User(userData);

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

// Update User
router.put("/update/:id", authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Order
router.put("/orders/update/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Order History for User
router.get("/:userId/orders", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ "customer.userId": req.params.userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete User
router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
