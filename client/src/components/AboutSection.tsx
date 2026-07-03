import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ArrowRight, Code2, Award, CheckCircle } from 'lucide-react'
import CountUp from 'react-countup'
import { stats } from '@/lib/data'

const NF = { fontFamily: '"Share Tech Mono",monospace' } as const

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const, delay } },
})

const statItems = [
  { label: 'PROJECTS',        value: stats.projects,       Icon: Code2,        suffix: '+' },
  { label: 'CERTIFICATES',    value: stats.certificates,   Icon: Award,        suffix: ''  },
  { label: 'COMPLETED WORKS', value: stats.completedWorks, Icon: CheckCircle,  suffix: ''  },
]

function StatCard({ label, value, suffix, Icon, inView, index }: {
  label: string; value: number; suffix: string; Icon: React.ElementType; inView: boolean; index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="stat-card relative flex-1 min-w-[90px] px-4 py-4 flex flex-col gap-2 overflow-hidden"
      style={{ border: '1px solid rgba(123,47,190,0.22)', background: 'rgba(123,47,190,0.05)', willChange: 'transform' }}>

      {/* top accent line that draws in */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg,#7B2FBE,#00FF41)' }}
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.12, ease: 'easeOut' }}
      />

      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
      >
        <Icon size={16} style={{ color: 'rgba(123,47,190,0.7)' }} />
      </motion.div>
      <div className="text-2xl font-bold tabular-nums font-nerv" style={{ color: '#00FF41' }}>
        {inView ? <CountUp end={value} duration={1.8} delay={0.2 + index * 0.12} suffix={suffix} /> : '0'}
      </div>
      <p className="text-[10px] font-nerv tracking-widest text-white/45 uppercase">{label}</p>
    </motion.div>
  )
}

function PilotPhoto() {
  const [revealed, setRevealed] = useState(false)

  const cornerStyle = (pos: 'tl'|'tr'|'bl'|'br') => {
    const isTop  = pos[0] === 't', isLeft = pos[1] === 'l'
    const b = '2px solid rgba(0,255,65,0.75)'
    return {
      position: 'absolute' as const,
      width: 18, height: 18,
      top:    isTop  ? -1 : 'auto',
      bottom: !isTop ? -1 : 'auto',
      left:   isLeft ? -1 : 'auto',
      right:  !isLeft? -1 : 'auto',
      borderTop:    isTop  ? b : 'none',
      borderBottom: !isTop ? b : 'none',
      borderLeft:   isLeft ? b : 'none',
      borderRight:  !isLeft? b : 'none',
    }
  }

  return (
    <div style={{ position: 'relative', width: 280, flexShrink: 0 }}>

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        style={{ position: 'absolute', inset: -18, pointerEvents: 'none', background: 'radial-gradient(ellipse,rgba(123,47,190,0.22) 0%,transparent 68%)', filter: 'blur(12px)' }}
      />

      {/* ── Photo frame: vertical scan-wipe reveal ── */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        onAnimationComplete={() => setRevealed(true)}
        style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(123,47,190,0.35)', aspectRatio: '3/4' }}
      >
        {/* Photo */}
        <img
          src="/assets/me.jpeg"
          alt="Houston Harvey Sarmiento"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />

        {/* CRT scanlines */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)' }} />

        {/* Bottom gradient + nameplate */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', pointerEvents: 'none', background: 'linear-gradient(to top,rgba(4,0,10,0.97) 0%,rgba(4,0,10,0.6) 55%,transparent 100%)' }} />

        {/* Nameplate */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}
        >
          <p style={{ ...NF, fontSize: 8, color: '#FF6600', opacity: 0.85, letterSpacing: '0.28em', marginBottom: 5 }}>
            ◆ NERV // PERSONNEL
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1.2, marginBottom: 6 }}>
            HOUSTON H.<br />SARMIENTO
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...NF, fontSize: 9, color: 'rgba(123,47,190,0.9)', letterSpacing: '0.15em' }}>WEB DEVELOPER</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#00FF41', boxShadow: '0 0 5px #00FF41', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ ...NF, fontSize: 9, color: '#00FF41', letterSpacing: '0.12em' }}>SYNCED</span>
          </div>
        </motion.div>

        {/* Animated scan line */}
        <motion.div
          style={{ position: 'absolute', left: 0, right: 0, height: 2, pointerEvents: 'none', background: 'linear-gradient(to right,transparent,rgba(0,255,65,0.5) 35%,rgba(0,255,65,0.8) 50%,rgba(0,255,65,0.5) 65%,transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />

        {/* "TARGET LOCKED" flash after reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 1.4, times: [0, 0.1, 0.65, 1], delay: 0.1 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
        >
          <span style={{ ...NF, fontSize: 11, color: '#00FF41', letterSpacing: '0.35em', textShadow: '0 0 12px #00FF41, 0 0 30px rgba(0,255,65,0.4)' }}>
            TARGET LOCKED
          </span>
        </motion.div>

        {/* Dual scan bars during reveal */}
        <motion.div
          initial={{ top: '0%', opacity: 1 }}
          animate={{ top: '105%', opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ position: 'absolute', left: 0, right: 0, height: 3, pointerEvents: 'none', background: 'linear-gradient(to right,transparent,rgba(0,255,65,0.9) 40%,#00FF41 50%,rgba(0,255,65,0.9) 60%,transparent)', boxShadow: '0 0 8px #00FF41' }}
        />

        {/* Targeting reticle — crosshair + ticks, fades in after reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {/* horizontal + vertical crosshair lines */}
          <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(0,255,65,0.55) 15%, rgba(0,255,65,0.55) 85%, transparent)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '30%', bottom: '48%', width: 1, background: 'linear-gradient(to bottom, transparent, rgba(0,255,65,0.5))' }} />

          {/* reticle circle at the eye-line */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '38%', left: '50%', width: 34, height: 34, transform: 'translate(-50%,-50%)', border: '1px solid rgba(0,255,65,0.6)', borderRadius: '50%' }}
          />
          <div style={{ position: 'absolute', top: '38%', left: '50%', width: 4, height: 4, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: '#00FF41', boxShadow: '0 0 6px #00FF41' }} />

          {/* corner tick marks, small */}
          {[
            { top: '30%', left: '30%' }, { top: '30%', right: '30%' },
            { bottom: '52%', left: '30%' }, { bottom: '52%', right: '30%' },
          ].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', width: 8, height: 8, borderTop: i < 2 ? '1px solid rgba(0,255,65,0.45)' : 'none', borderBottom: i >= 2 ? '1px solid rgba(0,255,65,0.45)' : 'none', borderLeft: i % 2 === 0 ? '1px solid rgba(0,255,65,0.45)' : 'none', borderRight: i % 2 === 1 ? '1px solid rgba(0,255,65,0.45)' : 'none', ...pos }} />
          ))}
        </motion.div>
      </motion.div>

      {/* Corner brackets — animate in after reveal */}
      {(['tl','tr','bl','br'] as const).map((pos, i) => {
        const isTop  = pos[0] === 't', isLeft = pos[1] === 'l'
        return (
          <motion.div key={pos}
            initial={{ opacity: 0, x: isLeft ? -8 : 8, y: isTop ? -8 : 8 }}
            animate={revealed ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            style={cornerStyle(pos)}
          />
        )
      })}

      {/* Pulsing border accent */}
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: -1, border: '1px solid rgba(0,255,65,0.3)', pointerEvents: 'none' }}
      />

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ position: 'absolute', top: '50%', right: -22, transform: 'translateY(-50%) rotate(90deg)', ...NF, fontSize: 7, color: 'rgba(123,47,190,0.5)', letterSpacing: '0.25em', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
        ID:3A-HHS // UNIT-01
      </motion.div>
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-20 md:py-24 px-5 md:px-12 bg-[#050505] relative overflow-hidden">

      <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full z-0"
        style={{ background: 'radial-gradient(circle,rgba(123,47,190,0.07) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 items-center md:items-start">

          {/* Left — text */}
          <div className="flex-1 flex flex-col gap-5 md:gap-6">

            <motion.p variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-[10px] font-nerv tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255,102,0,0.85)' }}>
              ◆ NERV // PERSONNEL FILE ◆
            </motion.p>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
              {['HOUSTON', 'HARVEY', 'SARMIENTO'].map((word, i) => (
                <motion.h2 key={word} variants={fadeUp(i * 0.07)}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                  {word}
                </motion.h2>
              ))}
            </motion.div>

            <motion.p variants={fadeUp(0.25)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-sm md:text-base text-white/55 leading-relaxed max-w-md">
              BSIT Graduate from Our Lady of the Sacred Heart College of Olongapo (OLSHCO), currently working as a Web Developer at Telex PH. Passionate about building modern, responsive web experiences that make a real difference.
            </motion.p>

            <motion.blockquote variants={fadeUp(0.32)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="pl-4 py-1.5 italic text-sm text-white/55 leading-relaxed"
              style={{ borderLeft: '2px solid rgba(123,47,190,0.7)', background: 'rgba(123,47,190,0.05)' }}>
              "Turning ideas into clean, modern, and meaningful digital experiences."
            </motion.blockquote>

            <motion.div variants={fadeUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-wrap gap-3 mt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="btn-glow-purple flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold font-nerv tracking-wide"
                style={{ background: '#7B2FBE', willChange: 'transform' }}>
                <Download size={15} /> DOWNLOAD CV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="btn-glow-green flex items-center gap-2 px-5 py-2.5 text-sm font-nerv tracking-wide"
                style={{ border: '1px solid rgba(123,47,190,0.4)', color: 'rgba(123,47,190,0.95)', willChange: 'transform' }}>
                VIEW PROJECTS <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <div className="flex justify-center md:justify-end md:self-start md:pt-2">
            <PilotPhoto />
          </div>
        </div>

        {/* Stats */}
        <div ref={ref} className="flex flex-wrap gap-3 mt-12 md:mt-14">
          {statItems.map((s, i) => <StatCard key={s.label} {...s} inView={inView} index={i} />)}
        </div>
      </div>
    </section>
  )
}
