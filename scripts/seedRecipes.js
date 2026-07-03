require("dotenv").config();
const mongoose = require("mongoose");

const Recipe = require("../models/Recipe");
const connectDB = require("../config/database");

// ?this function removes empty fields in measures and ingredients
function getIngredients(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                name: ingredient,
                measure: measure
            });
        }
    }

    return ingredients;
}

function normalizeMeal(meal) {
    return {
        mealDbId: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        ingredients: getIngredients(meal)
    };
}

async function seedDatabase() {
    await connectDB();
    console.log("Connected to DB");

    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
    );

    const data = await response.json();

    const meals = data.meals;
    console.log("Desserts found:", meals.length);

    for (const meal of meals) {
        const fullResponse = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );

        const fullData = await fullResponse.json();
        const fullMeal = fullData.meals[0];

        const normalized = normalizeMeal(fullMeal);

        await Recipe.create(normalized);

        console.log(`Saved: ${normalized.name}`);
    }

    console.log("all recipes seeded");
}

seedDatabase()