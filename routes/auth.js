const express = require('express');
const {signup, confirmEmail} = require('../controllers/auth');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/confirm/:id').get(confirmEmail);

module.exports = router;