const mongoose = require('mongoose');

const recipeschema = new mongoose.Schema({
    dish: String,
    chef: String,
    image: String,
    description: String,
    ingredients: [String]
}, {timestamps: true});

module.exports = mongoose.model('recipe', recipeschema);