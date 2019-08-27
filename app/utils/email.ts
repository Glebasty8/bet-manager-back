const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
});

const sendEmail = (mailOptions) => {
    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
};

export default sendEmail;
