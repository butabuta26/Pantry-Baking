function home(req, res) {
    res.render('index');
}

function recipes(req, res) {
    res.render('recipes');
}

function recipe(req, res) {
    res.render('recipe');
}

function about(req, res) {
    res.render('about');
}

function contact(req, res) {
    res.render('contact');
}

module.exports = {
    home,
    recipes,
    recipe,
    about,
    contact
};