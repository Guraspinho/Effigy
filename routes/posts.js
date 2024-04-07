const express = require('express');
const {
    addPost,
    editPost,
    deletePost,
    like,
} = require('../controllers/posts');

const router = express.Router();


router.route('/add').post(addPost);
router.route('/edit/:id').patch(editPost);
router.route('/delete/:id').delete(deletePost);
router.route('/like/:id').put(like);



module.exports = router;
