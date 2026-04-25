import  dotenv  from 'dotenv'
dotenv.config()
import {createClient} from 'redis'
export const redisClient=  createClient({
     url:process.env.REDIS_URL
})

redisClient.on('connect',()=>console.log("redis tcp connection initiated"))
redisClient.on('ready',()=>console.log("redis is ready to handle commands"))
redisClient.on('error',(err)=>console.log("redis error",err))
redisClient.on('end',(err)=>console.log("redis connection closed"))