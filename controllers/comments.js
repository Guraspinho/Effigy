const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');



const addComment = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.CREATED).json({msg: 'A comment was added'})  
});


const editComment = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.OK).json({msg: 'A comment was edited'})  
});


const deleteComment = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.OK).json({msg: 'A comment was deleted suecessfully'})  
});


module.exports = 
{
    addComment,
    editComment,
    deleteComment,
}