const express = require('express');
const {signup, confirmEmail, login} = require('../controllers/auth');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/confirm/:id').get(confirmEmail);
router.route('/login').post(login);


module.exports = router;    