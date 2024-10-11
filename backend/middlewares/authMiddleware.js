const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.auth = async (req,res,next) => {
    try{
        // Try to get the token from the Authorization header
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader && authHeader.split(' ')[1]; // Get the token from Bearer
        // Try to get the token from the request body
        const tokenFromBody = req.body.token;

        // Use the token from the header if available, otherwise use the token from the body
        const token = tokenFromHeader || tokenFromBody;

        if(!token){
            return res.status(401).json({ message: 'Authorization denied: No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // req.user = await User.findById(decoded.id).select('-password');
        req.user = decoded;
        console.log(decoded);

        next();
    }catch(error){
        res.status(401).json({ message: 'Token is not valid' });
    }
}