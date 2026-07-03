const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: String,
    measure: String
}, { _id: false });

const recipeSchema = new mongoose.Schema({
    mealDbId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    category: String,
    area: String,
    instructions: String,
    ingredients: [ingredientSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);