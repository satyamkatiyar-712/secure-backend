import mongoose from "mongoose"
export const mongoSetup= async(URI)=>{
      await mongoose.connect(URI)
      console.log(`the mongo set has done ready to use your database`)
}
