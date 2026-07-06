// pagination
const ITEMS_PER_PAGE = 12;

// split instructions into sentences
export function getInstructionSteps(instructions) {
    return instructions
        .split('. ')
        .map(step => step.trim())
        .filter(step => step.length > 0);

}

// creates recipe cards
export function createRecipeCard(recipe) {
    const recipePath = `/recipe/${recipe.mealDbId}`;
    return `
        <a href="${recipePath}" class="text-decoration-none text-dark">
            <div class="recipe-card">
                <div class="recipe-img" style="background-image: url('${recipe.image}')"></div>
                <h4>${recipe.name}</h4>
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

export function displayAllRecipeCards(recipes, page = 1){
    const allRecipesContainer = document.querySelector('#recipe-container');
    if (!allRecipesContainer) return;

    allRecipesContainer.innerHTML = '';

    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = recipes.slice(start, start + ITEMS_PER_PAGE);

    paginated.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-3';
        card.innerHTML = createRecipeCard(recipe);
        allRecipesContainer.appendChild(card);
    });
}

// pagination logic
export function renderPagination(recipes, currentPage, onPageChange) {
    const pagination = document.querySelector('#pagination');
    if (!pagination) return;

    pagination.innerHTML = '';

    const pageCount = Math.ceil(recipes.length / ITEMS_PER_PAGE);
    
    // go to previous
    const prev = document.createElement('li');
    prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prev.innerHTML = `<button class="page-link">Previous</button>`;
    prev.onclick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    pagination.appendChild(prev);

    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;

        const btn = document.createElement('button');
        btn.className = 'page-link';
        btn.textContent = i;

        btn.addEventListener('click', () => {
            onPageChange(i);
        });

        li.appendChild(btn);
        pagination.appendChild(li);
    }

    // go to next
    const next = document.createElement('li');
    next.className = `page-item ${currentPage === pageCount ? 'disabled' : ''}`;
    next.innerHTML = `<button class="page-link">Next</button>`;
    next.onclick = () => {
        if (currentPage < pageCount) {
            onPageChange(currentPage + 1);
        }
    };
    pagination.appendChild(next);
}


async function loadFeaturedRecipes() {
    const response = await fetch('/api/recipes');
    const data = await response.json();

    const shuffled = data.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 8);
}

loadFeaturedRecipes().then(recipes => {
    displayFeaturedRecipeCards(recipes);
});