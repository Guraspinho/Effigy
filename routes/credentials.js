const express = require('express');
const {changePassword} = require('../controllers/credentials');
const {logout} = require('../controllers/auth');
const router = express.Router();

router.route('/password').put(changePassword);
router.route('/logout').put(logout);

module.exports = router;