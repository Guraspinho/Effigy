const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');
const Comment = require('../models/comments');

const Post = require('../models/posts');

// add a comment
const addComment = asyncWrapper( async (req,res) =>
{
    // validating data using mongoose;
    const postId = req.params.id;
    const {body} = req.body;
    const createdBy = req.user.userId;


    // mongoose ref: 'Post' does not work so i am forced to check existence of posts this way

    const post = await Post.findOne({_id:postId});

    if(!post)
    {
        throw new BadRequestError('A post with such id does not exist');
    }

    const comment = await Comment.create({body,postId,createdBy});   

    if(!comment)
    {
        throw new BadRequestError('Can not create a new comment');
    }
    

    res.status(StatusCodes.CREATED).json({msg: 'A comment was added', comment});  
});


const editComment = asyncWrapper( async (req,res) =>
{
    const postId = req.params.id;
    const {body} = req.body;
    const createdBy = req.user.userId;

    const comment = Comment.findOneAndUpdate({postId,createdBy},{body},{new:true, runValidators: true});
    

    if(!comment)
    {
        throw new BadRequestError('NO');
    }
    res.status(StatusCodes.OK).json({msg: 'A comment was edited'});  
});


const deleteComment = asyncWrapper( async (req,res) =>
{
    res.status(StatusCodes.OK).json({msg: 'A comment was deleted suecessfully'});  
});


module.exports = 
{
    addComment,
    editComment,
    deleteComment
}