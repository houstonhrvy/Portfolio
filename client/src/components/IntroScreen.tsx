import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, User, Globe } from 'lucide-react'

const icons = [
  { Icon: Code2, label: 'Code' },
  { Icon: User, label: 'Person' },
  { Icon: Globe, label: 'Globe' },
]

interface Props { onComplete: () => void }

export default function IntroScreen({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeInOut' as const }}
    >
      <div className="flex gap-5 mb-10">
        {icons.map(({ Icon, label }, i) => (
          <motion.div
            key={label}
            className="w-14 h-14 rounded-full border border-white/15 bg-white/5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.18, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Icon size={22} className="text-white/70" />
          </motion.div>
        ))}
      </div>

      <motion.h1
        className="text-3xl md:text-4xl font-bold text-white text-center leading-tight tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.72, duration: 0.5, ease: 'easeOut' as const }}
      >
        Welcome to my<br />Portfolio Website
      </motion.h1>

      <motion.p
        className="mt-4 text-sm text-white/35 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        github.com/houstonhrvy
      </motion.p>
    </motion.div>
  )
}
