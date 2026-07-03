const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe');

router.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

router.get('/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findOne({ mealDbId: req.params.id });

    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
});

module.exports = router;