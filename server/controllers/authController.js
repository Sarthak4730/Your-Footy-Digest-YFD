import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const exists = await User.findOne( { email } );
        if(exists) return res.status(400).json( { message: "User already exists, please login." } );

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User( { username, email, password: hashedPassword } );
        newUser.save();

        res.status(201).json( { message: "Registration Success." } );
    } catch (err) {
        res.status(500).json( { message: "Registration Failed", error: err.message } );
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne( { email } );
        if(!user) return res.status(404).json( { message: "User not found, please register." } );

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json( { message: "Invalid Credentials - Email-Password Mismatch" } );

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login Success",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json( { message: "Login Failed", error: err.message } );
    }
};