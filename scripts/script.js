import { getRandomMeal, getMealsByCategory, getRandomDessertFeed } from './api.js';

// fix paths
export function getPath(path) {
    const isInPages = window.location.pathname.includes('/pages/');
    return isInPages ? `../${path}` : `./${path}`;
}
  
// navbar
export function loadNavbar() {
  fetch(getPath('components/navbar.html'))
      .then(response => response.text())
      .then(data => {
          const navbar = document.querySelector('#navbar');
          if (navbar) navbar.innerHTML = data;
      });
}
  
// footer
export function loadFooter() {
  fetch(getPath('components/footer.html'))
      .then(response => response.text())
      .then(data => {
          const footer = document.querySelector('#footer');
          if (footer) footer.innerHTML = data;
      });
}

loadNavbar();
loadFooter();

// creates recipe cards
export function createRecipeCard(recipe) {
  const recipePath = window.location.pathname.includes('/pages/')
      ? `recipe.html?id=${recipe.id}`
      : `pages/recipe.html?id=${recipe.id}`;

  return `
      <a href="${recipePath}" class="text-decoration-none text-dark">
          <div class="recipe-card">
              <div class="recipe-img" style="background-image: url('${recipe.image}')"></div>
              <h4>${recipe.name}</h4>
              <div class="d-flex gap-2 flex-wrap">
                  <span class="recipe-tag">
                    ${recipe.time ? `<span class="recipe-tag">${recipe.time}</span>` : ''}
                  </span>
                  <span class="recipe-tag">
                    ${recipe.difficulty ? `<span class="recipe-tag">${recipe.difficulty}</span>` : ''}
                  </span>
              </div>
          </div>
      </a>
  `;
}
  
function displayFeaturedRecipeCards(recipes){
    const homeContainer = document.querySelector('#home-container');
    if(homeContainer){
        homeContainer.innerHTML = '';

        const featuredRecipes = recipes;

        featuredRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-3';
            card.innerHTML = createRecipeCard(recipe);
            homeContainer.appendChild(card);
        });
    }
}

export function displayAllRecipeCards(recipes){
    const allRecipesContainer = document.querySelector('#recipe-container');
    if (allRecipesContainer) {
        allRecipesContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-3';
            card.innerHTML = createRecipeCard(recipe);
            allRecipesContainer.appendChild(card);
        });
    }
}

// suffle recipes
export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// fetch(getPath('datas/data.json'))
// .then(response => response.json())
// .then(recipes => {
//     displayFeaturedRecipeCards(recipes);
//     displayAllRecipeCards(recipes);
    
// })
// .catch(error => console.log(error));


// getRandomMeal()
// .then(recipe => {

//     displayFeaturedRecipeCards([recipe]);
//     displayAllRecipeCards([recipe]);

// })
// .catch(error => console.log(error));

// getRandomMeal().then(meal => {
//     console.log(meal);
// });

getMealsByCategory('Dessert')
.then(recipes => {

    // displayFeaturedRecipeCards(recipes);
    displayAllRecipeCards(recipes);

});

getRandomDessertFeed(8)
.then(recipes => {
    displayFeaturedRecipeCards(recipes);
    // displayAllRecipeCards(recipes);
});