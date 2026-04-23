import { Router } from "express";
import {SignupUser,Loginuser,LogoutUser,RenewAccesstoken,Mainpage} from '../controller/authentication.js'
import {authHandlerMiddleware} from '../Middleware/authHandlerMiddleware.js'
import {AuthorizationMiddleware} from '../Middleware/authorization.Middleware.js'
import {Loginlimit,globalRatelimit} from '../Middleware/LoginReqLimiter.js'

const router= Router()

router.post("/notes/signup",SignupUser)
router.post("/notes/login",Loginlimit,Loginuser)
router.post("/notes/logout",authHandlerMiddleware,LogoutUser)
router.post("/notes/refresh-token",RenewAccesstoken)
router.get("/notes/main",authHandlerMiddleware,AuthorizationMiddleware('admin','teacher'),globalRatelimit,Mainpage)

export default router