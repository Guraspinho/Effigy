
const mongoose = require('mongoose');

const Postschema = mongoose.Schema(
    {
        title:
        {
            type: String,
            maxlength: 256,
        },
        photoUrl:
        {
            type: String,
            required: [true,'Posts must include photos']
        },
        visibility:
        {
            type: String,
            enum: ['only me','friends','public'],
            required: [true, 'A post must have visability status']
        },
        likes:
        {
            type: Number,
            default: 0,
            min: [0,'Likes can not be negative numbers']
        },
        createdBy:
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }

    },
    {timestamps:true});

module.exports = mongoose.model('Post',Postschema);