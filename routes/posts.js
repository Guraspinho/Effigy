const express = require('express');
const {
    addPost,
    editPost,
    deletePost,
    addLike,
    removeLike
} = require('../controllers/posts');

const router = express.Router();


router.route('/add').post(addPost);
router.route('/edit').patch(editPost);
router.route('/delete').delete(deletePost);
router.route('/like').put(addLike);
router.route('/removelike').put(removeLike);


module.exports = router;
