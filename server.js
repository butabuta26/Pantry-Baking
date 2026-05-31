const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/recipes', (req, res) => {
    res.render('recipes');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/recipe', (req, res) => {
    res.render('recipe');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});