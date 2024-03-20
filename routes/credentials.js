const express = require('express');
const {changePassword} = require('../controllers/credentials');
const router = express.Router();

router.route('/auth').put(changePassword);

module.exports = router;