const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');


exports.protect =  expressAsyncHandler(async(req,res,next) => { 
    console.log('checking')

    if(req.headers.authorization){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select('-password');
            // console.log(decoded)
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized Token failed')
        }

    }
    
    else{
        res.status(401)
        throw new Error('Not authorized')
    }

})


exports.isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin) next()
    else{
        res.status(401)
        throw new Error('Not authorized as Admin')
    }
}