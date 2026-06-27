import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Shield, Crosshair } from 'lucide-react'

const BOOT_ITEMS = [
  { Icon: Cpu, label: 'MAGI', sub: 'ONLINE' },
  { Icon: Shield, label: 'AT-FIELD', sub: 'ACTIVE' },
  { Icon: Crosshair, label: 'WEAPONS', sub: 'ARMED' },
]

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3800)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' as const }}
    >
      {/* Purple grid bg */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* CRT scanlines */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)' }} />

      {/* Corner HUD text */}
      <div className="absolute top-4 left-4 text-[#FF6600]/40 text-[8px] font-nerv tracking-widest">NERV // MAGI TERMINAL</div>
      <div className="absolute top-4 right-4 text-[#FF6600]/40 text-[8px] font-nerv tracking-widest">CLEARANCE: CLASS-A</div>
      <div className="absolute bottom-4 left-4 text-[#7B2FBE]/40 text-[8px] font-nerv">© NERV HQ // TOKYO-3</div>
      <div className="absolute bottom-4 right-4 text-[#7B2FBE]/40 text-[8px] font-nerv">UNIT-01 // STANDBY</div>

      {/* Hex corner decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 -left-8 w-36 h-36 border border-[#7B2FBE]/12 rotate-12"
          style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }} />
        <div className="absolute bottom-16 -right-8 w-28 h-28 border border-[#7B2FBE]/12 -rotate-6"
          style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }} />
      </div>

      {/* NERV wordmark */}
      <motion.div className="mb-8 text-center relative z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <p className="text-[10px] font-nerv tracking-[0.5em] text-[#FF6600]/60">◆ NERV ◆</p>
      </motion.div>

      {/* Boot icons */}
      <div className="flex gap-8 mb-10 relative z-20">
        {BOOT_ITEMS.map(({ Icon, label, sub }, i) => (
          <motion.div key={label} className="flex flex-col items-center gap-2.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.22, duration: 0.45, ease: 'easeOut' as const }}>
            <div className="w-14 h-14 flex items-center justify-center border border-[#7B2FBE]/40 bg-[#7B2FBE]/[0.08]"
              style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}>
              <Icon size={20} className="text-[#7B2FBE]" />
            </div>
            <div className="text-center">
              <p className="text-[8px] font-nerv font-bold text-[#7B2FBE]/80 tracking-widest">{label}</p>
              <p className="text-[7px] font-nerv text-[#00FF41]/60 tracking-widest">{sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main heading */}
      <motion.div className="text-center relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight nerv-flicker"
          style={{ color: '#FF6600', textShadow: '0 0 30px rgba(255,102,0,0.4)' }}>NERV</h1>
        <p className="text-[11px] font-nerv text-white/40 tracking-[0.3em] mt-2">
          SYNC RATE: <span className="text-[#00FF41]">100%</span>
        </p>
      </motion.div>

      {/* Sync progress bar */}
      <motion.div className="mt-5 w-56 h-[2px] bg-[#7B2FBE]/20 overflow-hidden relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}>
        <motion.div className="h-full"
          style={{ background: 'linear-gradient(90deg, #7B2FBE, #00FF41)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 1.9, ease: 'easeOut' as const }} />
      </motion.div>

      {/* Pilot ID */}
      <motion.p className="mt-5 text-[10px] font-nerv text-white/25 tracking-[0.2em] relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}>
        PILOT ID: <span className="text-[#00FF41]/60">houstonhrvy</span>
      </motion.p>
    </motion.div>
  )
}
