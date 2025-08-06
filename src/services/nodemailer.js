const nodemailer = require("nodemailer")
require("dotenv").config()

async function sendVerificationUrlToEmail(email, url) {
    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SERVER_EMAIL,
                pass: process.env.EMAIL_APP_PASS
            }
        });
    
        const mailOptions = {
            from: process.env.SERVER_EMAIL,
            to: email,
            subject: 'Email verification',
            text: `Your email verification url: \n ${url}`
        };
    
        await transporter.sendMail(mailOptions);
}

module.exports = sendVerificationUrlToEmail