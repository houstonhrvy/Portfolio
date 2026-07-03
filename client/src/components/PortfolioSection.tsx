import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowRight, ArrowLeft, Code2, Award, Cpu, Link as LinkIcon, ImageOff, X } from 'lucide-react'
import { projects, certificates, techStack, type Project, type TechItem } from '@/lib/data'

const TABS = [
  { id: 'Projects', Icon: Code2 },
  { id: 'Certificates', Icon: Award },
  { id: 'Tech Stack', Icon: Cpu },
] as const
type Tab = typeof TABS[number]['id']

function NervCross({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="10" y="0" width="4" height="24" fill="#FF6600" />
      <rect x="0" y="8" width="24" height="4" fill="#FF6600" />
    </svg>
  )
}

function urlLabel(link?: string) {
  if (!link) return 'offline'
  try { return new URL(link).hostname.replace('www.', '') } catch { return link }
}

function BrowserMockup({ project, tall = false }: { project: Project; tall?: boolean }) {
  const [broken, setBroken] = useState(false)

  return (
    <div className="overflow-hidden shadow-xl"
      style={{ background: 'linear-gradient(160deg, #120028 0%, #05000F 100%)', border: '1px solid rgba(123,47,190,0.25)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #7B2FBE, #4B0082)' }} />
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid rgba(123,47,190,0.12)', background: 'rgba(123,47,190,0.04)' }}>
        <span className="w-2 h-2 rounded-full bg-[#CC2200]/60" />
        <span className="w-2 h-2 rounded-full bg-[#FF8C00]/60" />
        <span className="w-2 h-2 rounded-full bg-[#00FF41]/40" />
        <div className="flex-1 ml-2 text-[8px] font-nerv px-2 py-0.5 truncate"
          style={{ border: '1px solid rgba(123,47,190,0.2)', color: 'rgba(123,47,190,0.5)' }}>{urlLabel(project.liveLink)}</div>
      </div>
      <div className="relative bg-grid-pattern" style={{ minHeight: tall ? 220 : 110 }}>
        {!broken ? (
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            onError={() => setBroken(true)}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
            <ImageOff size={tall ? 30 : 20} style={{ color: 'rgba(123,47,190,0.4)' }} />
            <p className="text-[8px] font-nerv tracking-widest text-center" style={{ color: 'rgba(123,47,190,0.4)' }}>
              PREVIEW PENDING UPLOAD
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function CertVisual({ cert, onClick }: { cert: typeof certificates[0]; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
      className="w-full p-6 text-left cursor-pointer transition-all duration-200"
      style={{
        border: '1px solid rgba(123,47,190,0.22)',
        background: 'linear-gradient(135deg, rgba(123,47,190,0.06) 0%, rgba(75,0,130,0.03) 100%)',
      }}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          style={{ border: '1px solid rgba(123,47,190,0.3)', background: 'rgba(123,47,190,0.1)' }}>
          <Award size={18} style={{ color: 'rgba(123,47,190,0.7)' }} />
        </div>
        <div>
          <p className="text-[9px] font-nerv uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,102,0,0.55)' }}>{cert.type}</p>
          <p className="text-sm font-semibold text-white">{cert.title}</p>
          <p className="text-xs text-white/35 mt-0.5">{cert.issuer}</p>
          <p className="text-xs font-nerv mt-0.5" style={{ color: 'rgba(123,47,190,0.5)' }}>{cert.date}</p>
        </div>
      </div>
      <p className="text-[9px] font-nerv mt-4 pt-3 tracking-wider" style={{ borderTop: '1px solid rgba(123,47,190,0.12)', color: 'rgba(0,255,65,0.3)' }}>
        [ CLICK TO VIEW CLEARANCE DOCUMENT ]
      </p>
    </motion.button>
  )
}

function CertModal({ cert, onClose }: { cert: typeof certificates[0]; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div className="absolute inset-0 bg-black/88 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
        <button onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 flex items-center justify-center hover:opacity-85 transition-opacity"
          style={{ background: '#7B2FBE' }}>
          <X size={14} className="text-white" />
        </button>
        <div className="p-8 shadow-2xl"
          style={{ background: 'linear-gradient(160deg, #120028 0%, #05000F 100%)', border: '1px solid rgba(123,47,190,0.35)' }}>
          <div className="h-1 w-full -mx-8 mb-6" style={{ background: 'linear-gradient(90deg, #7B2FBE, #00FF41)', width: 'calc(100% + 4rem)' }} />
          <div className="text-center mb-6">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3"
              style={{ border: '1px solid rgba(123,47,190,0.4)', background: 'rgba(123,47,190,0.1)' }}>
              <Award size={22} style={{ color: 'rgba(123,47,190,0.75)' }} />
            </div>
            <p className="text-[9px] font-nerv tracking-widest uppercase" style={{ color: 'rgba(255,102,0,0.5)' }}>NERV // CLEARANCE DOCUMENT</p>
            <h3 className="text-xl font-bold text-white mt-1">{cert.title}</h3>
          </div>
          <div className="py-5 text-center" style={{ borderTop: '1px solid rgba(123,47,190,0.18)', borderBottom: '1px solid rgba(123,47,190,0.18)' }}>
            <p className="text-[10px] font-nerv text-white/35 mb-1 tracking-widest">THIS CERTIFIES THAT</p>
            <p className="text-lg font-bold font-nerv tracking-wider" style={{ color: '#00FF41' }}>{cert.recipient}</p>
            <p className="text-[10px] font-nerv text-white/30 mt-2 tracking-wider">HAS SUCCESSFULLY COMPLETED</p>
            <p className="text-sm text-white/55 mt-1 font-medium">{cert.title}</p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-nerv" style={{ color: 'rgba(123,47,190,0.5)' }}>ISSUED BY</p>
              <p className="text-xs text-white/50 font-medium">{cert.issuer}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-nerv" style={{ color: 'rgba(123,47,190,0.5)' }}>YEAR</p>
              <p className="text-xs font-nerv" style={{ color: 'rgba(0,255,65,0.7)' }}>{cert.date}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center opacity-20"><NervCross size={28} /></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [broken, setBroken] = useState(false)

  return (
    <motion.div layoutId={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut', layout: { type: 'spring', stiffness: 300, damping: 32 } }}
      style={{ background: 'linear-gradient(160deg, rgba(123,47,190,0.06) 0%, rgba(5,0,10,0.9) 60%)' }}
      onClick={onOpen}
      whileHover={{ y: -6 }}
      className="op-card group relative overflow-hidden cursor-pointer">

      {/* Diagonal corner slash accent */}
      <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rotate-45 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        style={{ background: 'linear-gradient(135deg, #7B2FBE, transparent)' }} />

      {/* File index tag */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
        <span className="text-[9px] font-nerv tracking-widest" style={{ color: 'rgba(255,102,0,0.7)' }}>
          FILE_0{index + 1}
        </span>
      </div>

      {/* Status LED */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        <motion.span className="w-1.5 h-1.5 rounded-full"
          style={{ background: project.liveLink ? '#00FF41' : 'rgba(255,255,255,0.25)', boxShadow: project.liveLink ? '0 0 6px #00FF41' : 'none' }}
          animate={project.liveLink ? { opacity: [1, 0.4, 1] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        <span className="text-[8px] font-nerv tracking-widest" style={{ color: project.liveLink ? 'rgba(0,255,65,0.8)' : 'rgba(255,255,255,0.3)' }}>
          {project.liveLink ? project.status : 'OFFLINE'}
        </span>
      </div>

      {/* Preview image with zoom-on-hover + scanline sweep */}
      <motion.div layoutId={`project-image-${project.id}`}
        transition={{ layout: { type: 'spring', stiffness: 300, damping: 32 } }}
        className="relative overflow-hidden" style={{ height: 160, borderBottom: '1px solid rgba(123,47,190,0.2)' }}>
        {!broken ? (
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            onError={() => setBroken(true)}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-grid-pattern flex flex-col items-center justify-center gap-2">
            <ImageOff size={22} style={{ color: 'rgba(123,47,190,0.4)' }} />
            <p className="text-[8px] font-nerv tracking-widest" style={{ color: 'rgba(123,47,190,0.4)' }}>PREVIEW PENDING</p>
          </div>
        )}
        {/* gradient fade into card body */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,0,10,0.95), transparent)' }} />
        {/* hover scan sweep */}
        <motion.div className="absolute inset-y-0 w-1/3 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.12), transparent)' }}
          initial={{ left: '-40%' }}
          animate={{ left: '140%' }}
          transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }} />
      </motion.div>

      <div className="relative z-10 p-4">
        <p className="text-[8px] font-nerv tracking-widest mb-1 uppercase" style={{ color: 'rgba(255,102,0,0.5)' }}>// OPERATION</p>
        <motion.h3 layoutId={`project-title-${project.id}`}
          transition={{ layout: { type: 'spring', stiffness: 300, damping: 32 } }}
          className="text-base font-bold text-white mb-1.5">{project.title}</motion.h3>
        <p className="text-xs text-white/35 leading-relaxed mb-3 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[8px] font-nerv px-1.5 py-0.5 tracking-wider"
              style={{ border: '1px solid rgba(123,47,190,0.25)', color: 'rgba(123,47,190,0.75)' }}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(123,47,190,0.1)' }}>
          <span className="text-[9px] font-nerv tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {urlLabel(project.liveLink)}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-nerv tracking-wider transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: '#00FF41' }}>
            ACCESS FILE <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div layoutId={`project-card-${project.id}`}
      transition={{ layout: { type: 'spring', stiffness: 300, damping: 32 } }}
      className="overflow-hidden"
      style={{ border: '1px solid rgba(123,47,190,0.3)', background: 'rgba(123,47,190,0.03)' }}>

      <button onClick={onClose}
        className="flex items-center gap-2 text-[10px] font-nerv tracking-widest uppercase px-4 pt-4 pb-1 transition-colors duration-150 group"
        style={{ color: 'rgba(123,47,190,0.6)' }}>
        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Archives
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0">
        <motion.div layoutId={`project-image-${project.id}`}
          transition={{ layout: { type: 'spring', stiffness: 300, damping: 32 } }}
          className="p-4 lg:p-6">
          <BrowserMockup project={project} tall />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="p-4 lg:p-6 lg:pl-0 flex flex-col gap-4">

          <p className="text-[9px] font-nerv tracking-[0.35em] uppercase" style={{ color: 'rgba(255,102,0,0.55)' }}>
            ◆ NERV // OPERATION FILE
          </p>

          <motion.h3 layoutId={`project-title-${project.id}`}
            transition={{ layout: { type: 'spring', stiffness: 300, damping: 32 } }}
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {project.title}
          </motion.h3>

          <p className="text-sm text-white/45 leading-relaxed">{project.longDescription}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-[10px] font-nerv px-2.5 py-1 tracking-wider"
                style={{ border: '1px solid rgba(123,47,190,0.25)', color: 'rgba(123,47,190,0.7)', background: 'rgba(123,47,190,0.05)' }}>
                {tech}
              </span>
            ))}
          </div>

          <div>
            <p className="text-[9px] font-nerv text-white/30 uppercase tracking-[0.3em] mb-2">// Key Modules</p>
            <ul className="flex flex-col gap-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/50">
                  <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0" style={{ background: 'rgba(0,255,65,0.6)' }} />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mt-1">
            {project.liveLink ? (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="btn-glow-green flex items-center gap-2 px-4 py-2 text-xs font-nerv tracking-wider uppercase"
                style={{ border: '1px solid rgba(0,255,65,0.35)', color: 'rgba(0,255,65,0.9)', background: 'rgba(0,255,65,0.06)' }}>
                <LinkIcon size={13} /> Visit Live Site
              </a>
            ) : (
              <button disabled className="flex items-center gap-2 px-4 py-2 text-xs font-nerv tracking-wider uppercase cursor-not-allowed"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' }}>
                <LinkIcon size={13} /> Offline
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const techSpring = { type: 'spring', stiffness: 170, damping: 22 } as const

function TechTile({ tech, onSelect }: { tech: TechItem; onSelect: () => void }) {
  return (
    <motion.button
      layout onClick={onSelect}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18, ease: 'easeIn' } }}
      whileHover={{ y: -4, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
      className="tech-tile relative flex flex-col items-center gap-2 py-2 bg-transparent"
      style={{ ['--tech-glow' as string]: tech.color }}>
      <motion.img layoutId={`tech-icon-${tech.name}`} src={tech.icon} alt={tech.name}
        transition={{ layout: techSpring }}
        width={30} height={30}
        className="tech-tile-icon"
        style={{ objectFit: 'contain' }}
        loading="lazy" draggable={false} />
      <motion.span layoutId={`tech-name-${tech.name}`} transition={{ layout: techSpring }}
        className="text-[8px] font-nerv text-center tracking-wider text-white/45">
        {tech.name}
      </motion.span>
    </motion.button>
  )
}

function TechDetail({ tech, onClose }: { tech: TechItem; onClose: () => void }) {
  return (
    <motion.div layout transition={{ layout: techSpring }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="mt-4 p-5 flex items-start gap-4"
      style={{ border: `1px solid ${tech.color}40`, background: `linear-gradient(135deg, ${tech.color}0f 0%, rgba(5,0,10,0.9) 70%)` }}
    >
      <div className="flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center gap-1">
        <motion.img layoutId={`tech-icon-${tech.name}`} src={tech.icon} alt={tech.name}
          transition={{ layout: techSpring }}
          style={{ width: 34, height: 34, objectFit: 'contain', filter: `drop-shadow(0 0 10px ${tech.color})` }} />
        <motion.span layoutId={`tech-name-${tech.name}`} transition={{ layout: techSpring }}
          className="text-[8px] font-nerv text-center tracking-wider" style={{ color: tech.color }}>
          {tech.name}
        </motion.span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-nerv tracking-[0.25em] mb-1" style={{ color: tech.color }}>{tech.category}</p>
            <h4 className="text-lg font-bold text-white mb-1.5">{tech.name}</h4>
          </div>
          <button onClick={onClose}
            className="flex items-center gap-1 text-[9px] font-nerv tracking-widest uppercase flex-shrink-0 transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            <ArrowLeft size={11} /> Back
          </button>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.1 }}
          className="text-xs text-white/50 leading-relaxed">
          {tech.desc}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<Tab>('Projects')
  const [openCert, setOpenCert] = useState<typeof certificates[0] | null>(null)
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [activeTech, setActiveTech] = useState<TechItem | null>(null)
  const [direction, setDirection] = useState(0)

  const handleTabChange = (tab: Tab) => {
    const from = TABS.findIndex((t) => t.id === activeTab)
    const to = TABS.findIndex((t) => t.id === tab)
    setDirection(to > from ? 1 : -1)
    setActiveTab(tab)
    setOpenProject(null)
    setActiveTech(null)
  }

  return (
    <section id="portfolio" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Subtle purple glow */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(123,47,190,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <p className="text-[9px] font-nerv tracking-[0.45em] mb-3 uppercase" style={{ color: 'rgba(255,102,0,0.6)' }}>◆ NERV // ARCHIVES ◆</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">CLASSIFIED OPS</h2>
          <p className="text-sm text-white/35 max-w-md mx-auto leading-relaxed font-nerv">
            Personnel records, operations log, and system capabilities.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="flex justify-center mb-8">
          <div className="relative flex gap-0 p-1"
            style={{ border: '1px solid rgba(123,47,190,0.25)', background: 'rgba(123,47,190,0.04)' }}>
            {TABS.map(({ id, Icon }) => (
              <motion.button key={id} onClick={() => handleTabChange(id)}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-nerv tracking-wider uppercase"
                animate={{ color: activeTab === id ? '#050505' : 'rgba(123,47,190,0.55)' }}
                transition={{ duration: 0.25 }}>
                {activeTab === id && (
                  <motion.span layoutId="tab-pill"
                    className="absolute inset-0"
                    style={{ background: '#7B2FBE', boxShadow: '0 0 20px rgba(123,47,190,0.5)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <Icon size={13} className="relative z-10" />
                <span className="relative z-10 hidden sm:inline">{id}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={activeTab} custom={direction}
            initial={{ opacity: 0, x: direction * 24 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }} transition={{ duration: 0.3, ease: 'easeInOut' as const }}>

            {activeTab === 'Projects' && (
              <LayoutGroup>
                {openProject ? (
                  <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {projects.map((proj, i) => (
                      <ProjectCard key={proj.id} project={proj} index={i} onOpen={() => setOpenProject(proj)} />
                    ))}
                  </div>
                )}
              </LayoutGroup>
            )}

            {activeTab === 'Certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <CertVisual key={cert.id} cert={cert} onClick={() => setOpenCert(cert)} />
                ))}
              </div>
            )}

            {activeTab === 'Tech Stack' && (
              <LayoutGroup>
                <AnimatePresence mode="popLayout" initial={false}>
                  {activeTech ? (
                    <TechDetail key="detail" tech={activeTech} onClose={() => setActiveTech(null)} />
                  ) : (
                    <motion.div key="grid" layout
                      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {techStack.map((tech) => (
                        <TechTile key={tech.name} tech={tech} onSelect={() => setActiveTech(tech)} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </LayoutGroup>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openCert && <CertModal cert={openCert} onClose={() => setOpenCert(null)} />}
      </AnimatePresence>
    </section>
  )
}
