import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  name: string
  email: string
  message: string
  createdAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
)

export default mongoose.model<IMessage>('Message', MessageSchema)
