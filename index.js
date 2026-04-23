import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import {globalRatelimit} from './Middleware/LoginReqLimiter.js'
import {globalErrorHandler } from './Middleware/errorHandler.js'
import authenticationRoutes from './routes/authentication.routes.js'

export const app=express()
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api",authenticationRoutes)

app.use(globalErrorHandler)
