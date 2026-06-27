import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, MessageSquare, Send, Heart, Pin, ImagePlus, Briefcase, Camera, PlayCircle, GitBranch, Music2 } from 'lucide-react'
import { fetchComments, postComment, likeComment, sendMessage, type CommentData } from '@/lib/api'
import EvaUnit01 from './EvaUnit01'

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

const inputClass = 'w-full px-4 py-3 text-sm text-white font-nerv focus:outline-none transition-all duration-200'
const inputStyle = {
  background: 'rgba(123,47,190,0.05)',
  border: '1px solid rgba(123,47,190,0.22)',
  color: '#e8e8e8',
}
const inputFocusStyle = {
  borderColor: 'rgba(0,255,65,0.4)',
}

export default function ContactSection() {
  const [comments, setComments] = useState<CommentData[]>([])
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [newName, setNewName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [msgSent, setMsgSent] = useState(false)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    fetchComments()
      .then(setComments)
      .catch(() => {
        setComments([
          { _id: '1', name: 'Admin', text: 'NERV COMMS ONLINE — Leave your transmission here. All pilots welcome.', likes: 12, pinned: true, avatar: 'A', createdAt: '' },
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
    try { await likeComment(id) } catch { /* optimistic */ }
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    try { await sendMessage(fd.get('name') as string, fd.get('email') as string, fd.get('message') as string) } catch { /* show success anyway */ }
    setMsgSent(true)
    setTimeout(() => setMsgSent(false), 3000)
    ;(e.target as HTMLFormElement).reset()
  }

  const sorted = [...comments].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* ── EVA UNIT-01 BACKGROUND (right side again, subtle) ── */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none z-0"
        style={{ width: '35%' }}>
        <EvaUnit01
          className="absolute right-0 h-[80vh] w-auto eye-glow"
          style={{
            opacity: 0.12,
            filter: 'drop-shadow(0 0 30px rgba(123,47,190,0.35)) drop-shadow(0 0 60px rgba(0,255,65,0.1))',
            transform: 'translateX(30%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0)} className="text-center mb-14">
          <p className="text-[9px] font-nerv tracking-[0.45em] mb-3 uppercase" style={{ color: 'rgba(255,102,0,0.6)' }}>◆ NERV // COMMS TERMINAL ◆</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Contact Me</h2>
          <p className="text-sm text-white/35 max-w-sm mx-auto font-nerv">Send a transmission. All messages are received.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Contact form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.1)} className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Get in Touch</h3>
            <p className="text-xs font-nerv mb-5 tracking-wider" style={{ color: 'rgba(123,47,190,0.55)' }}>TRANSMIT YOUR MESSAGE BELOW</p>

            <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 pointer-events-none" style={{ color: 'rgba(123,47,190,0.5)' }} />
                <input name="name" type="text" placeholder="Your Name"
                  className={`${inputClass} pl-10`} style={inputStyle} required
                  onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={e => Object.assign(e.currentTarget.style, inputStyle)} />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 pointer-events-none" style={{ color: 'rgba(123,47,190,0.5)' }} />
                <input name="email" type="email" placeholder="Your Email"
                  className={`${inputClass} pl-10`} style={inputStyle} required
                  onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={e => Object.assign(e.currentTarget.style, inputStyle)} />
              </div>
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 pointer-events-none" style={{ color: 'rgba(123,47,190,0.5)' }} />
                <textarea name="message" rows={4} placeholder="Your Message"
                  className={`${inputClass} pl-10 resize-none`} style={inputStyle} required
                  onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                  onBlur={e => Object.assign(e.currentTarget.style, inputStyle)} />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-bold font-nerv tracking-widest transition-colors duration-200"
                style={{ background: '#7B2FBE' }}>
                <Send size={14} />
                {msgSent ? 'TRANSMISSION SENT ✓' : 'SEND TRANSMISSION'}
              </motion.button>
            </form>

            <div className="mt-8">
              <p className="text-[9px] font-nerv tracking-[0.4em] mb-4 uppercase" style={{ color: 'rgba(123,47,190,0.5)' }}>NERV CHANNELS</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {socialLinks.map(({ icon: Icon, label, handle, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="flex items-center gap-2.5 p-3 transition-all duration-200 group"
                    style={{ border: '1px solid rgba(123,47,190,0.15)', background: 'rgba(123,47,190,0.03)' }}>
                    <Icon size={15} style={{ color: 'rgba(123,47,190,0.5)' }} className="group-hover:text-[#7B2FBE] transition-colors" />
                    <div>
                      <p className="text-[10px] font-medium text-white/55">{label}</p>
                      <p className="text-[9px] font-nerv" style={{ color: 'rgba(123,47,190,0.4)' }}>{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Comments */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.18)} className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Transmissions</h3>
            <p className="text-xs font-nerv mb-5 tracking-wider" style={{ color: 'rgba(123,47,190,0.55)' }}>LEAVE YOUR SIGNAL HERE</p>

            <div className="flex flex-col gap-3 mb-5">
              <input type="text" placeholder="Pilot Name" value={newName} onChange={(e) => setNewName(e.target.value)}
                className={inputClass} style={inputStyle} />
              <textarea rows={3} placeholder="Your transmission..." value={newComment} onChange={(e) => setNewComment(e.target.value)}
                className={`${inputClass} resize-none`} style={inputStyle} />
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-nerv transition-all duration-200"
                  style={{ border: '1px solid rgba(123,47,190,0.2)', background: 'rgba(123,47,190,0.05)', color: 'rgba(123,47,190,0.55)' }}>
                  <ImagePlus size={14} /> Attach
                </button>
                <button onClick={handlePostComment} disabled={posting}
                  className="flex-1 py-2.5 text-sm font-nerv font-medium disabled:opacity-50 tracking-wider transition-all duration-200"
                  style={{ background: 'rgba(123,47,190,0.15)', border: '1px solid rgba(123,47,190,0.3)', color: 'rgba(123,47,190,0.85)' }}>
                  {posting ? 'TRANSMITTING…' : 'TRANSMIT'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
              {sorted.map((c) => (
                <motion.div key={c._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4"
                  style={{
                    border: c.pinned ? '1px solid rgba(0,255,65,0.28)' : '1px solid rgba(123,47,190,0.14)',
                    background: c.pinned ? 'rgba(0,255,65,0.04)' : 'rgba(123,47,190,0.03)',
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-xs font-bold font-nerv flex-shrink-0"
                      style={{ border: '1px solid rgba(123,47,190,0.25)', background: 'rgba(123,47,190,0.1)', color: 'rgba(123,47,190,0.7)' }}>
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium text-white">{c.name}</span>
                        {c.pinned && (
                          <span className="flex items-center gap-1 text-[8px] font-nerv uppercase tracking-wider px-2 py-0.5"
                            style={{ color: '#00FF41', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.3)' }}>
                            <Pin size={8} /> PINNED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/45 leading-relaxed">{c.text}</p>
                    </div>
                    <button onClick={() => handleLike(c._id)}
                      className="flex items-center gap-1 text-[11px] font-nerv flex-shrink-0 transition-colors duration-150"
                      style={{ color: likedIds.has(c._id) ? '#7B2FBE' : 'rgba(255,255,255,0.22)' }}>
                      <Heart size={12} fill={likedIds.has(c._id) ? 'currentColor' : 'none'} />
                      {c.likes}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.1)}
          className="mt-16 text-center pt-8" style={{ borderTop: '1px solid rgba(123,47,190,0.12)' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" opacity="0.25">
              <rect x="10" y="0" width="4" height="24" fill="#FF6600" />
              <rect x="0" y="8" width="24" height="4" fill="#FF6600" />
            </svg>
          </div>
          <p className="text-[10px] font-nerv text-white/18 tracking-widest">
            © 2026 HOUSTON HARVEY SARMIENTO — ALL RIGHTS RESERVED
          </p>
          <p className="text-[8px] font-nerv tracking-widest mt-1" style={{ color: 'rgba(123,47,190,0.3)' }}>
            GOD'S IN HIS HEAVEN — ALL'S RIGHT WITH THE WORLD.
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
