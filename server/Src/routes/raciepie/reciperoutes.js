const router = require('express').Router();
const {
    CreateRecipeController,
    SingleRecipeController,
    ReadRecipeController,
    UpdateRecipeController,
    DeleteRecipeController
} = require('../controllers/recipecontrollers');

/**
 * @route POST /recipe/create
 * @desc creates the new recipe
 * @access Public
 */
router.post('/create', CreateRecipeController);

/**
 * @route POST /recipe/singlerecipe/:id
 * @desc reads the single recipe a/c to the given id
 * @access Public
 */
 router.post('/singlerecipe/:id', SingleRecipeController);

 /**
 * @route POST /recipe/read
 * @desc reads the hole recipe in the database
 * @access Public
 */
  router.post('/read', ReadRecipeController);

/**
 * @route PATCH /recipe/update/:id
 * @desc reads the existing recipe a/c to the given id
 * @access Public
 */
 router.patch('/update/:id', UpdateRecipeController);

/**
 * @route DELETE /recipe/delete/:id
 * @desc deletes the existing recipe a/c to the given id
 * @access Public
 */
 router.delete('/delete/:id', DeleteRecipeController);

module.exports = router;