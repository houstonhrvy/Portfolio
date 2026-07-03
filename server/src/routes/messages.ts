import { Router, Request, Response } from 'express'
import Message from '../models/Message'
import { sendContactEmail } from '../lib/mailer'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body as { name?: string; email?: string; message?: string }
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() })

    try {
      await sendContactEmail(name.trim(), email.trim(), message.trim())
    } catch (mailErr) {
      console.error('Failed to send contact email:', mailErr)
    }

    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' })
  }
})

export default router
