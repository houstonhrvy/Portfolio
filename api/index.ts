import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import commentsRouter from '../server/src/routes/comments'
import messagesRouter from '../server/src/routes/messages'

dotenv.config()

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
]

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.use(async (_req, _res, next) => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!)
    } catch (err) {
      return next(err)
    }
  }
  next()
})

app.use('/api/comments', commentsRouter)
app.use('/api/messages', messagesRouter)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

export default app
