const express = require('express');
const {sendRequest,confirmRequest,declineRequest,deleteFriend} = require('../controllers/friends')

const router = express.Router();

router.route('/sendrequest').post(sendRequest);
router.route('/acceptrequest/:id').put(confirmRequest);
router.route('/declinerequest/:id').put(declineRequest);
router.route('/deletefriend/:id').delete(deleteFriend);

module.exports = router;