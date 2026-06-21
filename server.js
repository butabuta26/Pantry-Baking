if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const path = require("path");
const mongoose = require("mongoose");

const initializePassport = require("./passport-config");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.error(err));

const users = [];

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
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
app.use(methodOverride("_method"))

// Make flash messages available in all EJS templates
// app.use((req, res, next) => {
//     res.locals.messages = req.flash();
//     next();
// });

// app.use((req, res, next) => {
//     console.log(req.flash());
//     next();
// });

// Routes
app.use("/", recipeRoutes);

// Authentication
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })
);

// Registration
app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        console.log(users);
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.redirect("/register");
    }
});

app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});