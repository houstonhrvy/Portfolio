import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Code2, Layers, Link as LinkIcon, GitBranch } from 'lucide-react'
import { projects } from '@/lib/data'

function BrowserMockupFull() {
  return (
    <div className="overflow-hidden border border-[#FF6600]/25 shadow-2xl"
      style={{ background: 'linear-gradient(160deg, #0d0014 0%, #050508 100%)' }}>
      <div className="h-1 w-full bg-[#FF6600]" />
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-[#FF6600]/[0.1]"
        style={{ background: 'rgba(255,102,0,0.03)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#CC0000]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C00]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41]/40" />
        <div className="flex-1 ml-2 border border-[#FF6600]/15 text-[9px] font-nerv text-[#FF6600]/30 px-3 py-1">wanderwaveph.com</div>
      </div>
      <div className="bg-grid-pattern" style={{ padding: '24px 20px', minHeight: 200 }}>
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 border border-[#FF6600]/20 px-2 py-0.5 mb-3">
              <span className="w-1 h-1 rounded-full bg-[#FF6600]" style={{ boxShadow: '0 0 4px #FF6600' }} />
              <span className="text-[8px] font-nerv text-[#FF6600]/50 tracking-widest">SYNCED</span>
            </div>
            <div className="text-lg font-extrabold text-white/80 leading-none mb-0.5">Houston</div>
            <div className="text-lg font-extrabold leading-none mb-2" style={{ color: 'rgba(255,102,0,0.3)' }}>Web Dev</div>
            <div className="flex gap-1 flex-wrap">
              {['Re', 'TS', 'No', 'Mo'].map((t) => (
                <span key={t} className="text-[7px] font-nerv border border-[#FF6600]/20 px-1 py-0.5 text-[#FF6600]/40">{t}</span>
              ))}
            </div>
          </div>
          <div className="w-16 h-24 border border-[#FF6600]/15 flex-shrink-0"
            style={{ background: 'linear-gradient(160deg, #1a0028 0%, #0a000f 100%)' }}>
            <div className="h-3/5" style={{ background: 'rgba(255,102,0,0.08)' }} />
            <div className="p-1 text-center"><div className="text-[6px] font-nerv text-[#FF6600]/30">H.H.S</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const, delay } },
})

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    if (!project) navigate('/#portfolio', { replace: true })
  }, [project, navigate])

  if (!project) return null

  return (
    <motion.main
      className="min-h-screen bg-[#050505] text-[#e8e8e8] px-6 md:px-12 py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <motion.button variants={fadeUp(0)} initial="hidden" animate="show"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-nerv text-[#FF6600]/50 hover:text-[#FF6600] mb-10 group transition-colors duration-150 tracking-wider uppercase">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Archives
        </motion.button>

        {/* Tag */}
        <motion.p variants={fadeUp(0.02)} initial="hidden" animate="show"
          className="text-[9px] font-nerv tracking-[0.4em] text-[#FF6600]/50 mb-2 uppercase">
          ◆ NERV // OPERATION FILE
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <motion.h1 variants={fadeUp(0.05)} initial="hidden" animate="show"
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              {project.title}
            </motion.h1>

            <motion.p variants={fadeUp(0.1)} initial="hidden" animate="show"
              className="text-sm md:text-base text-white/40 leading-relaxed max-w-lg">
              {project.longDescription}
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp(0.15)} initial="hidden" animate="show" className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 border border-[#FF6600]/18 bg-[#FF6600]/[0.04] px-4 py-3">
                <Code2 size={16} className="text-[#FF6600]/50" />
                <div>
                  <div className="text-lg font-bold font-nerv text-[#FF6600]">{project.technologies.length}</div>
                  <div className="text-[9px] font-nerv text-white/30 uppercase tracking-wider">Systems Used</div>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-[#FF6600]/18 bg-[#FF6600]/[0.04] px-4 py-3">
                <Layers size={16} className="text-[#FF6600]/50" />
                <div>
                  <div className="text-lg font-bold font-nerv text-[#FF6600]">{project.features.length}</div>
                  <div className="text-[9px] font-nerv text-white/30 uppercase tracking-wider">Key Modules</div>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={fadeUp(0.2)} initial="hidden" animate="show" className="flex gap-3">
              {project.liveLink ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-nerv border border-[#FF6600]/28 bg-[#FF6600]/[0.06] text-[#FF6600]/80 hover:bg-[#FF6600]/14 hover:text-[#FF6600] transition-all duration-200 tracking-wider">
                  <LinkIcon size={14} /> LIVE DEMO
                </a>
              ) : (
                <button disabled className="flex items-center gap-2 px-4 py-2 text-sm font-nerv border border-[#FF6600]/10 text-[#FF6600]/25 cursor-not-allowed tracking-wider">
                  <LinkIcon size={14} /> OFFLINE
                </button>
              )}
              {project.repoLink ? (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-nerv border border-[#FF6600]/28 bg-[#FF6600]/[0.06] text-[#FF6600]/80 hover:bg-[#FF6600]/14 hover:text-[#FF6600] transition-all duration-200 tracking-wider">
                  <GitBranch size={14} /> REPOSITORY
                </a>
              ) : (
                <button disabled className="flex items-center gap-2 px-4 py-2 text-sm font-nerv border border-[#FF6600]/10 text-[#FF6600]/25 cursor-not-allowed tracking-wider">
                  <GitBranch size={14} /> CLASSIFIED
                </button>
              )}
            </motion.div>

            {/* Tech badges */}
            <motion.div variants={fadeUp(0.25)} initial="hidden" animate="show">
              <p className="text-[9px] font-nerv text-[#FF6600]/45 uppercase tracking-[0.35em] mb-3">// SYSTEMS DEPLOYED</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs font-nerv px-3 py-1.5 border border-[#FF6600]/18 bg-[#FF6600]/[0.04] text-[#FF6600]/60 tracking-wider">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' as const }}
            className="lg:w-[420px] flex flex-col gap-6">
            <BrowserMockupFull />
            <div className="border border-[#FF6600]/15 bg-[#FF6600]/[0.03] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={14} className="text-[#FF6600]/50" />
                <p className="text-sm font-nerv text-[#FF6600]/70 tracking-wider uppercase">Key Modules</p>
              </div>
              <ul className="flex flex-col gap-3">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/45">
                    <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0 bg-[#FF6600]/40" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}
