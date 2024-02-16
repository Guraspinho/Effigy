const { UnauthenticatedError, BadRequestError} = require("../errors/everyError")
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes');




const signup = async (req,res) =>
{
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{username:user.username}, msg:'Signup Suecessful',token})
}

const login = async (req,res) =>
{

    // checking for errors in a controller

    // extracts email and password from req.body
    const {email,password} = req.body

    // checks if email and password are provided
    if(!email || !password)
    {
        throw new BadRequestError('Please provide User credentials')
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
    res.status(StatusCodes.OK).json({username: userCredentials.username,token})
}


// Get login and signup pages

const loginPage = async (req,res) =>
{
    res.send('login Page')
}

const signupPage = async (req,res) =>
{
    res.send('signup page')
}




module.exports = 
{
    loginPage,
    signupPage,
    login,
    signup
};