const { createToken } = require("../utils/tokenCreate") 
const { json } = require("express");
const User = require("../models/userModel");

module.exports.Login = async (req,res,next) =>{
    try{
        const { email,password }=req.body;
        if(!email || !password){
            return res.json({ message: "All fields are required"})
        }

        const user= await User.findOne({email});

        if(!user){
            return res.json({messgae: "Invalid email or password"})
        }
        
        const auth = await bcrypt.compare(password, user.password)
        if(!auth){
            return res.json({messgae: "Invalid email or password"})
        }

        const token = createToken(user._id);
        res.cookie("token", token, {
            path: '/',
            withCridenitials: true,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
        });
        res 
            .status(201)
            .json({ message : "User signed up successfully",success:true, user}); 
        next();
    
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"internal server error"});
    }
}
