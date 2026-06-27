import mongoose, { Document, Schema } from 'mongoose'

export interface IComment extends Document {
  name: string
  text: string
  likes: number
  pinned: boolean
  avatar: string
  createdAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    text: { type: String, required: true, trim: true, maxlength: 500 },
    likes: { type: Number, default: 0, min: 0 },
    pinned: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model<IComment>('Comment', CommentSchema)
