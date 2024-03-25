const { UnauthenticatedError, BadRequestError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');

const changePassword = async (req,res) =>
{
    const {oldPassword,newPassword} = req.body;
    const _id = req.user.userId;


    const userCredentials = await User.findOne({_id});

    // check if length of a provided password is valid
    if(newPassword.length < 8 || newPassword.length > 32)
    {
        throw new BadRequestError('Please provide valid password');
    }


    const isPasswordCorrect = await userCredentials.comparePasswords(oldPassword);

    // check if provided old password is correct
    if(!isPasswordCorrect)
    {
        throw new UnauthenticatedError('Provided password is incorrect');
    }

    // Old and new passwords must be different
    if(oldPassword === newPassword)
    {
        throw new BadRequestError('Old and new passwords must not match');
    }

    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate( {_id}, {password:hashedNewPassword} , {new:true, runValidators:true} );
    
    res.status(StatusCodes.OK).json({user:{msg: 'Password was changed suecessfully'}});
}

const changeUsername = async (req,res) =>
{
    const {newUsername} = req.body;
    const _id = req.user.userId;
    
    // check if the user is tryung to add the username that is thhe same as before
    if(newUsername === req.user.username)
    {
        throw new BadRequestError(`Your username is already ${newUsername}`);
    }

    const userCredentials = await User.findById(_id);

    // Users can only update their usernames once per week

    if (userCredentials.lastUsernameChange && (Date.now() - userCredentials.lastUsernameChange < 7 * 24 * 60 * 60 * 1000))
    {
        throw new BadRequestError('You can only change your username once a week.');
    }
    

    await User.findOneAndUpdate( {_id}, {username:newUsername} , {new:true, runValidators:true} );

    res.status(StatusCodes.OK).json({user:{msg:'Username was updated suecessfully'}});
}

module.exports = 
{
    changePassword,
    changeUsername
}

