const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    req.session.user = user;
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/loggout", async (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});
module.exports = router;
