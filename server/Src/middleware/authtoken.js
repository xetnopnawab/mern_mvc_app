const jwt = require('jsonwebtoken');

exports.isloggedin = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) res.status(401).json({error: 'Access denied'});
    try {
        const verified  = jwt.verify(token,process.env.SECRET_KEY_JWT);
        req.user = verified.user;
        next();
    } catch (error) {
        let message = '';
        if(!req.user) message = "Sesion Timeout";
        else message = error;
        res.status(500).json({error: message});
    }

}