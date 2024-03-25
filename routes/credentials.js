const express = require('express');
const {changePassword,changeUsername} = require('../controllers/credentials');
const {logout} = require('../controllers/auth');
const router = express.Router();

router.route('/password').put(changePassword);
router.route('/username').put(changeUsername);
router.route('/logout').put(logout);

module.exports = router;