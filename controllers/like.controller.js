const User = require("../models/User");
const Recipe = require("../models/Recipe");

async function toggleLike(req, res) {
    try {
        const recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found."
            });
        }

        const user = await User.findById(req.user._id);

        const alreadyLiked = user.likedRecipes.includes(recipeId);

        if (alreadyLiked) {
            user.likedRecipes.pull(recipeId);
        } else {
            user.likedRecipes.push(recipeId);
        }

        await user.save();

        res.json({
            success: true,
            liked: !alreadyLiked
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false
        });
    }
}

module.exports = {
    toggleLike
};