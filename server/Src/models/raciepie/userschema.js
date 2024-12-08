const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
}, {timestamps: true});

module.exports = mongoose.model('user', userschema);