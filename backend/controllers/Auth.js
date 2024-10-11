const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req,res) => {
    try{
        const {email, name, password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        //create user
        const hashedPassword = await bcrypt.hash(password,10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //generate token and pass to the client so it dont need to authenticate again also this can be user as authorization

        const token = jwt.sign({ id:user._id},process.env.JWT_SECRET,{
            expiresIn: '1h'
        })

        res.cookie('token',token,{
            httpOnly: true,
        }).status(201).json({
            message: "User created successfully",
            user: {id: user._id, name: user.name, email: user.email, token }
        });
    }catch(error){
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.login = async (req,res) => {
    try{
        const { email, password } = req.body;

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn: '1h'
        });

        user = user.toObject();
        user.token = token;
        user.password = undefined;

        res.cookie("token",token,{
            httpOnly: true
        }).status(200).json({
            message: "User logged in successfully",
            token,
            user
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error"
        })
    }
}