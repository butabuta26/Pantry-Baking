const User = require("../models/User");
const bcrypt = require("bcrypt");

async function account(req, res) {
    // console.log(req.user);
    const user = await User.findById(req.user._id)
        .populate("likedRecipes");

    res.render("account", {
        user
    });
}

async function editProfile(req, res) {
    const user = await User.findById(req.user._id);
    const messages = req.flash();

    res.render("edit-profile", {
        user,
        messages
    });

}

async function updateProfile(req, res) {

    const user = await User.findById(req.user._id);

    user.name = req.body.name;
    if (req.body.avatar.trim() !== "") {
        user.avatar = req.body.avatar;
    }

    if (req.body.password !== "") {
        if (req.body.password !== req.body.confirmPassword) {
            req.flash("error", "Passwords do not match.");
            return res.redirect("/account/edit");
        }
        if (req.body.password.length < 8) {
            req.flash("error", "Password must be at least 8 characters.");
            return res.redirect("/account/edit");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        user.password = hashedPassword;
    }

    await user.save();

    res.redirect("/account");

}

module.exports = {
    account,
    editProfile,
    updateProfile
};