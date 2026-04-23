import { Router } from "express"
import {CreateNote,UpdateNote,DeleteNote} from '../controller/notes.controller.js'
import {authHandlerMiddleware} from '../Middleware/authHandlerMiddleware.js'

const router=Router()

router.post("/create",authHandlerMiddleware,CreateNote)
router.put("/update/:id",authHandlerMiddleware,UpdateNote)
router.delete("/delete/:id",authHandlerMiddleware,DeleteNote)


export default router