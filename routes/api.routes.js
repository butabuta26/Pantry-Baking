const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");
const User = require("../models/User");

router.get("/recipes", async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

router.get("/recipes/:id", async (req, res) => {
    const recipe = await Recipe.findOne({ mealDbId: req.params.id });

    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    let liked = false;

    if (req.user) {
        const user = await User.findById(req.user._id);

        liked = user.likedRecipes.some(id => id.equals(recipe._id));
    }

    res.json({
        ...recipe.toObject(),
        liked
    });
});

module.exports = router;