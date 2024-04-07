const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const Post = require('../models/posts');
const Like = require('../models/likes');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');


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
    
    // update a post based on provided properties
    const post = await Post.findOneAndUpdate({_id,createdBy},{title,visibility}, {new: true, runValidators: true});

    // check if a post with such id exists or not   
    if(!post)
    {
        throw new NotFoundError('A post with such id does not exist');
    }
    

    res.status(StatusCodes.OK).json({msg: 'A post was edited suecessfully',post})  
});


// like and remove like

const like = asyncWrapper( async (req,res) => 
{
    
    const postId = req.params.id;
    const likedBy = req.user.userId;

    // Find the post and check if it exists
    const post = await Post.findById(postId);
    if (!post)
    {
        throw new NotFoundError('A post with such id does not exist');
    }

    // Check if the user has already liked the post
    const alreadyLiked = await Like.findOne({ postId, likedBy });

    // Determine the increment value for likes
    let increment = 0;
    let message = '';
    if (alreadyLiked)
    {
        // If the user has already liked the post, decrement likes and remove the like
        increment = -1;
        message = 'Removed a like';
        await Like.findOneAndDelete({ postId, likedBy });
    } else {
        // If the user hasn't liked the post yet, increment likes and add the like
        increment = 1;
        message = 'Liked a post';
        await Like.create({ postId, likedBy });
    }

    // Update the likes count in the Post document
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: increment } },
        { new: true, runValidators: true }
    );

    res.status(StatusCodes.CREATED).json({ msg: message });
});





module.exports = 
{
    addPost,
    editPost,
    deletePost,
    like
}





