const express = require('express');

const {
    addComment,
    editComment,
    deleteComment,
} = require('../controllers/comments');

const router = express.Router();


router.route('/add/:id').post(addComment);
router.route('/edit/:id').put(editComment);
router.route('/delete/:id').delete(deleteComment);


module.exports = router;