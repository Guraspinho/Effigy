const { UnauthenticatedError, BadRequestError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');

const changePassword = async (req,res) =>
{
    const {oldPassword,newPassword} = req.body;
    const _id = req.user.userId;


    const userCredentials = await User.findOne({_id});

    // checks wether user with provided credentials exist
    if(!userCredentials)
    {
        throw new UnauthenticatedError('User with provided email does not exist');
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

    const user = await User.findOneAndUpdate( {_id}, {password:hashedNewPassword} , {new:true, runValidators:true} );
    
    res.status(StatusCodes.OK).json({msg: 'Password was changed suecessfully'})
}

module.exports = 
{
    changePassword
}

// get an id from a token, find user with that id and change its password
// new password must be different from the old one
// run validators on new password aswell