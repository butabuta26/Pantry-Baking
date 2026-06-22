function login(req, res) {
    const messages = req.flash();
    res.render("login", { messages });
}

function register(req, res) {
    res.render("register");
}

module.exports = {
    login,
    register
};