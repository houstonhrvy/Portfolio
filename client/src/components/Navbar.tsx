import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, onNavClick }: {
  activeSection: string; onNavClick: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close mobile menu on section change
  useEffect(() => { setOpen(false) }, [activeSection])

  const handleNav = (id: string) => {
    setOpen(false)
    onNavClick(id)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 md:py-3.5 border-b border-[#7B2FBE]/25"
        style={{ background: 'rgba(5,5,5,0.90)', backdropFilter: 'blur(14px)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      >
        {/* Logo */}
        <button onClick={() => handleNav('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity relative z-[60]">
          <span className="text-[#FF6600] font-extrabold text-base tracking-[0.15em] font-nerv"
            style={{ textShadow: '0 0 12px rgba(255,102,0,0.5)' }}>NERV</span>
          <span className="text-[#7B2FBE]/40 text-xs">|</span>
          <span className="text-white/40 text-sm">houston.dev</span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(({ id, label }) => (
            <button key={id} onClick={() => handleNav(id)}
              className="relative text-xs font-nerv tracking-widest transition-colors duration-200 pb-1 uppercase"
              style={{ color: activeSection === id ? '#00FF41' : 'rgba(232,232,232,0.62)' }}>
              {label}
              <AnimatePresence>
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full"
                    style={{ background: '#00FF41', boxShadow: '0 0 6px #00FF41' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        {/* Mobile hamburger toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden relative z-[60] flex items-center justify-center w-9 h-9 border border-[#7B2FBE]/40 rounded-sm"
          style={{ background: 'rgba(123,47,190,0.08)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="flex">
                <X size={18} color="#00FF41" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="flex">
                <Menu size={18} color="#FF6600" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(14px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

            <div className="relative flex flex-col items-center justify-center flex-1 gap-8 px-6">
              {NAV.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  onClick={() => handleNav(id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  className="font-nerv uppercase tracking-[0.3em] text-2xl"
                  style={{
                    color: activeSection === id ? '#00FF41' : 'rgba(232,232,232,0.75)',
                    textShadow: activeSection === id ? '0 0 16px rgba(0,255,65,0.5)' : 'none',
                  }}
                >
                  <span className="text-[#7B2FBE]/50 mr-2 text-base">0{i + 1}</span>
                  {label}
                </motion.button>
              ))}
            </div>

            <motion.p
              className="relative text-center pb-8 font-nerv text-[10px] tracking-[0.3em]"
              style={{ color: 'rgba(123,47,190,0.6)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.3 }}
            >
              ◆ NERV HQ // TOKYO-3 ◆
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
