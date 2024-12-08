const {
    CreateRecipeService,
    SingleRecipeService,
    ReadRecipeService,
    UpdateRecipeService,
    DeleteRecipeService
} = require('../services/recipeservices');

const { ValidateRecipe } = require('../validations/recipevalidator');

exports.CreateRecipeController = (req, res, next) => {

     const { value, error } = ValidateRecipe(req.body);

     if(error) return res.status(402).json({error:error.details.map(m => m.message)});

    CreateRecipeService(value)
        .then( recipe => res.status(201).json({message: 'New Recipe Created', recipe}))
        .catch(error => res.status(501).json({message: 'Something Went Wrong!', error}) );
};

exports.SingleRecipeController = (req, res, next) => {
    SingleRecipeService(req.params.id)
        .then( recipe => res.status(200).json({message: 'Recipe Found', recipe}))
        .catch(error => res.status(501).json({message: 'Something Went Wrong!', error}) );
};

exports.ReadRecipeController = (req, res, next) => {
    ReadRecipeService()
        .then( recipies => res.status(200).json({message: 'Recipies Found', recipies}))
        .catch(error => res.status(501).json({message: 'Something Went Wrong!', error}) );
};

exports.UpdateRecipeController = (req, res, next) => {

    const { value, error } = ValidateRecipe(req.body);

    if(error) return res.status(402).json({error:error.details.map(m => m.message)});
    
    UpdateRecipeService(req.params.id,value)
        .then( recipe => res.status(201).json({message: 'Recipe Updated', recipe}))
        .catch(error => res.status(501).json({message: 'Something Went Wrong!', error}) );
};

exports.DeleteRecipeController = (req, res, next) => {
    DeleteRecipeService(req.params.id)
        .then( recipe => res.status(201).json({message: 'Recipe Deleted', recipe}))
        .catch(error => res.status(501).json({message: 'Something Went Wrong!', error}) );
};