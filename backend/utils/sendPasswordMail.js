const nodemailer = require('nodemailer');


const sendPasswordMail = async(email,content,message) => {
    
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth : {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: content,
        text: message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendPasswordMail;