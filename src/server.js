import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import corsOptions from './config/corsOption.js'
import { logEvents, logger } from './middleware/logEvents.js'
import errorHandler from './middleware/errorHandler.js'
import verifyJWT from './middleware/verifyJWT.js'
import cookieParser from 'cookie-parser'
import { connectDB } from './libs/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// logger middleware
app.use(logger)

// Cross Origin Resource Sharing
// json middleware
app.use(cors(corsOptions))
app.use(express.json())

// cookies middleware
app.use(cookieParser())

import auth from './routes/auth.js'
import api from './routes/api.js'
import refresh from './routes/refresh.js'

// Routers
app.use('/auth', auth)
app.use('/refresh', refresh)

// JWT verification middleware
// app.use(verifyJWT)
app.use('/api', api)
// error handling
app.use(errorHandler)

// connect to database then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    logEvents(`server start on: http://localhost:${PORT}`)
  })
})
