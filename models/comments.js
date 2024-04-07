const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema(
    {
        body:
        {
            type: String,
            maxlength: 512
        },
        postId:
        {
            ref: 'Posts',
            type: mongoose.Types.ObjectId,
            required: true
        },
        createdBy:
        {
            ref: 'User',
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {timestamps:true});


module.exports = mongoose.model('Comments',commentsSchema);