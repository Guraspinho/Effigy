const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema(
    {
        body:
        {
            type: String,
            maxlength: 512,
            required: true
        },
        postId:
        {
            ref: 'Post',
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