const nodemailer = require('nodemailer');

//email verification

async function sendEmail(email, text)
{
    const emailContent = `
    <h3>Welcome! You've signed up at Effigy.</h3>
    <h1></h1>
    <a href="http://localhost:5000/users/confirm/:${encodeURIComponent(text)}"><button>Confirm your email </button></a>
    <h1></h1>
    <p>Please validate your email address by clicking the above button. The link remains valid for 1 hour.</p>
    `

    const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: 
        {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });

    const emailOptions = 
    {
        from: ' Effigy <effypowered@gmail.com>',
        to: email,
        subject: 'Email Verification',
        html: emailContent
    }

    try
    {
        const info = await transporter.sendMail(emailOptions);
        console.log('email sent', info.messageId);
    } 
    catch (error)
    {
        console.log(`error sending email ${error}`)    
    }
}



module.exports = 
{
    sendEmail
}