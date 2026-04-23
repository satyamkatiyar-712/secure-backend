import { AppError } from "../utils/AppError.js";
import { CatchError } from "../utils/CatchError.js";
import { USER } from "../models/userSchema.js";
import { accessToken, refreshToken } from "../utils/jwtTokens.js";
import jwt from "jsonwebtoken";

export const SignupUser = CatchError(async (req, res) => {
     const { name, email, password } = req.body;

     if (!email || !password || !name) {
          throw new AppError(400, "Please provide full details for Signing up");
     }

     const user = await USER.findOne({ email });
     if (user) {
          throw new AppError(409, "User is already registered");
     }

     const newUser = new USER({
          name,
          email,
          password,
     });
     await newUser.save();

     res.status(201).json({
          success: true,
          message: "User created successfully",
          newUser,
     });
});

export const Loginuser = CatchError(async (req, res) => {
     const { email, password } = req.body;

     if (!email || !password) {
          throw new AppError(400, "Please provide all details");
     }
     const existingUser = await USER.findOne({ email });
     if (!existingUser) {
          throw new AppError(401, "User does not exist");
     }

     const isMatch = await existingUser.isPasswordCorrect(password);
     if (!isMatch) {
          throw new AppError(401, "Invalid password");
     }

     const AccessToken = accessToken(existingUser);
     const RefreshToken = refreshToken(existingUser);

     existingUser.RefreshToken = RefreshToken;
     await existingUser.save();

     res
          .cookie("accessToken", AccessToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
          })
          .cookie("refreshToken", RefreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({
               success: true,
               message: "Login successful",
          });
});

export const LogoutUser = CatchError(async (req, res) => {
     const user = await USER.findById(req.user.userId);

     if (!user) {
          throw new AppError(404, "User not found");
     }

     user.RefreshToken = null;
     await user.save();

     const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
     };

     res.clearCookie("accessToken", cookieOptions);
     res.clearCookie("refreshToken", cookieOptions);

     res.status(200).json({
          success: true,
          message: "Logout successful",
     });
});

export const RenewAccesstoken = CatchError(async (req, res) => {
     const refreshToken = req.cookies?.refreshToken;

     if (!refreshToken) {
          throw new AppError(401, "Unauthorized");
     }

     let decoded;

     try {
          decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
     } catch (error) {
          throw new AppError(401, "Invalid or expired Token");
     }

     const user = await USER.findById(decoded.userId);
     if (!user) {
          throw new AppError(410, "User account no longer existed");
     }

     if (refreshToken !== user.RefreshToken) {
          throw new AppError(401, "The Token is compromised login again!");
     }

     const AccessToken = accessToken(existingUser);
     const RefreshToken = refreshToken(existingUser);

     res
          .cookie("accessToken", newAccesstoken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
          })
          .cookie("refreshToken", RefreshToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({
               success: true,
               message: "Token renewed successfully",
          });
});


export const Mainpage=CatchError(async(req,res,next)=>{
             res.send(`<h1>this is main page only normal user's are allowed</h1>`)
})