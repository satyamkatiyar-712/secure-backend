import { Router } from "express"
import {CreateNote,UpdateNote} from '../controller/notes.controller.js'
import {authHandlerMiddleware} from '../Middleware/authHandlerMiddleware.js'

const router=Router()

router.post("/create",authHandlerMiddleware,CreateNote)
router.put("/update/:id",authHandlerMiddleware,UpdateNote)


export default router