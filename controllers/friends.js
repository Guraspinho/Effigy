const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const Friends = require('../models/friends');
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');

// send friend request, confirm friend request, decline request  delete from friends list, get all friends list, see all requests

// send a friend request
const sendRequest = asyncWrapper(async (req,res) =>
{
    const {email} = req.body; // the one that recives request
    const {userId} = req.user; // the one that sends request
    
    // for restricting number of friends for each user
    const friendsCount = await Friends.find(
        {
            $or:
            [
                {firstUserId:userId},
                {secondUserId:userId}
            ]
        });

    // max number of friends is 150
    if(friendsCount.length === 150)
    {
        throw new BadRequestError('You have already reached maximum number of friends');
    }

    const credentials = await User.findOne({email}); 

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

// get all friend requests
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

// get all friends
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

// confirm friend request
const confirmRequest = asyncWrapper(async (req,res) =>
{
    const {userId} = req.user; 
    const {id} = req.params;

    const friend = await Friends.findOneAndUpdate(
        {
            $and: 
            [
                { firstUserId: id },
                { secondUserId: userId },
                { status: 'pending' }
            ]
        },
        {status: 'confirmed'}
    );
        
    // check wether that request exists or not
    if(!friend)
    {
        throw new NotFoundError(`No request found with ID: ${id}`);
    }
    
    res.status(StatusCodes.OK).json({friend});
});

// delete friend request
const declineRequest = asyncWrapper(async (req,res) =>
{
    const {userId} = req.user; 
    const {id} = req.params;

    const friend = await Friends.findOneAndDelete(
        {
            $and: 
            [
                { firstUserId: id },
                { secondUserId: userId },
                { status: 'pending' }
            ]
        }
    );

    // check wether that request exists or not
    if(!friend)
    {
        throw new NotFoundError(`No request found with ID: ${id}`);
    }

    res.status(StatusCodes.OK).json({User:{msg:'Friend request was deleted'}});
});

// delete a friend
const deleteFriend = asyncWrapper(async (req,res) =>
{
    const {userId} = req.user; 
    const {id} = req.params;

    const friend = await Friends.findOneAndDelete({
        $and:
        [
            {
                $or:
                [
                    { firstUserId: userId, secondUserId: id },
                    { firstUserId: id, secondUserId: userId }
                ]
            },
            { status: 'confirmed' }
        ]
    });

    // check wether you are friends with that person or not
    if(!friend)
    {
        throw new BadRequestError('You guys are not friends');
    }

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