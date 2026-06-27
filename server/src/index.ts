import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import commentsRouter from './routes/comments'
import messagesRouter from './routes/messages'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/houston-portfolio'

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
  ],
}))
app.use(express.json())

app.use('/api/comments', commentsRouter)
app.use('/api/messages', messagesRouter)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
