const User = require("../models/User");

module.exports = async function (req, res, next) {
  let user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }

  try {
    user = await User.findOne({ email: user.email });
    if (!user) {
      return res.redirect("/login");
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
