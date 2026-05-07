import { getPath, loadNavbar, loadFooter } from './script.js';

loadNavbar();
loadFooter();

// single recipes
const singleRecipeContainer = document.querySelector('#single-recipe-container');

if (singleRecipeContainer) {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    fetch(getPath('datas/data.json'))
        .then(response => response.json())
        .then(recipes => {
            const recipe = recipes.find(r => r.id == recipeId);
            if (!recipe) {
                singleRecipeContainer.innerHTML = `
                    <h2>Recipe not found</h2>
                `;
                return;
            }
            // singleRecipeContainer.innerHTML = `
            
            //     <h1>${recipe.name}</h1>

            //     <div class="recipe-img"></div>

            //     <p>${recipe.description}</p>

            //     <h3>Ingredients</h3>

            //     <ul>
            //         ${recipe.ingredients
            //             .map(ingredient => `<li>${ingredient}</li>`)
            //             .join('')
            //         }
            //     </ul>

            //     <h3>Instructions</h3>

            //     <p>${recipe.instructions}</p>

            // `;
            singleRecipeContainer.innerHTML = `
            
            <h1>${recipe.name}</h1>

            <div class="recipe-img"></div>

            <div class="d-flex gap-2 mt-3">

                <span class="recipe-tag">
                    ${recipe.time}
                </span>

                <span class="recipe-tag">
                    ${recipe.difficulty}
                </span>

            </div>

            `;
        })

        .catch(error => console.log(error));
}