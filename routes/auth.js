const express = require('express');
const {login,loginPage,signup,signupPage, confirmEmail} = require('../controllers/auth');
const { route } = require('express/lib/router');
const router = express.Router();

router.route('/login').get(loginPage).post(login);
router.route('/signup').get(signupPage).post(signup);
router.route('/confirm').post(confirmEmail);

module.exports = router;