import dotenv from "dotenv";
dotenv.config();   // ✅ env variables load

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; 
import validator from "validator"; 
import bcrypt from "bcrypt"; 
import crypto from "crypto";

import axios from "axios"

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"); 
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "✅ Loaded" : "❌ Missing");


const frontend_url = process.env.FRONTEND_URL || "http://localhost:3000";

// Forget Password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    // ✅ Check if email is registered
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "⚠️ Email not registered" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${frontend_url}/reset-password/${resetToken}`;

    // ✅ Send Email using Brevo API
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "TGH Support", email: process.env.EMAIL_USER },
        to: [{ email: user.email }],
        subject: "Password Reset",
        htmlContent: `
          <h3>Password Reset Request</h3>
          <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
          <p><b>Note:</b> This link is valid for 15 minutes only.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, message: "✅ Reset link sent to your email." });
  } catch (error) {
    console.error("Forget Password Error:", error.response?.data || error.message || error);
    res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
  }
};


// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;       // 🔹 URL se token lo
    const { password } = req.body;      // 🔹 Body me new password lo

    if (!token || !password) 
      return res.status(400).json({ success: false, message: "Token and password required" });

    // Token aur expiry check
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

    // Password update
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

// Login User
const loginUser = async (req,res) =>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user) return res.json({ success:false, message:"User does not exist" });
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.json({ success:false, message:"Invalid credentials" });

        const token = createToken(user._id);
        res.json({ success:true, token });
    } catch(error){
        console.error(error);
        res.json({ success:false, message:"Error" });
    }
}

const createToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);

// Register User
const registerUser = async (req,res) =>{
    const {name, password, email } = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists) return res.json({success:false, message:"User already exists" });

        if(!validator.isEmail(email)) return res.json({success:false, message:"Invalid email"});
        if(password.length < 8) return res.json({success:false, message:"Password must be at least 8 characters" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success:true, token });
    } catch(error){
        console.error(error);
        res.json({ success:false, message:"Error" });
    }
}

export { loginUser, registerUser, forgetPassword, resetPassword };
