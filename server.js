const express = require("express");
const router = express.Router();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb://localhost/pizza-order-app";
// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const store = new MongoDBSession({
  uri,
  collection: "mySessions",
});
router.use(
  session({
    secret: "string",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(router);
// Load models
/*
require("./models/User");*/
const Pizza = require("./models/Pizza");
const Order = require("./models/Order");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Middleware for authentication
const authenticate = require("./middlewares/authenticate");
// Handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
app.get("/", authenticate, async (req, res) => {
  res.render("index", {
    title: "Papa Pizza",
    pizzas: JSON.parse(JSON.stringify(await Pizza.find())),
    css: ["index/index.css"],
    js: ["index/index.js"],
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    js: ["login/index.js"],
    css: ["login/index.css"],
    notLogged: true,
  });
});

app.get("/sign-up", (req, res) => {
  res.render("sign_up", {
    title: "Sign Up",
    js: ["sign_up/index.js"],
    css: ["sign_up/index.css"],
    notLogged: true,
  });
});

// Routes for pages
app.get("/create_order", authenticate, (req, res) => {
  res.render("create_order"); // Render the HTML page using Handlebars
});

app.get("/customize", authenticate, async (req, res) => {
  req.query.amount =
    typeof req.query.amount === "undefined" ? 1 : req.query.amount;
  res.render("customization", {
    title: "Pizza customization",
    pizza: JSON.parse(
      JSON.stringify(await Pizza.findOne({ _id: req.query.id }))
    ),
    css: ["customization/index.css"],
    js: ["customization/index.js"],
    params: req.query,
  });
});

app.get("/cart", authenticate, async (req, res) => {
  res.render("cart", {
    title: "Cart",
    css: ["cart/index.css"],
    js: ["cart/index.js"],
    params: req.query,
  });
});

app.get("/view_orders", authenticate, async (req, res) => {
  res.render("view_orders", {
    title: "View orders",
    orders: JSON.parse(
      JSON.stringify(
        await Order.find({ customer: req.session.user._id })
          .populate("customer")
          .populate("details.pizza")
          .exec()
      )
    ).map((p) => {
      p.date = new Date(p.date).toLocaleString();
      return p;
    }),
    css: ["view_orders/index.css"],
  });
});

// Order routes
const orderRoutes = require("./routes/orders");
app.use("/orders", orderRoutes);

// User routes
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

// Report routes
const reportRoutes = require("./routes/reports");
app.use("/reports", reportRoutes);

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.use("/orders", authenticate);

// Protected routes with role-based authorization
const authorize = require("./middlewares/authorize");
app.use("/orders", authenticate, authorize(["employee"]));

// Error handling middleware
const errorHandler = require("./middlewares/errorHandler");
const { title } = require("process");
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
