import { Router } from "express";
import {SignupUser,Loginuser,LogoutUser,RenewAccesstoken,Mainpage} from '../controller/authentication.js'
import {authHandlerMiddleware} from '../Middleware/authHandlerMiddleware.js'
import {AuthorizationMiddleware} from '../Middleware/authorization.Middleware.js'
import {Loginlimit,globalRatelimit} from '../Middleware/LoginReqLimiter.js'

const router= Router()

router.post("/signup",SignupUser)
router.post("/login",Loginlimit,Loginuser)
router.post("/logout",authHandlerMiddleware,LogoutUser)
router.post("/refresh-token",RenewAccesstoken)
router.get("/main",authHandlerMiddleware,AuthorizationMiddleware('admin','teacher'),globalRatelimit,Mainpage)

export default router