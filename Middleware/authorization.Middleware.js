import {AppError} from '../utils/AppError.js'
import {CatchError} from '../utils/CatchError.js'
export const AuthorizationMiddleware=(...roles)=>{
         return CatchError(async(req,res,next)=>{
                 if(!req.user){
                     throw new AppError(401,"Login required")
                 }
                
                 if(!req.user.role){
                     throw new AppError(403,"Role is missing")
                 }

                if(!roles.includes(req.user.role)){
                    throw new AppError(403,"Not authorized to access this route")
                }
                next()
         })
}