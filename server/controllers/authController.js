// import { use } from "react";
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