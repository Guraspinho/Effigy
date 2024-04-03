const express = require('express');

const {
    addComment,
    editComment,
    deleteComment,
} = require('../controllers/comments');

const router = express.Router();


router.route('/add').post(addComment);
router.route('/edit').post(editComment);
router.route('/delete').delete(deleteComment);


module.exports = router;