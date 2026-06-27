import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ArrowRight, Code2, Award, CheckCircle } from 'lucide-react'
import CountUp from 'react-countup'
import { stats } from '@/lib/data'
import EvaUnit02 from './EvaUnit02'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const, delay } },
})

const statItems = [
  { label: 'PROJECTS', value: stats.projects, Icon: Code2, suffix: '+' },
  { label: 'CERTIFICATES', value: stats.certificates, Icon: Award, suffix: '' },
  { label: 'COMPLETED WORKS', value: stats.completedWorks, Icon: CheckCircle, suffix: '' },
]

function StatCard({ label, value, suffix, Icon, inView }: {
  label: string; value: number; suffix: string; Icon: React.ElementType; inView: boolean
}) {
  return (
    <div className="flex-1 min-w-[100px] px-4 py-4 flex flex-col gap-2 hover:border-[#7B2FBE]/40 transition-colors duration-300"
      style={{ border: '1px solid rgba(123,47,190,0.22)', background: 'rgba(123,47,190,0.05)' }}>
      <Icon size={16} style={{ color: 'rgba(123,47,190,0.6)' }} />
      <div className="text-2xl font-bold tabular-nums font-nerv" style={{ color: '#00FF41' }}>
        {inView ? <CountUp end={value} duration={1.8} delay={0.2} suffix={suffix} /> : '0'}
      </div>
      <p className="text-[10px] font-nerv tracking-widest text-white/35 uppercase">{label}</p>
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden">

      {/* ── EVA UNIT-02 BACKGROUND (left side) ── */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none z-0"
        style={{ width: '40%' }}>
        <EvaUnit02
          className="absolute left-0 h-[85vh] w-auto"
          style={{
            opacity: 0.16,
            filter: 'drop-shadow(0 0 30px rgba(204,34,0,0.4)) drop-shadow(0 0 60px rgba(204,34,0,0.15))',
            transform: 'translateX(-25%)',
          }}
        />
      </div>

      {/* Red glow from Unit-02 side */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full z-0"
        style={{ background: 'radial-gradient(circle, rgba(204,34,0,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          <div className="flex-1 flex flex-col gap-6">

            <motion.p variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-[9px] font-nerv tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255,102,0,0.65)' }}>
              ◆ NERV // PERSONNEL FILE ◆
            </motion.p>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
              {['HOUSTON', 'HARVEY', 'SARMIENTO'].map((word, i) => (
                <motion.h2 key={word} variants={fadeUp(i * 0.07)}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                  {word}
                </motion.h2>
              ))}
            </motion.div>

            <motion.p variants={fadeUp(0.25)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-sm md:text-base text-white/40 leading-relaxed max-w-md">
              BSIT Graduate from Our Lady of the Sacred Heart College of Olongapo (OLSHCO), currently working as a Web Developer at Telex PH. Passionate about building modern, responsive web experiences that make a real difference.
            </motion.p>

            <motion.blockquote variants={fadeUp(0.32)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="pl-4 py-1 italic text-sm text-white/45 leading-relaxed"
              style={{ borderLeft: '2px solid rgba(123,47,190,0.6)', background: 'rgba(123,47,190,0.04)' }}>
              "Turning ideas into clean, modern, and meaningful digital experiences."
            </motion.blockquote>

            <motion.div variants={fadeUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-wrap gap-3 mt-1">
              <button className="flex items-center gap-2 px-5 py-2.5 text-black text-sm font-bold font-nerv tracking-wide hover:opacity-85 active:scale-[0.97] transition-all duration-200"
                style={{ background: '#7B2FBE' }}>
                <Download size={15} /> DOWNLOAD CV
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-nerv tracking-wide active:scale-[0.97] transition-all duration-200"
                style={{ border: '1px solid rgba(123,47,190,0.3)', color: 'rgba(123,47,190,0.85)' }}>
                VIEW PROJECTS <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.15 }}
            className="flex-shrink-0 flex items-center justify-center md:self-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full pulse-glow"
                style={{ transform: 'scale(1.35)', background: 'radial-gradient(circle at 50% 50%, rgba(123,47,190,0.1) 0%, transparent 70%)' }} />
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1E0038 0%, #05000F 100%)',
                  border: '1px solid rgba(123,47,190,0.3)',
                  boxShadow: '0 0 50px rgba(123,47,190,0.18)',
                }}>
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(circle, #7B2FBE 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                <div className="absolute inset-0 flex items-end justify-center">
                  <svg viewBox="0 0 100 100" className="w-4/5 opacity-45" fill="none">
                    <circle cx="50" cy="30" r="22" fill="#7B2FBE" />
                    <path d="M5 100 Q50 60 95 100" fill="#7B2FBE" />
                  </svg>
                </div>
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,0,10,0.82) 0%, transparent 60%)' }} />
                {/* Green eye glow hint */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full opacity-30"
                  style={{ background: '#00FF41', filter: 'blur(6px)' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-14">
          {statItems.map((s) => <StatCard key={s.label} {...s} inView={inView} />)}
        </motion.div>
      </div>
    </section>
  )
}
