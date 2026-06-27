import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Code2, Layers, X, Award } from 'lucide-react'
import { projects, certificates, techStack } from '@/lib/data'

const TABS = ['Projects', 'Certificates', 'Tech Stack'] as const
type Tab = typeof TABS[number]

function BrowserMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#0f0f18]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a24] border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="flex-1 ml-2 bg-white/[0.08] rounded text-[9px] text-white/30 px-2 py-0.5">wanderwaveph.com</div>
      </div>
      <div className="p-3 bg-grid-pattern" style={{ minHeight: 100 }}>
        <div className="text-[8px] text-white/30 mb-0.5">Houston</div>
        <div className="text-[10px] font-bold text-white/60">Web Developer</div>
        <div className="mt-2 flex gap-1">
          {['TS', 'Re', 'No'].map((t) => (
            <span key={t} className="text-[7px] px-1 py-0.5 border border-white/10 rounded text-white/40">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CertVisual({ cert, onClick }: { cert: typeof certificates[0]; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
      className="w-full rounded-xl border border-white/10 bg-gradient-to-br from-[#16162a] to-[#0d0d14] p-6 text-left hover:border-white/20 transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center flex-shrink-0">
          <Award size={18} className="text-white/50" />
        </div>
        <div>
          <p className="text-xs text-white/35 uppercase tracking-widest mb-0.5">{cert.type}</p>
          <p className="text-sm font-semibold text-white">{cert.title}</p>
          <p className="text-xs text-white/40 mt-0.5">{cert.issuer}</p>
          <p className="text-xs text-white/30 mt-0.5">{cert.date}</p>
        </div>
      </div>
      <p className="text-[10px] text-white/25 mt-4 border-t border-white/[0.06] pt-3">Click to view certificate</p>
    </motion.button>
  )
}

function CertModal({ cert, onClose }: { cert: typeof certificates[0]; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
        <button onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
          <X size={14} className="text-white" />
        </button>
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#12122a] to-[#0a0a14] p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center mx-auto mb-3">
              <Award size={24} className="text-white/60" />
            </div>
            <p className="text-[10px] text-white/30 tracking-widest uppercase">Certificate of</p>
            <h3 className="text-xl font-bold text-white mt-1">{cert.title}</h3>
          </div>
          <div className="border-t border-b border-white/[0.08] py-5 text-center">
            <p className="text-xs text-white/40 mb-1">This certifies that</p>
            <p className="text-lg font-bold text-white tracking-wider">{cert.recipient}</p>
            <p className="text-xs text-white/35 mt-2">has successfully completed</p>
            <p className="text-sm text-white/60 mt-1 font-medium">{cert.title}</p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/30">Issued by</p>
              <p className="text-xs text-white/55 font-medium">{cert.issuer}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/30">Year</p>
              <p className="text-xs text-white/55 font-medium">{cert.date}</p>
            </div>
          </div>
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
    <section id="portfolio" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 bg-[#090909]">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Portfolio Showcase</h2>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="flex justify-center mb-8">
          <div className="relative flex gap-0 p-1 rounded-full border border-white/10 bg-white/[0.04]">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${activeTab === tab ? 'text-black' : 'text-white/50 hover:text-white/75'}`}>
                {activeTab === tab && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }} transition={{ duration: 0.3, ease: 'easeInOut' as const }}>

            {activeTab === 'Projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <motion.div key={proj.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden hover:border-white/[0.14] transition-colors duration-200">
                    <BrowserMockup />
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-white mb-1">{proj.title}</h3>
                      <p className="text-xs text-white/40 leading-relaxed mb-3">{proj.description}</p>
                      <div className="flex items-center justify-between">
                        {proj.liveLink
                          ? <a href={proj.liveLink} target="_blank" rel="noopener noreferrer"
                              className="text-[10px] text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5 hover:bg-emerald-500/10 transition-colors">Live</a>
                          : <span className="text-[10px] text-white/25 border border-white/[0.08] rounded px-2 py-0.5">No Link</span>
                        }
                        <button onClick={() => navigate(`/portfolio/${proj.id}`)}
                          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors duration-150">
                          Details <ArrowRight size={13} />
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
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.08] cursor-default hover:border-white/[0.18] transition-colors duration-200"
                    style={{ backgroundColor: tech.bg }}>
                    <div className="text-base font-bold" style={{ color: tech.color }}>{tech.abbr}</div>
                    <span className="text-[9px] text-center text-white/50 leading-tight">{tech.name}</span>
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
