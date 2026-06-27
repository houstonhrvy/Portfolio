import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LanyardCard from './LanyardCard'

const TYPING_TEXT = 'Web Developer'
const TECH_BADGES = ['TypeScript', 'React.js', 'Node.js', 'MongoDB']

function useTypewriter(text: string, delay = 900, speed = 65) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++ }
        else { setDone(true); clearInterval(iv) }
      }, speed)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(start)
  }, [text, delay, speed])
  return { displayed, done }
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function HeroSection() {
  const { displayed, done } = useTypewriter(TYPING_TEXT)
  return (
    <section id="home" className="bg-grid-pattern relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-16 flex flex-col md:flex-row items-center gap-12 md:gap-0">
        <motion.div className="flex-1 flex flex-col gap-5" variants={container} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60 border border-white/[0.12] rounded-full px-3 py-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              Available for Work
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="leading-none">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white">Frontend</h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white/30">Developer</h1>
          </motion.div>

          <motion.div variants={fadeUp} className="h-8 flex items-center">
            <span className="text-lg md:text-xl font-medium text-white/70">{displayed}</span>
            {!done && <span className="cursor-caret text-white/70" />}
          </motion.div>

          <motion.p variants={fadeUp} className="max-w-md text-sm md:text-base text-white/40 leading-relaxed">
            Building modern, clean, and responsive websites with a focus on smooth user experiences and meaningful digital design.
          </motion.p>

          <motion.div variants={container} className="flex flex-wrap gap-2 mt-1">
            {TECH_BADGES.map((badge) => (
              <motion.span key={badge} variants={fadeUp}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/55 hover:border-white/20 hover:text-white/80 transition-all duration-200">
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex-1 flex items-center justify-center md:justify-end md:pr-8">
          <LanyardCard />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bob">
        <span className="text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/30" />
      </div>
    </section>
  )
}
