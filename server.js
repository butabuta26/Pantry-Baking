console.log("=== THIS IS MY SERVER.JS ===");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const initializePassport = require("./passport-config");
const recipeRoutes = require("./routes/recipe.routes");
const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");

const app = express();

const connectDB = require("./config/database");
connectDB();

const User = require("./models/User");


initializePassport(
    passport,
    async email => await User.findOne({ email }),
    async id => await User.findById(id)
);

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(methodOverride("_method"))

// Routes
app.use("/", recipeRoutes);
app.use("/", authRoutes);
app.use("/account", accountRoutes);
app.use('/api', require('./routes/api.routes'));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});