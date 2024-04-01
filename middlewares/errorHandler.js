const { CustomAPIError } = require('../errors/everyError');
const { StatusCodes } = require('http-status-codes');
const multer = require('multer');

const errorHandlerMiddleware = (err, req, res, next) =>
{
    let customError = 
    {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wromg please try again later'
    };


    // if (err instanceof CustomAPIError)
    // {
    //     return res.status(err.statusCode).json({ msg: err.message });
    // }

    if(err.name == 'ValidationError')
    {
        customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    
    if(err.name == 'CastError')
    {
        customError.msg = `${err.value} is not a valid ID`
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    if(err.code && err.code == 11000)
    {
        customError.msg = `Dublicate value entered for email field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // multer errors
    if(err instanceof multer.MulterError)
    {
        if(err.code === "LIMIT_FILE_SIZE")
        {
            return res.json({user:{msg:"The file you are trying to upload is too big"}});
        }
        else if(err.code === "LIMIT_FILE_COUNT")
        {
            return res.json({user:{msg:"You are trying to upload too many files"}});
        }
        else if(err.code === "LIMIT_UNEXPECTED_FILE")
        {
            return res.json({user:{msg:"You can only upload images"}});
        }
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
     return res.status(customError.statusCode).json( {msg: customError.msg });
}

module.exports = errorHandlerMiddleware;