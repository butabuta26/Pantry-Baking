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

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

router.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

module.exports = router;