const BASE = '/api'

export interface CommentData {
  _id: string
  name: string
  text: string
  likes: number
  pinned?: boolean
  avatar: string
  createdAt: string
}

export async function fetchComments(): Promise<CommentData[]> {
  const res = await fetch(`${BASE}/comments`)
  if (!res.ok) throw new Error('Failed to fetch comments')
  return res.json()
}

export async function postComment(name: string, text: string): Promise<CommentData> {
  const res = await fetch(`${BASE}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text }),
  })
  if (!res.ok) throw new Error('Failed to post comment')
  return res.json()
}

export async function likeComment(id: string): Promise<CommentData> {
  const res = await fetch(`${BASE}/comments/${id}/like`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Failed to like comment')
  return res.json()
}

export async function sendMessage(
  name: string,
  email: string,
  message: string
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json()
}
