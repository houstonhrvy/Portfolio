import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Code2, Layers, X, Award } from 'lucide-react'
import { projects, certificates, techStack } from '@/lib/data'

const TABS = ['Projects', 'Certificates', 'Tech Stack'] as const
type Tab = typeof TABS[number]

function NervCross({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="10" y="0" width="4" height="24" fill="#FF6600" />
      <rect x="0" y="8" width="24" height="4" fill="#FF6600" />
    </svg>
  )
}

function BrowserMockup() {
  return (
    <div className="overflow-hidden shadow-xl"
      style={{ background: 'linear-gradient(160deg, #120028 0%, #05000F 100%)', border: '1px solid rgba(123,47,190,0.25)' }}>
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #7B2FBE, #4B0082)' }} />
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid rgba(123,47,190,0.12)', background: 'rgba(123,47,190,0.04)' }}>
        <span className="w-2 h-2 rounded-full bg-[#CC2200]/60" />
        <span className="w-2 h-2 rounded-full bg-[#FF8C00]/60" />
        <span className="w-2 h-2 rounded-full bg-[#00FF41]/40" />
        <div className="flex-1 ml-2 text-[8px] font-nerv px-2 py-0.5"
          style={{ border: '1px solid rgba(123,47,190,0.2)', color: 'rgba(123,47,190,0.5)' }}>wanderwaveph.com</div>
      </div>
      <div className="p-3 bg-grid-pattern" style={{ minHeight: 90 }}>
        <div className="text-[7px] font-nerv mb-0.5 tracking-widest" style={{ color: 'rgba(123,47,190,0.5)' }}>NERV // PERSONNEL</div>
        <div className="text-[10px] font-bold text-white/55">Houston H. Sarmiento</div>
        <div className="mt-2 flex gap-1">
          {['TS', 'Re', 'No'].map((t) => (
            <span key={t} className="text-[7px] font-nerv px-1 py-0.5"
              style={{ border: '1px solid rgba(123,47,190,0.25)', color: 'rgba(123,47,190,0.6)' }}>{t}</span>
          ))}
        </div>
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

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<Tab>('Projects')
  const [openCert, setOpenCert] = useState<typeof certificates[0] | null>(null)
  const navigate = useNavigate()

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
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="relative z-10 px-5 py-2 text-xs font-nerv tracking-wider uppercase transition-colors duration-200"
                style={{ color: activeTab === tab ? '#050505' : 'rgba(123,47,190,0.55)' }}>
                {activeTab === tab && (
                  <motion.span layoutId="tab-pill"
                    className="absolute inset-0"
                    style={{ background: '#7B2FBE' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }} transition={{ duration: 0.3, ease: 'easeInOut' as const }}>

            {activeTab === 'Projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <motion.div key={proj.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden hover:opacity-90 transition-all duration-200"
                    style={{ border: '1px solid rgba(123,47,190,0.15)', background: 'rgba(123,47,190,0.02)' }}>
                    <BrowserMockup />
                    <div className="p-4">
                      <p className="text-[8px] font-nerv tracking-widest mb-1 uppercase" style={{ color: 'rgba(255,102,0,0.5)' }}>// OPERATION</p>
                      <h3 className="text-sm font-semibold text-white mb-1">{proj.title}</h3>
                      <p className="text-xs text-white/35 leading-relaxed mb-3">{proj.description}</p>
                      <div className="flex items-center justify-between">
                        {proj.liveLink
                          ? <a href={proj.liveLink} target="_blank" rel="noopener noreferrer"
                              className="text-[9px] font-nerv px-2 py-0.5 tracking-widest transition-colors"
                              style={{ color: 'rgba(0,255,65,0.8)', border: '1px solid rgba(0,255,65,0.3)' }}>LIVE</a>
                          : <span className="text-[9px] font-nerv px-2 py-0.5 tracking-widest text-white/20"
                              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>OFFLINE</span>
                        }
                        <button onClick={() => navigate(`/portfolio/${proj.id}`)}
                          className="flex items-center gap-1.5 text-xs font-nerv tracking-wider transition-colors duration-150"
                          style={{ color: 'rgba(123,47,190,0.65)' }}>
                          DETAILS <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'Certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <CertVisual key={cert.id} cert={cert} onClick={() => setOpenCert(cert)} />
                ))}
              </div>
            )}

            {activeTab === 'Tech Stack' && (
              <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                {techStack.map((tech, i) => (
                  <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }} whileHover={{ scale: 1.06, y: -3 }}
                    className="flex flex-col items-center gap-2 p-3 cursor-default transition-colors duration-200"
                    style={{ backgroundColor: tech.bg, border: '1px solid rgba(123,47,190,0.15)' }}>
                    <div className="text-base font-bold font-nerv" style={{ color: tech.color }}>{tech.abbr}</div>
                    <span className="text-[8px] font-nerv text-center text-white/45 leading-tight tracking-wider">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
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
