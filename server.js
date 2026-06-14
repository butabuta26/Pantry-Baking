const express = require('express');

const app = express();

const recipeRoutes = require('./routes/recipe.routes');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', recipeRoutes);

app.listen(3000, () => {
    console.log('server side');
});