const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const Friends = require('../models/friends');
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');

// send friend request, confirm friend request, decline request  delete from friends list, get all friends list, see all requests

const sendRequest = asyncWrapper(async (req,res) =>
{
    const {email} = req.body;
    const {userId} = req.user; // the one that sends request

    const credentials = await User.findOne({email}); // the one that recives request
    

    // Check if user with such email exists or not
    if(credentials === null)
    {
        throw new NotFoundError ('Could not find user with such email');
    }

    const {_id} = credentials;


    // users obviously can not add themselves as friends
    if(userId == _id)
    {
        throw new BadRequestError ('Stop trying to add yourself in friends list')
    }

    // check if two users are already friends 
    const alreadyFriends = await Friends.findOne({
        $or: [
            { firstUserId: userId, secondUserId: _id },
            { firstUserId: _id, secondUserId: userId }
        ]
    });

    if(alreadyFriends)
    {
        throw new BadRequestError ('You already are a friend of a person or have a pending friend request');
    }

    await Friends.create({firstUserId: userId, secondUserId: _id});

    res.status(StatusCodes.OK).json({User:{msg:'Friend request was send suecessfully'}});
});

const getRequests = async (req,res) =>
{
    const {userId} = req.user; 

    const requestsList = await Friends.find({ 
        $and: 
        [
            { secondUserId: userId },
            { status: 'pending' }
        ]
    });

    res.status(StatusCodes.OK).json({requestsList});
}

const getFriendsList = async (req,res) =>
{
    const {userId} = req.user; 

    // in order for people to be friends, userId needs to be ether firstuserId or second one and status must be confirmed
    const friendsList = await Friends.find({
        $or: [
            { $and: [{ firstUserId: userId }, { status: 'confirmed' }] },
            { $and: [{ secondUserId: userId }, { status: 'confirmed' }] }
        ]
    });

    res.status(StatusCodes.OK).json({friendsList});
}

// change status from pending to confirmed in status, i need two 
const confirmRequest = asyncWrapper(async (req,res) =>
{
    const {id} = req.params
    res.status(StatusCodes.OK).json({User:{msg:'Confirmed friend request'}});
});

const declineRequest = asyncWrapper(async (req,res) =>
{
    res.status(StatusCodes.OK).json({User:{msg:'Declined friend request'}});
});

const deleteFriend = asyncWrapper(async (req,res) =>
{
    res.status(StatusCodes.OK).json({User:{msg:'A Friend was deleted suecessfully'}});
});

module.exports = 
{
    sendRequest,
    confirmRequest,
    declineRequest,
    deleteFriend,
    getRequests,
    getFriendsList
}