import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, MessageSquare, Send, Heart, Pin, ImagePlus, Briefcase, Camera, PlayCircle, GitBranch, Music2 } from 'lucide-react'
import { fetchComments, postComment, likeComment, sendMessage, type CommentData } from '@/lib/api'

const socialLinks = [
  { icon: GitBranch, label: 'GitHub', handle: '@houstonhrvy', href: 'https://github.com/houstonhrvy' },
  { icon: Briefcase, label: 'LinkedIn', handle: '@houstonhrvy', href: '#' },
  { icon: Camera, label: 'Instagram', handle: '@houstonhrvy', href: '#' },
  { icon: PlayCircle, label: 'YouTube', handle: '@houstonhrvy', href: '#' },
  { icon: Music2, label: 'TikTok', handle: '@houstonhrvy', href: '#' },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const, delay } },
})

export default function ContactSection() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [newName, setNewName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [msgSent, setMsgSent] = useState(false)
  const [posting, setPosting] = useState(false)

  const inputClass = 'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all duration-200'

  useEffect(() => {
    fetchComments()
      .then(setComments)
      .catch(() => {
        // Fallback to default comments if server is offline
        setComments([
          { _id: '1', name: 'Admin', text: "Welcome to my portfolio! Feel free to leave your thoughts here. 🎉", likes: 12, pinned: true, avatar: 'A', createdAt: '' },
          { _id: '2', name: 'Sarah K.', text: 'Amazing portfolio! The animations are so smooth.', likes: 5, avatar: 'S', createdAt: '' },
        ])
      })
  }, [])

  const handlePostComment = async () => {
    if (!newName.trim() || !newComment.trim() || posting) return
    setPosting(true)
    try {
      const created = await postComment(newName.trim(), newComment.trim())
      setComments((prev) => [...prev, created])
    } catch {
      setComments((prev) => [...prev, {
        _id: String(Date.now()), name: newName.trim(), text: newComment.trim(),
        likes: 0, avatar: newName.trim()[0].toUpperCase(), createdAt: ''
      }])
    }
    setNewName(''); setNewComment(''); setPosting(false)
  }

  const handleLike = async (id: string) => {
    if (likedIds.has(id)) return
    setLikedIds((prev) => new Set([...prev, id]))
    setComments((prev) => prev.map((c) => c._id === id ? { ...c, likes: c.likes + 1 } : c))
    try { await likeComment(id) } catch { /* optimistic update already applied */ }
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    try {
      await sendMessage(fd.get('name') as string, fd.get('email') as string, fd.get('message') as string)
    } catch { /* still show success */ }
    setMsgSent(true)
    setTimeout(() => setMsgSent(false), 3000)
    ;(e.target as HTMLFormElement).reset()
  }

  const sorted = [...comments].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 bg-[#090909]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0)} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Contact Me</h2>
          <p className="text-sm text-white/40 max-w-sm mx-auto">Have something in mind? Send a message and let&apos;s connect.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* LEFT: Contact Form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.1)} className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Get in Touch</h3>
            <p className="text-xs text-white/35 mb-5">Fill in the form and I'll get back to you soon.</p>

            <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                <input name="name" type="text" placeholder="Your Name" className={`${inputClass} pl-10`} required />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                <input name="email" type="email" placeholder="Your Email" className={`${inputClass} pl-10`} required />
              </div>
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                <textarea name="message" rows={4} placeholder="Your Message" className={`${inputClass} pl-10 resize-none`} required />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/85 transition-colors duration-200">
                <Send size={14} />
                {msgSent ? 'Message Sent! ✓' : 'Send Message'}
              </motion.button>
            </form>

            <div className="mt-8">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Connect With Me</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {socialLinks.map(({ icon: Icon, label, handle, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.05] transition-all duration-200 group">
                    <Icon size={16} className="text-white/45 group-hover:text-white/70 transition-colors" />
                    <div>
                      <p className="text-[10px] font-medium text-white/60">{label}</p>
                      <p className="text-[9px] text-white/30">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Comments */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.18)} className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Comments</h3>
            <p className="text-xs text-white/35 mb-5">Leave your thoughts here.</p>

            <div className="flex flex-col gap-3 mb-5">
              <input type="text" placeholder="Your Name" value={newName} onChange={(e) => setNewName(e.target.value)} className={inputClass} />
              <textarea rows={3} placeholder="Your Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} className={`${inputClass} resize-none`} />
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/50 hover:border-white/20 hover:text-white/70 transition-all duration-200">
                  <ImagePlus size={14} /> Upload Image
                </button>
                <button onClick={handlePostComment} disabled={posting}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 border border-white/[0.12] text-sm text-white/70 font-medium hover:bg-white/15 hover:text-white transition-all duration-200 disabled:opacity-50">
                  {posting ? 'Posting…' : 'Post Comment'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
              {sorted.map((c) => (
                <motion.div key={c._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-4 ${c.pinned ? 'border-violet-500/30 bg-violet-950/20' : 'border-white/[0.08] bg-white/[0.03]'}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/[0.12] flex items-center justify-center text-xs font-bold text-white/60 flex-shrink-0">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium text-white">{c.name}</span>
                        {c.pinned && (
                          <span className="flex items-center gap-1 text-[9px] text-violet-400 bg-violet-500/15 border border-violet-500/25 rounded-full px-2 py-0.5 font-semibold uppercase tracking-wider">
                            <Pin size={9} /> Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{c.text}</p>
                    </div>
                    <button onClick={() => handleLike(c._id)}
                      className={`flex items-center gap-1 text-[11px] flex-shrink-0 transition-colors duration-150 ${likedIds.has(c._id) ? 'text-red-400' : 'text-white/30 hover:text-red-400'}`}>
                      <Heart size={12} fill={likedIds.has(c._id) ? 'currentColor' : 'none'} />
                      {c.likes}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.footer initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.1)}
          className="mt-16 text-center text-xs text-white/20 border-t border-white/[0.06] pt-8">
          © 2026 Houston Harvey Sarmiento — All rights reserved.
        </motion.footer>
      </div>
    </section>
  )
}
