const express = require('express');
const {login,loginPage,signup,signupPage} = require('../controllers/auth');
const router = express.Router();

router.route('/login').get(loginPage).post(login);
router.route('/signup').get(signupPage).post(signup);

module.exports = router;