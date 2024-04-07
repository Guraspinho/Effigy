const mongoose = require('mongoose');

const likesSchema = mongoose.Schema(
    {
        postId:
        {
            ref: 'Post',
            type: mongoose.Types.ObjectId
        },
        likedBy:
        {
            ref: 'User',
            type: mongoose.Types.ObjectId
        }
    }
)
module.exports = mongoose.model('Likes',likesSchema);