const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');



// create a post
const addPost = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.CREATED).json({msg: 'A post was created'})  
});

// delete a post
const deletePost = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.OK).json({msg: 'A post was deleted suecessfully'})  
});

// edit a post
const editPost = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.OK).json({msg: 'A post was edited'})  
});



const addLike = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.CREATED).json({msg: 'Liked a post'})  
});


const removeLike = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.CREATED).json({msg: 'A like was removed'})  
});



module.exports = 
{
    addPost,
    editPost,
    deletePost,
    addLike,
    removeLike
}





