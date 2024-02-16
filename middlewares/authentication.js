const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const {unauthenticatedError} = require('../errors/errors');

const auth = async (req,res,next,) =>
{
    const authHeader = req.headers.authorization;

    if(!authHeader || authHeader.startsWith('Bearer'))
    {
        throw new unauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];

    try
    {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId, username:payload.username};
        next();    
    }
    catch (error)
    {
        throw new unauthenticatedError('Authentication invalid');       
    }
}