const express = require('express');
const {changePassword,changeUsername, uploadPfp} = require('../controllers/credentials');
const {logout} = require('../controllers/auth');
const router = express.Router();

router.route('/password').put(changePassword);
router.route('/username').put(changeUsername);
router.route('/logout').put(logout);
router.route('/upload').put(uploadPfp);

module.exports = router;