import { createRecipeCard } from "./script.js";

const container = document.querySelector("#liked-container");

window.likedRecipes.forEach(recipe => {
    const card = document.createElement("div");

    card.className = "col-md-6 col-lg-3";

    card.innerHTML = createRecipeCard(recipe);

    container.appendChild(card);
});

