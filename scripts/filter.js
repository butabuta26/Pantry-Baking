import { getPath, displayAllRecipeCards } from './script.js';

const linkElementsDifficulty = document.querySelectorAll('.filter-diff-chip');
const linkElementsTime = document.querySelectorAll('.filter-time-chip');

const searchInput = document.querySelector('[data-search]');
const searchInputButton = document.querySelector('[data-search-button]')

let selectedDifficulty = 'any';
let selectedTime = 'any';

fetch(getPath('datas/data.json'))
.then(response => response.json())
.then(recipeData => {
    function applyFilters() {
        const filtered = recipeData.filter(data => {
            const matchDifficulty =
                selectedDifficulty === 'any' ||
                data.difficulty.toLowerCase() === selectedDifficulty;

            const matchTime =
                selectedTime === 'any' ||
                data.time_value === selectedTime;
            // console.log(matchDifficulty, matchTime);
            return matchDifficulty && matchTime;
        });

        displayAllRecipeCards(filtered);
    }
// difficulty chips
    linkElementsDifficulty.forEach((links) => {
        links.addEventListener('click', (element) => {

            const difficulty = element.target.dataset.value;

            if (links.classList.contains('active')) {
                links.classList.remove('active');
                selectedDifficulty = 'any';
            } else {
                linkElementsDifficulty.forEach(chip => chip.classList.remove('active'));
                links.classList.add('active');
                selectedDifficulty = difficulty;
            }

            applyFilters();
        });
    });

    // time chips
    linkElementsTime.forEach((links) => {
        links.addEventListener('click', (element) => {

            const time = element.target.dataset.value;

            if (links.classList.contains('active')) {
                links.classList.remove('active');
                selectedTime = 'any';
            } else {
                linkElementsTime.forEach(chip => chip.classList.remove('active'));
                links.classList.add('active');
                selectedTime = time;
            }

            applyFilters();
        });
    });

    // all recipes
    displayAllRecipeCards(recipeData);

    // search bar
    searchInputButton.addEventListener('click', () => {
        const values = searchInput.value
        .toLowerCase()
        .split(',')
        .map(item => item.trim());

    const filteredRecipes = recipeData.filter(card => {
        return card.ingredients.some(ingredient =>
            values.some(value =>
                ingredient.toLowerCase().includes(value)
            )
        );
    });
    displayAllRecipeCards(filteredRecipes);
    
    })
});

