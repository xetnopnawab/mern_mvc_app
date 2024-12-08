const Recipe = require('../models/recipeschema');

exports.CreateRecipeService = (body) => {
    const { dish, chef, image, description, ingredients} = body;
    const newRecipe = new Recipe({dish, chef, image, description, ingredients});

    return new Promise((resolve, reject) => {
        Recipe.findOne({dish})
            .then(recipe => {
                if(recipe) return reject('Recipe Already Exists');
                newRecipe.save()
                    .then(recipeCreated => resolve(recipeCreated))
                    .catch(err => reject(err));
            })
    });
}

exports.SingleRecipeService = (id) => {
    return new Promise((resolve, reject) => {
        Recipe.findOne({_id:id})
            .then(recipeFound => recipeFound ? resolve(recipeFound): reject('Recipe Not Found') )
            .catch(err => reject(err));
    });
}

exports.ReadRecipeService = () => {
    return new Promise((resolve, reject) => {
        Recipe.find()
            .then(recipiesFound => resolve(recipiesFound))
            .catch(err => reject(err));
    });
}

exports.UpdateRecipeService = (id, body) => {
    const { dish, chef, image, description, ingredients} = body;
    const UpdatedRecipe = {dish, chef, image, description, ingredients};
    return new Promise((resolve, reject) => {
        Recipe.findOneAndUpdate({_id: id},{$set: UpdatedRecipe}, {new: true})
        .then(recipeUpdated => resolve(recipeUpdated))
        .catch(err => reject(err));
    });
}

exports.DeleteRecipeService = (id) => {
    return new Promise((resolve, reject) => {
        Recipe.findOneAndDelete({_id: id})
        .then(recipeDeleted => resolve(recipeDeleted))
        .catch(err => reject(err));
    });
}