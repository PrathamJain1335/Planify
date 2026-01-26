// import { use } from "react";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
    try{
        const{ name,email,password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({message: "all fields are required"});
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({message: "user already exists"});
        }
        

        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            message: "user registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch (error){
        console.error("register error:", error);
        res.status(500).json({message: "server error"});
    }
};

export const loginUser = async (req, res) =>{
    try{
        const{email,password} = req.body;

        if (!email || !password){
            return res.status(400).json({message: "email and password required"});

        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"},
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch(error){
        console.error("login error:", error);
        res.status(500).json({message: error.message});
    }
};