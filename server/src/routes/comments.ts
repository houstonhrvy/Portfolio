import { Router, Request, Response } from 'express'
import Comment from '../models/Comment'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.find().sort({ pinned: -1, createdAt: -1 }).lean()
    const mapped = comments.map((c) => ({
      _id: String(c._id),
      name: c.name,
      text: c.text,
      likes: c.likes,
      pinned: c.pinned,
      avatar: c.avatar || c.name[0]?.toUpperCase() || '?',
      createdAt: c.createdAt,
    }))
    res.json(mapped)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, text } = req.body as { name?: string; text?: string }
    if (!name?.trim() || !text?.trim()) {
      return res.status(400).json({ error: 'Name and text are required' })
    }
    const comment = await Comment.create({
      name: name.trim(),
      text: text.trim(),
      avatar: name.trim()[0]?.toUpperCase() || '?',
    })
    res.status(201).json({
      _id: String(comment._id),
      name: comment.name,
      text: comment.text,
      likes: comment.likes,
      pinned: comment.pinned,
      avatar: comment.avatar,
      createdAt: comment.createdAt,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' })
  }
})

router.patch('/:id/like', async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    )
    if (!comment) return res.status(404).json({ error: 'Comment not found' })
    res.json({ likes: comment.likes })
  } catch (err) {
    res.status(500).json({ error: 'Failed to like comment' })
  }
})

export default router
