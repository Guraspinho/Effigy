const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(
    {
        username:
        {
            type: String,
            required: [true, 'Please provide username'],
            minlength: 2,
            maxlength:20
        },
        email:
        {
            type: String,
            required: [true,'Please provide email'],
            unique: [true,'Email already in use'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email'
              ]
        },
        password:
        {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 8
        },
        confirmed:
        {
            type: Boolean,
            default: false
        },
        loggedIn:
        {
            type: Boolean,
            default: false
        },
        lastUsernameChange:
        {
            type: Date,
            default: Date.now
        }

    },
    {timestamps:true});


// generate JWT

userSchema.methods.createJWT = function()
{
    return jwt.sign({userID: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}


// encrypt the password

userSchema.pre('save', async function()
{
    try
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword

    }
    catch (error)
    {
        console.error(error);
    }

})


// compare provided password to the one that is in the db.

userSchema.methods.comparePasswords = async function(candidatePassword)
{
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch
}



module.exports = mongoose.model('User',userSchema);