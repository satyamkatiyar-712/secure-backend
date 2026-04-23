import mongoose from "mongoose"

const NotesSchema= mongoose.Schema({
      title:{
         type:String,
         required:true,
         trim:true
      },
      content:{
         type:String,
         required:true
      },
      owner:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:'USER'
      },
      Tags:{
        type:[String],
        enum:["Work","Imporant","Idea","Creative"],
        default:[]
      },
      isPinned:{
        type:Boolean,
        default:false
      }
},{timestamps:true})

export const NOTE=mongoose.model("usernotes",NotesSchema)