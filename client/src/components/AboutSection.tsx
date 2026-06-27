import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ArrowRight, Code2, Award, CheckCircle } from 'lucide-react'
import CountUp from 'react-countup'
import { stats } from '@/lib/data'

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
    <div className="flex-1 min-w-[100px] rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 flex flex-col gap-2 hover:border-white/[0.14] transition-colors duration-300">
      <Icon size={16} className="text-white/40" />
      <div className="text-2xl font-bold text-white tabular-nums">
        {inView ? <CountUp end={value} duration={1.8} delay={0.2} suffix={suffix} /> : '0'}
      </div>
      <p className="text-[10px] tracking-widest text-white/35 uppercase">{label}</p>
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 bg-[#090909]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          <div className="flex-1 flex flex-col gap-6">
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
              className="text-sm md:text-base text-white/45 leading-relaxed max-w-md">
              BSIT Graduate from Our Lady of the Sacred Heart College of Olongapo (OLSHCO), currently working as a Web Developer at Telex PH. Passionate about building modern, responsive web experiences that make a real difference.
            </motion.p>

            <motion.blockquote variants={fadeUp(0.32)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="border border-white/[0.08] rounded-xl px-5 py-4 bg-white/[0.03] italic text-sm text-white/55 leading-relaxed">
              "Turning ideas into clean, modern, and meaningful digital experiences."
            </motion.blockquote>

            <motion.div variants={fadeUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-wrap gap-3 mt-1">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/85 active:scale-[0.97] transition-all duration-200">
                <Download size={15} /> Download CV
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/70 text-sm font-medium hover:border-white/30 hover:text-white active:scale-[0.97] transition-all duration-200">
                View Projects <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.15 }}
            className="flex-shrink-0 flex items-center justify-center md:self-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full pulse-glow"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'scale(1.35)' }} />
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border border-white/[0.12] overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-900">
                <div className="absolute inset-0 flex items-end justify-center">
                  <svg viewBox="0 0 100 100" className="w-4/5 opacity-50" fill="none">
                    <circle cx="50" cy="30" r="22" fill="#b0b0c0" />
                    <path d="M5 100 Q50 60 95 100" fill="#b0b0c0" />
                  </svg>
                </div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.7) 0%, transparent 60%)' }} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-14">
          {statItems.map((s) => <StatCard key={s.label} {...s} inView={inView} />)}
        </motion.div>
      </div>
    </section>
  )
}
