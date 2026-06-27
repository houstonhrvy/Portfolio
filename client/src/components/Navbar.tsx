import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, onNavClick }: {
  activeSection: string; onNavClick: (id: string) => void
}) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 border-b border-[#7B2FBE]/25"
      style={{ background: 'rgba(5,5,5,0.90)', backdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
    >
      {/* Logo */}
      <button onClick={() => onNavClick('home')}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="text-[#FF6600] font-extrabold text-base tracking-[0.15em] font-nerv"
          style={{ textShadow: '0 0 12px rgba(255,102,0,0.5)' }}>NERV</span>
        <span className="text-[#7B2FBE]/40 text-xs">|</span>
        <span className="text-white/40 text-sm">houston.dev</span>
      </button>

      {/* Nav links */}
      <div className="flex items-center gap-6 md:gap-8">
        {NAV.map(({ id, label }) => (
          <button key={id} onClick={() => onNavClick(id)}
            className="relative text-xs font-nerv tracking-widest transition-colors duration-200 pb-1 uppercase"
            style={{ color: activeSection === id ? '#00FF41' : 'rgba(232,232,232,0.38)' }}>
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
    </motion.nav>
  )
}
