const nodemailer = require('nodemailer');

const sendRemainder = async (email,taskTitle,taskDeadline) =>{
    
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "Task Reminder",
        text: `You have an upcoming task: "${taskTitle}" that is due on ${taskDeadline}.`,
    }

    await transporter.sendMail(mailOptions)
};

module.exports = sendRemainder;