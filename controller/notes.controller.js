import { NOTE } from "../models/NotesSchema.js"
import { CatchError } from "../utils/CatchError.js"
import { AppError } from "../utils/AppError.js"

export const CreateNote=CatchError(async(req,res)=>{
        const {title,content}=req.body
        if(!title || !content){
            throw new AppError(400,"Provide both title and content to create a note")
        }
       
        const userId=req.user.userId
        const newNote=new NOTE({
             title,
             content,
             owner:userId
        })
        await newNote.save()

       res.status(201).json({
         success:true,
          message:"Note created successfully",
          note:newNote
       })

})

