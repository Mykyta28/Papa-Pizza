const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");

// Get Summary of Orders
router.get("/summary", async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    let totalSales = 0;
    orders.forEach((order) => {
      totalSales += order.total;
    });
    res.json({
      totalOrders: totalOrders,
      totalSales: totalSales,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
