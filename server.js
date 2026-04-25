import dotenv from 'dotenv'
dotenv.config()
import { app } from "./index.js"
import {redisClient} from './Redis/redisClient.js'
import { mongoSetup } from './database/mongoSetup.js'

const PORT=process.env.PORT || 5000

const startServer= async ()=>{
        try{
             await redisClient.connect();
             await mongoSetup(process.env.MONGO_URI)

             app.listen(PORT,()=>{
             console.log(`the server is listening at ${PORT}`)
         })
        }
        catch(error){
            console.error("Failed in starting server",error)
            process.exit(1)
        } 
}

startServer()

