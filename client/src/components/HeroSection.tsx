import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LanyardCard from './LanyardCard'

const TYPING_TEXTS = ['Web Developer', 'NERV Personnel', 'React Specialist', 'Full-Stack Dev']
const TECH_BADGES = ['TypeScript', 'React.js', 'Node.js', 'MongoDB']

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
        style={{ zIndex: 0, opacity: 0.55 }}
        src="/assets/Red_clouds_drift_green_light_202606271544.mp4"
        autoPlay muted loop playsInline
      />
      {/* Dark overlay so text stays legible */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(5,0,8,0.82) 0%, rgba(5,0,8,0.55) 55%, rgba(5,0,8,0.25) 100%)' }} />
      {/* Bottom gradient to blend into next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to bottom, transparent, #050505)' }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-16 flex flex-col md:flex-row items-center gap-12 md:gap-0" style={{ zIndex: 2 }}>
        <motion.div className="flex-1 flex flex-col gap-5" variants={container} initial="hidden" animate="show">

          {/* Status badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-[10px] font-nerv tracking-widest border px-3 py-1.5 uppercase"
              style={{
                color: 'rgba(0,255,65,0.85)',
                borderColor: 'rgba(0,255,65,0.28)',
                background: 'rgba(0,255,65,0.05)',
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"
                style={{ boxShadow: '0 0 6px #00FF41' }} />
              SYNCHRONIZATION ACTIVE
            </span>
          </motion.div>

          {/* Heading — Unit-01 color split */}
          <motion.div variants={fadeUp} className="leading-none">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white">Full Stack</h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
              style={{ color: 'rgba(123,47,190,0.5)' }}>Web Developer</h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={fadeUp} className="h-8 flex items-center">
            <span className="text-lg md:text-xl font-nerv text-white/55">{displayed}</span>
            {!done && <span className="cursor-caret" />}
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="max-w-md text-sm md:text-base text-white/32 leading-relaxed">
            Building modern, clean, and responsive websites with a focus on smooth user experiences and meaningful digital design.
          </motion.p>

          {/* Tech badges — Unit-01 purple */}
          <motion.div variants={container} className="flex flex-wrap gap-2 mt-1">
            {TECH_BADGES.map((badge) => (
              <motion.span key={badge} variants={fadeUp}
                className="text-xs font-nerv font-medium px-3 py-1.5 border transition-all duration-200"
                style={{
                  borderColor: 'rgba(123,47,190,0.3)',
                  background: 'rgba(123,47,190,0.06)',
                  color: 'rgba(123,47,190,0.8)',
                }}>
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Lanyard card */}
        <div className="flex-1 flex items-center justify-center md:justify-end md:pr-8 relative z-10">
          <LanyardCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bob" style={{ zIndex: 2 }}>
        <span className="text-[9px] font-nerv tracking-widest uppercase" style={{ color: 'rgba(123,47,190,0.55)' }}>Scroll</span>
        <ChevronDown size={16} style={{ color: 'rgba(123,47,190,0.55)' }} />
      </div>
    </section>
  )
}
