import { Router } from "express"
import {CreateNote} from '../controller/notes.controller.js'
import {authHandlerMiddleware} from '../Middleware/authHandlerMiddleware.js'

const router=Router()

router.post("/create",authHandlerMiddleware,CreateNote)


export default router