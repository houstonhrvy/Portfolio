import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import IconSphere from './IconSphere'

const TYPING_TEXTS = ['Web Developer', 'NERV Personnel', 'React Specialist', 'Full-Stack Dev']

function useTypewriter(texts: string[], speed = 65) {
  const [textIdx, setTextIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const textsRef = useRef(texts)
  useEffect(() => { textsRef.current = texts })

  useEffect(() => {
    let i = 0
    const text = textsRef.current[textIdx]
    setDisplayed('')
    setDone(false)
    let nextTimer: ReturnType<typeof setTimeout>
    const startTimer = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++ }
        else {
          setDone(true); clearInterval(iv)
          nextTimer = setTimeout(() => setTextIdx(p => (p + 1) % textsRef.current.length), 2200)
        }
      }, speed)
      return () => clearInterval(iv)
    }, textIdx === 0 ? 900 : 300)
    return () => { clearTimeout(startTimer); clearTimeout(nextTimer) }
  }, [textIdx, speed])

  return { displayed, done }
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } }

export default function HeroSection() {
  const { displayed, done } = useTypewriter(TYPING_TEXTS)

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, opacity: 0.5 }}
        src="/assets/Red_clouds_drift_green_light_202606271544.mp4"
        autoPlay muted loop playsInline
      />

      {/* Left-side dark overlay so text is readable */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(5,0,8,0.88) 0%, rgba(5,0,8,0.65) 50%, rgba(5,0,8,0.2) 100%)' }} />
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-24 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(5,0,8,0.7), transparent)' }} />
      {/* Bottom fade — covers Gemini watermark, solid at very bottom */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{ zIndex: 1, height: '32%', background: 'linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.6) 40%, rgba(5,5,5,0.92) 70%, #050505 100%)' }} />

      {/* ── CONTENT ── */}
      <div className="relative w-full max-w-7xl mx-auto px-5 md:px-12 pt-24 pb-20 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-8" style={{ zIndex: 2 }}>

        {/* Left — Text */}
        <motion.div className="flex-1 flex flex-col gap-5 w-full" variants={container} initial="hidden" animate="show">

          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-[10px] font-nerv tracking-widest border px-3 py-1.5 uppercase"
              style={{ color: 'rgba(0,255,65,0.85)', borderColor: 'rgba(0,255,65,0.28)', background: 'rgba(0,255,65,0.05)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" style={{ boxShadow: '0 0 6px #00FF41' }} />
              SYNCHRONIZATION ACTIVE
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="leading-none">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white">Full Stack</h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight" style={{ color: 'rgba(123,47,190,0.55)' }}>
              Web Developer
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} className="h-7 flex items-center">
            <span className="text-base md:text-xl font-nerv text-white/55">{displayed}</span>
            {!done && <span className="cursor-caret" />}
          </motion.div>

          <motion.p variants={fadeUp} className="max-w-sm text-sm md:text-base text-white/35 leading-relaxed">
            Building modern, clean, and responsive websites with a focus on smooth user experiences and meaningful digital design.
          </motion.p>
        </motion.div>

        {/* Right — Skills Grid */}
        <motion.div
          className="w-full md:flex-1 flex items-start justify-center md:justify-end md:pt-2"
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <IconSphere />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bob" style={{ zIndex: 2 }}>
        <span className="text-[9px] font-nerv tracking-widest uppercase" style={{ color: 'rgba(123,47,190,0.55)' }}>Scroll</span>
        <ChevronDown size={16} style={{ color: 'rgba(123,47,190,0.55)' }} />
      </div>
    </section>
  )
}
