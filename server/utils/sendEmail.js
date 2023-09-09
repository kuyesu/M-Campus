const nodemailer = require('nodemailer');

const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS
    }
});

// test transporter
transporter.verify((error, success) => {
    try {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    } catch (error) {

    }
});


// send email
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        throw new Error('Email sending failed');
    }
};


module.exports = sendEmail;