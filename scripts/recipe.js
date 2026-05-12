import { getPath, loadNavbar, loadFooter } from './script.js';
import { getMealById } from './api.js';

loadNavbar();
loadFooter();

// single recipes
const singleRecipeContainer = document.querySelector('#single-recipe-container');

if (singleRecipeContainer) {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    getMealById(recipeId)
    .then(recipe => {
        if (!recipe) {
            singleRecipeContainer.innerHTML = `
                <h2>Recipe not found</h2>
            `;
            return;
        }

        singleRecipeContainer.innerHTML = `
            <h1>${recipe.name}</h1>
            <img class="single-recipe-img" src='${recipe.image}'> <br>
            <h3>Info</h3>
            <p>
                Category: ${recipe.category || 'Unknown'}
            </p>
            <p>
                Cuisine: ${recipe.area || 'Unknown'}
            </p>
            <h3>Instructions</h3>
            <p>${recipe.instructions}</p>
        `;
    })
    .catch(error => console.log(error));
}