import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';


export const signup = async(req,res)=>{
    try{
        const {username,fullname,email,password}= req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Inavlid email fromat"});
        }

        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({error:"Username is already taken"});
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({error:"Email is already taken"});
        }
         
        if(password.length < 6 ){
            return res.status(400).json({error: "Password must be at least 6 charecters long"})
        }

        //hash password
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
           
            username,
            fullname,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                
                username: newUser.username,
                fullname: newUser.fullname,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            });
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const login = async(req,res)=>{
    res.json({
        data:"You hit the login endpoint",
    });
}

export const logout = async(req,res)=>{
    res.json({
        data:"You hit the logout endpoint",
    });
}