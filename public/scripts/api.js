// import { shuffleArray } from "./script";
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';


function normalizeMeal(meal) {
    return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        instructions: meal.strInstructions,
        category: meal.strCategory,
        area: meal.strArea,
        ingredients: getIngredients(meal)
    };
}

function normalizeMealPreview(meal) {
    return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb
    };
}

export async function getRandomMeal() {
    const response = await fetch(`${BASE_URL}/random.php`);

    const data = await response.json();

    return normalizeMeal(data.meals[0]);
}

export async function getMealById(id) {
    const response = await fetch(
        `${BASE_URL}/lookup.php?i=${id}`
    );

    const data = await response.json();

    return normalizeMeal(data.meals[0]);
}

export async function getMealsByCategory(category) {
    const response = await fetch(
        `${BASE_URL}/filter.php?c=${category}`
    );

    const data = await response.json();

    return data.meals.map(normalizeMealPreview);
}

export async function getRandomDessertFeed(limit = 8) {
    const response = await fetch(`${BASE_URL}/filter.php?c=Dessert`);
    const data = await response.json();

    const shuffled = data.meals.sort(() => Math.random() - 0.5);

    return shuffled
        .slice(0, limit)
        .map(normalizeMealPreview);
}

function getIngredients(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                name: ingredient,
                measure: measure
            });
        }
    }

    return ingredients;
}