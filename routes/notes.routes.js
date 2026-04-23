import { Router } from "express"
import {CreateNote,UpdateNote,DeleteNote,GetallNotes} from '../controller/notes.controller.js'
import {authHandlerMiddleware} from '../Middleware/authHandlerMiddleware.js'
import {AuthorizationMiddleware} from '../Middleware/authorization.Middleware.js'
import {globalRatelimit} from '../Middleware/LoginReqLimiter.js'

const router=Router()

router.use(globalRatelimit)

router.post("/create",authHandlerMiddleware,CreateNote)
router.put("/update/:id",authHandlerMiddleware,AuthorizationMiddleware('admin','user'),UpdateNote)
router.delete("/delete/:id",authHandlerMiddleware,AuthorizationMiddleware('admin','user'),DeleteNote)
router.get("/getall",authHandlerMiddleware,AuthorizationMiddleware('admin','user'),GetallNotes)


export default router