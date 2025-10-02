import express from "express";
import {
  loginUser,
  registerUser,
  forgetPassword,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Forget/Reset Password routes 
userRouter.post("/forgot-password", forgetPassword);
userRouter.post("/reset-password/:token", resetPassword);



export default userRouter;
