const mongoose = require('mongoose');
const {BadRequestError} = require('../errors/everyError')

const commentsSchema = mongoose.Schema(
    {
        body:
        {
            type: String,
            maxlength: [512,'A comment can not be bigger than 512 characters'],
            required: [true, 'Can not post an empty comment']
        },
        postId:
        {
            ref: 'Post',
            type: mongoose.Types.ObjectId,
            required: [true, 'Must provide postId']
        },
        createdBy:
        {
            ref:'User',
            type: mongoose.Types.ObjectId,
            required: [true,'Must provide createdBy']
        }
    },
    {timestamps:true});




module.exports = mongoose.model('Comment',commentsSchema);