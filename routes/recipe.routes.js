const express = require('express');
const router = express.Router();

const pageController = require('../controllers/recipe.controller');
const likeController = require("../controllers/like.controller");
const { checkAuthenticated } = require("../middleware/auth");

router.get('/recipes', pageController.recipes);
router.get('/recipe/:id', pageController.recipe);
router.get('/about', pageController.about);
router.get('/contact', pageController.contact);

router.post("/recipe/:id/like", checkAuthenticated, likeController.toggleLike);

module.exports = router;