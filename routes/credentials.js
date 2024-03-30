const express = require('express');
const {changePassword,changeUsername, uploadPfp} = require('../controllers/credentials');
const {logout} = require('../controllers/auth');
const {upload} = require('../middlewares/fileUpload');
const router = express.Router();

router.route('/password').put(changePassword);
router.route('/username').put(changeUsername);
router.route('/logout').put(logout);

// upload profile pucture
router.route('/upload').put(upload.array('file'), uploadPfp);

module.exports = router;