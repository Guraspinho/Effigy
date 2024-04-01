const express = require('express');
const {
    sendRequest,
    confirmRequest,
    declineRequest,
    deleteFriend,
    getRequests,
    getFriendsList} = require('../controllers/friends')

const router = express.Router();

router.route('/sendrequest').post(sendRequest);
router.route('/acceptrequest/:id').put(confirmRequest);
router.route('/declinerequest/:id').delete(declineRequest);
router.route('/deletefriend/:id').delete(deleteFriend);
router.route('/requests').get(getRequests);
router.route('/').get(getFriendsList);

module.exports = router;