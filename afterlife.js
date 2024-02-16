const express = require('express');
const connectDB = require('./db/mongo');
require('dotenv').config();
require('express-async-errors');

const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const authRouter = require('./routes/auth');
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');


const app = express();
app.use(express.json());
app.use(express.static('public'));

// Security packages

app.set('trust proxy', 1);

app.use(
    rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(cors());
app.use(helmet());
app.use(xssClean());



// Middlewares


app.get('/', (req,res) =>
{

});

// routes
app.use('/users',authRouter);

// error middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

const prot = process.env.PORT || 5000;

const start = async () =>
{
    try
    {
        await connectDB(process.env.MONGO_URI);
        app.listen(prot, () => console.log(`server listening on port ${prot}...`));    
    } catch (error)
    {
        console.log(error);    
    }
}

start();