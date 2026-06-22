const express = require("express");

const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})
);

router.post("/register", checkNotAuthenticated, async (req, res) => {
    // console.log("Register route hit!");
    try {
        const { name, email, password } = req.body;

        if (password.length < 8) {
            req.flash("error", "Password must be at least 8 characters long.");
            return res.redirect("/register");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            req.flash("error", "An account with that email already exists.");
            return res.redirect("/register");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        // console.log("Saved user:", newUser);

        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.redirect("/register");
    }
});

router.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
});

router.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

module.exports = router;