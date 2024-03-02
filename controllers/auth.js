const { UnauthenticatedError, BadRequestError} = require("../errors/everyError");
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');
const {sendEmail} = require('../utils/nodeMailer');





const signup = async (req,res) =>
{   
    const {email} = req.body;

    const user = await User.create({...req.body});
    
    const token = user.createJWT();
    await sendEmail(email,token);
    res.status(StatusCodes.CREATED).json({user:{username:user.username}, msg:'Signup Suecessful', sugnup:'Please verify your Email'});
  
};

// confirm email whenn signing up

const confirmEmail = async (req,res) => 
{
    const token = req.params;
    
    res.status(StatusCodes.ACCEPTED).json({ user: {msg: 'email confirmation was suecessful'},token});
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



    //checks if the password is correct
    const isPasswordCorrect = await userCredentials.comparePasswords(password);
    if(!isPasswordCorrect)
    {
        throw new UnauthenticatedError('Provided password is incorrect');
    }
    const token = userCredentials.createJWT();

    
    // returns username and jwt
    res.status(StatusCodes.OK).json({username: userCredentials.username,token});
}


module.exports = 
{
    login,
    signup,
    confirmEmail,
};