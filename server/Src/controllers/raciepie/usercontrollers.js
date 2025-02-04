const {
    SignupService,
    SigninService
} = require('../services/userservices');


exports.HomepageController = (req, res, next) => {
    res.status(200).json({message: 'This is Homepage'});
};

exports.SignupController = (req, res, next) => {
    SignupService(req.body)
        .then( user => res.status(201).json({user}))
        .catch(err => res.status(501).json({err}));
};

exports.SigninController = (req, res, next) => {
    SigninService(req)
        .then( user => res.status(200).json({token: user}))
        .catch(err => res.status(501).json({err}));
};