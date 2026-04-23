import rateLimit from "express-rate-limit"
import { AppError } from "../utils/AppError.js"

export const Loginlimit= rateLimit({
     windowMs:15 * 60 * 1000,
     max:5,
     handler:(req,res,next)=>{
            next(new AppError(429,"Too many login request try after 15 minutes"))
     }
})

export const globalRatelimit= rateLimit({
     windowMs:15*60*1000,
     max:100,
     handler:(req,res,next)=>{
          next(new AppError(429,"Too many request try after 15 minutes"))
     }
})
