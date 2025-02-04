const router = require('express').Router();
const {
    HomepageController,
    SignupController,
    SigninController
} = require('../controllers/usercontrollers');

const  { isloggedin }  = require('../middlewares/authtoken');

/**
 * @route GET /user/
 * @desc testing route
 * @access Public
 */
router.get('/', isloggedin,  HomepageController);

/**
 * @route POST /user/signup
 * @desc signups the user
 * @access Public
 */
router.post('/signup', SignupController);

/**
 * @route POST /user/signin
 * @desc signins the existing user
 * @access Public
 */
 router.post('/signin', SigninController);


module.exports = router;