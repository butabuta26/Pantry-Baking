import { displayAllRecipeCards, getInstructionSteps, renderPagination } from './script.js';
import { getMealById } from './api.js';

const linkElementsDifficulty = document.querySelectorAll('.filter-diff-chip');
const searchInput = document.querySelector('[data-search]');
const searchInputButton = document.querySelector('[data-search-button]');

let selectedDifficulty = 'any';
let recipeData = [];

let currentPage = 1;
let filteredRecipes = [];

// load singular recipes
async function loadRecipes() {
    const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
    );

    const data = await response.json();
    const meals = data.meals;

    console.log("Basic meals:", meals);

    const fullRecipes = await Promise.all(
        meals.map(meal => getMealById(meal.idMeal))
    );

    console.log("Full recipes loaded:", fullRecipes);

    return fullRecipes;
}

// difficulty logic
function getDifficulty(instructions) {
    const steps = getInstructionSteps(instructions);
    const count = steps.length;

    if (count <= 4) return 'easy';
    if (count <= 8) return 'medium';
    return 'advanced';
}

// divide ingredients inputed into the search bar
function getSearchValues() {
    return searchInput.value
        .toLowerCase()
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
}

// filter main logic
function applyFilters() {
    const values = getSearchValues();

    console.log("=== APPLY FILTERS ===");
    console.log("Selected difficulty:", selectedDifficulty);
    console.log("Search values:", values);

    const filtered = recipeData.filter(data => {
        const difficulty = getDifficulty(data.instructions);

        const matchDifficulty =
            selectedDifficulty === 'any' ||
            difficulty === selectedDifficulty;

        const matchSearch =
            values.length === 0 ||
            data.ingredients.some(ingredient =>
                values.some(value =>
                    ingredient.name.toLowerCase().includes(value)
                )
            );

        return matchDifficulty && matchSearch;
    });

    console.log("Filtered results:", filtered.length);

    filteredRecipes = filtered;
    currentPage = 1;

    updateUI();
}


function updateUI() {
    displayAllRecipeCards(filteredRecipes, currentPage);

    renderPagination(
        filteredRecipes,
        currentPage,
        (newPage) => {
            currentPage = newPage;
            updateUI();
        }
    );
}

// filter chip logics
function setupFilters() {
    linkElementsDifficulty.forEach((chip) => {
        chip.addEventListener('click', (event) => {
            const difficulty = event.target.dataset.value;

            if (chip.classList.contains('active')) {
                chip.classList.remove('active');
                selectedDifficulty = 'any';
            } else {
                linkElementsDifficulty.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                selectedDifficulty = difficulty;
            }

            applyFilters();
        });
    });

    searchInputButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('input', applyFilters);
}

// initialization
loadRecipes().then(data => {
    recipeData = data;

    console.log("Recipes ready:", recipeData);

    filteredRecipes = recipeData;
    updateUI();

    setupFilters();
});