import { getInstructionSteps } from './script.js';
import { getMealById } from './api.js';

function formatInstructions(instructions) {
    const steps = getInstructionSteps(instructions);

    return steps
        .map((step, index) => `
            <li>
                <span class="step-number">${index + 1}</span>
                ${step}.
            </li>
        `)
        .join('');
}

// single recipes
const singleRecipeContainer = document.querySelector('#single-recipe-container');

if (singleRecipeContainer) {
    const recipeId = window.location.pathname.split('/').pop();
    getMealById(recipeId)
    .then(recipe => {
        if (!recipe) {
            singleRecipeContainer.innerHTML = `
                <h2>Recipe not found</h2>
            `;
            return;
        }

        singleRecipeContainer.innerHTML = `
    <div class="row g-5">

        <div class="col-lg-5">
            <h1>${recipe.name}</h1>
            <img class="single-recipe-img" src="${recipe.image}" />
        </div>

        <div class="col-lg-7">
            <div class="recipe-info-box mb-4">
                <h4>Info</h4>
                <p>Category: ${recipe.category || 'Unknown'}</p>
                <p>Cuisine: ${recipe.area || 'Unknown'}</p>
            </div>
            <div class="recipe-ingredients-box mb-4">
                <h4>Ingredients</h4>
                <ul>
                    ${recipe.ingredients
                        .map(item => `
                            <li>
                                ${item.measure || ''} ${item.name}
                            </li>
                        `)
                        .join('')}
                </ul>
            </div>
            <div class="recipe-instructions-box">
                <h4>Instructions</h4>
                <ol class="recipe-steps">
                    ${formatInstructions(recipe.instructions)}
                </ol>
            </div>
        </div>
    </div>
`;
    })
    .catch(error => console.log(error));
}