import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import {globalErrorHandler } from './Middleware/errorHandler.js'
import authenticationRoutes from './routes/authentication.routes.js'
import notesRoutes from './routes/notes.routes.js'

export const app=express()
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/auth",authenticationRoutes)
app.use("/api/notes",notesRoutes)

app.use(globalErrorHandler)
