import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function LanyardCard() {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateZ = useTransform(x, [-160, 160], [-22, 22])

  const strapPath = useTransform(x, (xv) => {
    const mx = 40
    const cpx = mx + xv * 0.35
    const ex = mx + xv * 0.65
    return `M ${mx} 0 Q ${cpx} 70 ${ex} 145`
  })

  useEffect(() => {
    if (isDragging) return
    const ctrl = animate(x, [0, 14, 0, -14, 0], {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    return () => ctrl.stop()
  }, [isDragging, x])

  const handleDragEnd = () => {
    setIsDragging(false)
    animate(x, 0, { type: 'spring', stiffness: 100, damping: 11, mass: 0.9 })
    animate(y, 0, { type: 'spring', stiffness: 100, damping: 11, mass: 0.9 })
  }

  return (
    <div className="relative flex flex-col items-center select-none" style={{ height: 420, width: 200 }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-zinc-600 rounded-b-full z-10" />

      <svg
        width="80" height="148"
        className="absolute top-2"
        style={{ left: '50%', transform: 'translateX(-50%)', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a5a6e" />
            <stop offset="100%" stopColor="#2e2e3e" />
          </linearGradient>
        </defs>
        <motion.path d={strapPath} fill="none" stroke="url(#strapGrad)" strokeWidth="9" strokeLinecap="round" />
        <text x="28" y="68" fontSize="6" fill="rgba(255,255,255,0.3)" letterSpacing="2.5"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '28px 68px' }}>
          3D CARD
        </text>
      </svg>

      <motion.div
        className="absolute cursor-grab active:cursor-grabbing"
        style={{ top: 144, x, y, rotateZ }}
        drag
        dragElastic={0.12}
        dragConstraints={{ left: -160, right: 160, top: -60, bottom: 80 }}
        onDragStart={() => { setIsDragging(true); x.stop() }}
        onDragEnd={handleDragEnd}
      >
        <div
          className="w-44 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(160deg, #1a1a24 0%, #0d0d14 100%)' }}
        >
          <div className="h-44 relative overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-end justify-center">
            <svg viewBox="0 0 100 100" className="absolute bottom-0 w-28 opacity-60" fill="none">
              <circle cx="50" cy="32" r="20" fill="#a0a0b0" />
              <path d="M10 100 Q50 60 90 100" fill="#a0a0b0" />
            </svg>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,20,0.9) 0%, transparent 50%)' }} />
          </div>
          <div className="px-3 py-3 text-center">
            <p className="text-[9px] tracking-[0.25em] text-white/30 uppercase mb-1">Portfolio Card</p>
            <p className="text-sm font-bold text-white tracking-wide">Houston H. Sarmiento</p>
            <p className="text-[10px] text-white/45 mt-0.5">Web Developer</p>
            <div className="flex items-center justify-center gap-1.5 mt-2.5 border-t border-white/10 pt-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="text-[9px] text-emerald-400">Available for Work</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
