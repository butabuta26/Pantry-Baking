function login(req, res) {
    const messages = req.flash();
    res.render("login", { messages });
}

function register(req, res) {
    const messages = req.flash();
    res.render("register", { messages });
}

module.exports = {
    login,
    register
};