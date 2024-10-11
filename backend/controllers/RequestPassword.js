const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendReminder = require('../utils/sendReminder');
const sendPasswordMail = require('../utils/sendPasswordMail');
const { resetPassword } = require('../controllers/ResetPassword');

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne( {email} );
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        //Generate reset token
        const resetToken = crypto.randomUUID(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken,10);

        //Set the token expiry time(e.g 10min)
        user.resetPasswordToken  = hashedToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

        //save the user
        await user.save();

        //Construct reset URL
        // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        //Email message
        const message = `You requested a password reset. Please use this link to reset your password: \n\n ${resetUrl}`;

        //send email
        await sendPasswordMail(
            email,
            'Password Reset Request',
            message,
        )
        res.status(200).json({
            message: "Password set link send successfully"
        })
    }catch(error){
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
}