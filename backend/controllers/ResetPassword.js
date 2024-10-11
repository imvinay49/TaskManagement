const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.resetPassword = async (req,res) =>{
    const { id } = req.params;
    const { newPassword } = req.body;
    try{
        const user = await User.findOne({
            // resetPasswordToken: id,
            resetPasswordExpires: {$gt: Date.now()}
        });

        if(!user){
            return res.status(404).json({message: "Invalid or expired token."});
        }

        const isMatch = await bcrypt.compare(id,user.resetPasswordToken);
        if(!isMatch){
            return res.status(404).json({message: "Invalid or expired token."});
        }
        const newPass = await bcrypt.hash(newPassword,10);
        user.password = newPass;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully",
        })
    }catch(error){
        res.status(500).json({
            message: "Error resetting password",
        })
    }
}