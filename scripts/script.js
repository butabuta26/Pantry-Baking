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
              <div class="recipe-img"></div>
              <h4>${recipe.name}</h4>
              <div class="d-flex gap-2 flex-wrap">
                  <span class="recipe-tag">
                      ${recipe.time}
                  </span>
                  <span class="recipe-tag">
                      ${recipe.difficulty}
                  </span>
              </div>
          </div>
      </a>
  `;
}
  
// cards featured
const HomeContainer = document.querySelector('#home-container');
if (HomeContainer) {
    fetch(getPath('datas/data.json'))
    .then(response => response.json())
    .then(recipes => {
        const featuredRecipes = recipes.filter(recipe => recipe.featured);
        featuredRecipes.forEach(recipe => {
          const card = document.createElement('div');
          card.className = 'col-md-6 col-lg-3';
          card.innerHTML = createRecipeCard(recipe);
          HomeContainer.appendChild(card);
      });
      })
      .catch(error => console.log(error));
};

// all recipes cards
const allRecipesContainer = document.querySelector('#recipe-container');
if (allRecipesContainer) {
    fetch(getPath('datas/data.json'))
      .then(response => response.json())
      .then(recipes => {
        recipes.forEach(recipe => {
          const card = document.createElement('div');     
          card.className = 'col-md-6 col-lg-3';      
          card.innerHTML = createRecipeCard(recipe);      
          allRecipesContainer.appendChild(card);
        });
      })
      .catch(error => console.log(error));
  }