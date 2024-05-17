const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");

// Middleware for authentication
const authenticate = require("../middlewares/authenticate");

// Function to calculate sales tax
function calculateSalesTax(subtotal) {
  const taxRate = 0.1; // 10% sales tax
  return subtotal * taxRate;
}

// Create Order
router.post("/create", authenticate, async (req, res) => {
  const pizzas = await Promise.all(
    req.body.map(async (item) => {
      item.pizza = await Pizza.findOne({ _id: item.id });
      return item;
    })
  );
  const subtotal = pizzas.reduce(
    (acc, orderDetail) => acc + orderDetail.pizza.price * orderDetail.quantity,
    0
  );
  const salesTax = calculateSalesTax(subtotal);
  const total = subtotal + salesTax;

  const newOrder = {
    customer: req.session.user._id,
    details: req.body.map((p) => {
      p.pizza = p.id;
      delete p.id;
      return p;
    }),
    comments: "Thank you!",
    total,
  };

  try {
    const order = await new Order(newOrder).save();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Order
router.put("/update/:id", authenticate, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cancel Order
router.put("/cancel/:id", authenticate, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Orders
router.get("/all", authenticate, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Order Details
router.get("/:id", authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mark Order as Completed
router.put("/complete/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, { completed: true }, { new: true })
    .then((order) => res.json(order))
    .catch((err) => console.log(err));
});

// Update Order Status
router.put("/update/status/:id", authenticate, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
