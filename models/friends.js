const mongoose = require('mongoose');

const friendsSchema = mongoose.Schema(
    {
        firstUserId:
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        secondUserId:
        {   
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status:
        {
            type: String,
            enum: ['pending','accepted'],
            default: 'pending'
        }


    },
    {timestamps:true});

module.exports = mongoose.model('Friends',friendsSchema);