import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Code2, Layers, Link as LinkIcon, GitBranch } from 'lucide-react'
import { projects } from '@/lib/data'

function BrowserMockupFull() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f18]">
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#1a1a24] border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="flex-1 ml-2 bg-white/[0.08] rounded text-[9px] text-white/35 px-3 py-1">wanderwaveph.com</div>
      </div>
      <div className="bg-grid-pattern" style={{ padding: '24px 20px', minHeight: 200 }}>
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 border border-white/10 rounded-full px-2 py-0.5 mb-3">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[8px] text-white/30">Available</span>
            </div>
            <div className="text-lg font-extrabold text-white/80 leading-none mb-0.5">Houston</div>
            <div className="text-lg font-extrabold text-white/20 leading-none mb-2">Web Developer</div>
            <div className="flex gap-1 flex-wrap">
              {['Re', 'TS', 'No', 'Mo'].map((t) => (
                <span key={t} className="text-[7px] border border-white/10 rounded px-1 py-0.5 text-white/30">{t}</span>
              ))}
            </div>
          </div>
          <div className="w-16 h-24 rounded-lg border border-white/10 bg-gradient-to-b from-zinc-700/60 to-zinc-900/60 flex-shrink-0">
            <div className="h-3/5 bg-zinc-600/30 rounded-t-lg" />
            <div className="p-1 text-center"><div className="text-[6px] text-white/30">H.H.S</div></div>
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
      className="min-h-screen bg-[#090909] text-[#f0f0f0] px-6 md:px-12 py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.button variants={fadeUp(0)} initial="hidden" animate="show"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-white/45 hover:text-white mb-10 group transition-colors duration-150">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <motion.h1 variants={fadeUp(0.05)} initial="hidden" animate="show"
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              {project.title}
            </motion.h1>

            <motion.p variants={fadeUp(0.1)} initial="hidden" animate="show"
              className="text-sm md:text-base text-white/45 leading-relaxed max-w-lg">
              {project.longDescription}
            </motion.p>

            <motion.div variants={fadeUp(0.15)} initial="hidden" animate="show" className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 border border-white/10 rounded-xl px-4 py-3 bg-white/[0.03]">
                <Code2 size={16} className="text-white/40" />
                <div>
                  <div className="text-lg font-bold text-white">{project.technologies.length}</div>
                  <div className="text-[10px] text-white/35 uppercase tracking-wider">Technologies Used</div>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-white/10 rounded-xl px-4 py-3 bg-white/[0.03]">
                <Layers size={16} className="text-white/40" />
                <div>
                  <div className="text-lg font-bold text-white">{project.features.length}</div>
                  <div className="text-[10px] text-white/35 uppercase tracking-wider">Key Features</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp(0.2)} initial="hidden" animate="show" className="flex gap-3">
              {project.liveLink ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-white/20 bg-white/[0.06] text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <LinkIcon size={14} /> Live Demo
                </a>
              ) : (
                <button disabled className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-white/10 text-white/30 cursor-not-allowed">
                  <LinkIcon size={14} /> No Link
                </button>
              )}
              {project.repoLink ? (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-white/20 bg-white/[0.06] text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <GitBranch size={14} /> Repository
                </a>
              ) : (
                <button disabled className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-white/10 text-white/30 cursor-not-allowed">
                  <GitBranch size={14} /> No Link
                </button>
              )}
            </motion.div>

            <motion.div variants={fadeUp(0.25)} initial="hidden" animate="show">
              <p className="text-xs text-white/35 uppercase tracking-widest mb-3">Technologies Used</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/60">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' as const }}
            className="lg:w-[420px] flex flex-col gap-6">
            <BrowserMockupFull />
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={14} className="text-white/40" />
                <p className="text-sm font-semibold text-white">Key Features</p>
              </div>
              <ul className="flex flex-col gap-3">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/50">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
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
