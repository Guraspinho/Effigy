const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/everyError');
const User = require('../models/users');

const auth = async (req,res,next,) =>
{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer '))
    {   
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];

    try
    {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userID, username:payload.username};
        _id = req.user.userId;

        // check if the user is logged in or not 
        const {loggedIn} = await User.findOne({_id});
            
        if(!loggedIn)
        {
            throw new UnauthenticatedError('User is not logged in yet');
        }

        next();    
    }
    catch (error)
    {
        console.error(error);
        throw new UnauthenticatedError(`Authentication invalid`);       
    }
}

module.exports = auth;