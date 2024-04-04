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
            type: mongoose.Types.ObjectId,
            required: true
        },
        createdBy:
        {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {timestamps:true});


module.exports = mongoose.model('Comments',commentsSchema);