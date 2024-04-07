const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const User = require('../models/users');
const Post = require('../models/posts');
const Like = require('../models/likes');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');

// title - req.body
// status - req.body
// createdBy - req.user
// photos - req.files

// create a post
const addPost = asyncWrapper( async (req,res) =>
{
    // validating data using mongoose

    const {title,visibility} = req.body;
    const createdBy = req.user.userId;
    // const photoUrl = req.files[0];


    const post = await Post.create({createdBy, visibility, title});
    
    
    res.status(StatusCodes.CREATED).json({msg: 'A post was created', post})  
});

// delete a post
const deletePost = asyncWrapper( async (req,res) =>
{
    const createdBy = req.user.userId;
    const _id = req.params.id;
    

    const post = await Post.findOneAndDelete({createdBy, _id});

    if(!post)
    {
        throw new NotFoundError('A post with such id does not exist');
    }

    res.status(StatusCodes.OK).json({msg: 'A post was deleted suecessfully'})  
});

// edit a post
const editPost = asyncWrapper( async (req,res) =>
{
    const {title,visibility} = req.body;   
    const createdBy = req.user.userId;
    const _id = req.params.id;
    
    const post = await Post.findOneAndUpdate({_id,createdBy},{title,visibility}, {new: true, runValidators: true});

    
    if(!post)
    {
        throw new NotFoundError('A post with such id does not exist');
    }
    

    res.status(StatusCodes.OK).json({msg: 'A post was edited suecessfully'},post)  
});


// like and remove like

const like = asyncWrapper( async (req,res) => // i will finish it later
{
    res.status(StatusCodes.CREATED).json({msg: 'Liked a post'})  
});



module.exports = 
{
    addPost,
    editPost,
    deletePost,
    like
}





