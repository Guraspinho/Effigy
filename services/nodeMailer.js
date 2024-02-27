const nodemailer = require('nodemailer');

//email verification

const createRandomNumber = () =>
{
    return Math.floor(Math.random() * 9000) + 1000;
}


async function sendEmail(email, code)
{
    
    const emailContent = `
    <h1>Hello dear user</h1>
    <p>Your verification code is: </p>
    // ${code};
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
        from: ' irakli <effypowered@gmail.com>',
        to: email,
        subject: 'test email',
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
    sendEmail,
    createRandomNumber
}