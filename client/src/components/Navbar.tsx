import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

interface Props {
  activeSection: string
  onNavClick: (id: string) => void
}

export default function Navbar({ activeSection, onNavClick }: Props) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/60 backdrop-blur-md border-b border-white/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
    >
      <button
        onClick={() => onNavClick('home')}
        className="text-white font-bold text-lg tracking-tight hover:opacity-75 transition-opacity"
      >
        houston<span className="text-white/40">.dev</span>
      </button>

      <div className="flex items-center gap-6 md:gap-8">
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onNavClick(id)}
            className="relative text-sm font-medium transition-colors duration-200 pb-1"
            style={{ color: activeSection === id ? '#f0f0f0' : 'rgba(240,240,240,0.45)' }}
          >
            {label}
            <AnimatePresence>
              {activeSection === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full"
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
