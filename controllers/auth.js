const { UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const {sendEmail} = require('../utils/nodeMailer');
const jwt = require('jsonwebtoken');



const signup = async (req,res) =>
{   
    const {email,password} = req.body;

    // checking len of an input password 
    if(password.length > 32)
    {
        throw new BadRequestError('Password must have less than 32 characters');
    }

    const user = await User.create({...req.body});
    
    const token = user.createJWT();
    await sendEmail(email,token);
    res.status(StatusCodes.CREATED).json({user:{username:user.username}, msg:'Signup Suecessful', sugnup:'Please verify your Email'});
  
};

// confirm email whenn signing up

const confirmEmail = async (req,res) => 
{
    const {id} = req.params;
    const token = id.substring(1);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {userId: payload.userID, username:payload.username};
    const _id = req.user.userId;

    const user = await User.findOneAndUpdate( {_id}, {confirmed:true} , {new:true, runValidators:true} );

    // check if user with such id exists or not.
    if(!user)
    {
        throw new NotFoundError(`No user found with ID: ${_id}`);
    }

    
    res.status(StatusCodes.ACCEPTED).json({ user: {msg: 'email confirmation was suecessful'}});

}



const login = async (req,res) =>
{

    // checking for errors in a controller
    
    // extracts email and password from req.body
    const {email,password} = req.body;
    

    // checks if email and password are provided
    if(!email || !password)
    {
        throw new BadRequestError('Please provide User credentials');
    }
    const userCredentials = await User.findOne({email});


    // checks wether user with provided credentials exist
    if(!userCredentials)
    {
        throw new UnauthenticatedError('User with provided email does not exist');
    }

    // checks wether user has their email confirmed or not
    if(!userCredentials.confirmed)
    {
        throw new UnauthenticatedError('You must verify your email in order to log in');
    }


    //checks if the password is correct
    const isPasswordCorrect = await userCredentials.comparePasswords(password);
    if(!isPasswordCorrect)
    {
        throw new UnauthenticatedError('Provided password is incorrect');
    }
    const token = userCredentials.createJWT();

    // set user status as logged in
    await User.findOneAndUpdate( {email}, {loggedIn:true} , {new:true, runValidators:true} );

    
    // returns username and jwt
    res.status(StatusCodes.OK).json({username: userCredentials.username,token});
}


// logout
const logout = async (req,res) =>
{
    const _id = req.user.userId;

    const {loggedIn} = await User.findOne({_id});

    // if the user is logged in than it can log out

    if(loggedIn)
    {
        await User.findOneAndUpdate( {_id}, {loggedIn:false} , {new:true, runValidators:true} );
    }


    res.status(StatusCodes.OK).json({user:{msg:'Logged out suecessfully'}});
}


module.exports = 
{
    login,
    signup,
    confirmEmail,
    logout
};

