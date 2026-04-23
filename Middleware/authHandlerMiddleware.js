import jwt from "jsonwebtoken";
import { CatchError } from "../utils/CatchError.js";
import { AppError } from "../utils/AppError.js";

export const authHandlerMiddleware = CatchError(async (req, res, next) => {
  const token = req.cookies?.accessToken

  if (!token) {
     throw new AppError(401,"Unauthorized")
  }
    let payload

   try{
     payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
   }
   catch(error){
       throw new AppError(401,"Invalid or Expired token")
   }

  req.user = payload

  next()
})
