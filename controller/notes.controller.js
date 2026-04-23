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

export const UpdateNote=CatchError(async(req,res)=>{

         const noteId= req.params.id
             const {title,content}=req.body
            if(!title || !content){
                throw new AppError(400,"Provide the detail to update the note")
            }

            const note = await NOTE.findById(noteId)
            if(!note){
                throw new AppError(404,"No note found")
            }

            //security check
            if(note.owner.toString()!==req.user.userId){
                throw new AppError(403,"Unauthorized not access to note")
            }

            const updatedNote= await NOTE.findByIdAndUpdate(
                noteId,
                {title,content},
                { new: true, runValidators: true }
            )
           res.status(200).json({
               success:true,
               message:"Note updated successfully",
               note:updatedNote
           })
})
