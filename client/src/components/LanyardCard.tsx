import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

function SyncBar({ value = 100 }: { value?: number }) {
  return (
    <div className="w-full h-1.5 bg-white/5 overflow-hidden">
      <motion.div
        className="h-full"
        style={{ background: 'linear-gradient(90deg, #4B0082, #7B2FBE, #00FF41)' }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' as const }}
      />
    </div>
  )
}

function StatusRow({ label, value, color = '#00FF41' }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-[3px]" style={{ borderBottom: '1px solid rgba(123,47,190,0.1)' }}>
      <span className="text-[8px] font-nerv tracking-widest text-white/35 uppercase">{label}</span>
      <span className="text-[8px] font-nerv font-bold tracking-wider" style={{ color }}>{value}</span>
    </div>
  )
}

export default function LanyardCard() {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateZ = useTransform(x, [-160, 160], [-18, 18])

  const cablePath = useTransform(x, (xv) => {
    const mx = 40
    const cpx = mx + xv * 0.35
    const ex = mx + xv * 0.65
    return `M ${mx} 0 Q ${cpx} 65 ${ex} 135`
  })

  useEffect(() => {
    if (isDragging) return
    const ctrl = animate(x, [0, 12, 0, -12, 0], { duration: 7, repeat: Infinity, ease: 'easeInOut' })
    return () => ctrl.stop()
  }, [isDragging, x])

  const handleDragEnd = () => {
    setIsDragging(false)
    animate(x, 0, { type: 'spring', stiffness: 100, damping: 11, mass: 0.9 })
    animate(y, 0, { type: 'spring', stiffness: 100, damping: 11, mass: 0.9 })
  }

  return (
    <div className="relative flex flex-col items-center select-none" style={{ height: 440, width: 220 }}>

      {/* Umbilical connector at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <div className="w-8 h-2 rounded-sm" style={{ background: '#1a1a2e', border: '1px solid rgba(123,47,190,0.6)' }} />
        <div className="w-5 h-2.5 rounded-b-sm" style={{ background: '#4B0082' }} />
      </div>

      {/* Umbilical cable */}
      <svg width="80" height="140" className="absolute top-4"
        style={{ left: '50%', transform: 'translateX(-50%)', overflow: 'visible' }}>
        <defs>
          <linearGradient id="cableGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4B0082" />
            <stop offset="50%" stopColor="#2D0054" />
            <stop offset="100%" stopColor="#1a0030" />
          </linearGradient>
        </defs>
        {/* Main cable */}
        <motion.path d={cablePath} fill="none" stroke="url(#cableGrad)" strokeWidth="11" strokeLinecap="round" />
        {/* Orange hazard stripe on cable */}
        <motion.path d={cablePath} fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="6 14" opacity="0.5" />
        {/* Green edge line */}
        <motion.path d={cablePath} fill="none" stroke="#00FF41" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
      </svg>

      {/* Terminal Panel */}
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing"
        style={{ top: 134, x, y, rotateZ }}
        drag
        dragElastic={0.1}
        dragConstraints={{ left: -150, right: 150, top: -60, bottom: 80 }}
        onDragStart={() => { setIsDragging(true); x.stop() }}
        onDragEnd={handleDragEnd}
      >
        <div style={{
          width: 200,
          background: 'linear-gradient(175deg, #0d0018 0%, #050008 100%)',
          border: '1px solid rgba(123,47,190,0.4)',
          boxShadow: '0 0 30px rgba(123,47,190,0.18), 0 24px 60px rgba(0,0,0,0.9)',
          borderRadius: 4,
          overflow: 'hidden',
        }}>

          {/* Top hazard stripe */}
          <div style={{ height: 6, background: 'repeating-linear-gradient(90deg, #FF6600 0px, #FF6600 8px, #1a0008 8px, #1a0008 16px)' }} />

          {/* Header */}
          <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(123,47,190,0.2)', background: 'rgba(123,47,190,0.08)' }}>
            <div>
              <p className="text-[7px] font-nerv tracking-[0.3em] text-[#FF6600]/80">◆ NERV ◆</p>
              <p className="text-[9px] font-nerv font-bold text-white/80 tracking-widest leading-tight">UNIT-01 STATUS</p>
            </div>
            {/* NERV cross */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" opacity="0.4">
              <rect x="10" y="0" width="4" height="24" fill="#FF6600" />
              <rect x="0" y="8" width="24" height="4" fill="#FF6600" />
            </svg>
          </div>

          {/* Pilot photo area */}
          <div className="relative overflow-hidden" style={{ height: 160, background: 'linear-gradient(180deg, #110020 0%, #06000e 100%)' }}>
            {/* Dot bg */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(circle, #7B2FBE 1px, transparent 1px)', backgroundSize: '9px 9px' }} />
            {/* Pilot photo */}
            <img
              src="/assets/me.jpeg"
              alt="Pilot"
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                opacity: 0.92,
              }}
            />
            {/* Scan line overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.08) 4px, rgba(0,0,0,0.08) 5px)' }} />
            {/* Corner marks */}
            <div className="absolute top-1 left-1 w-3 h-3" style={{ borderTop: '1px solid rgba(0,255,65,0.4)', borderLeft: '1px solid rgba(0,255,65,0.4)' }} />
            <div className="absolute top-1 right-1 w-3 h-3" style={{ borderTop: '1px solid rgba(0,255,65,0.4)', borderRight: '1px solid rgba(0,255,65,0.4)' }} />
            <div className="absolute bottom-1 left-1 w-3 h-3" style={{ borderBottom: '1px solid rgba(0,255,65,0.4)', borderLeft: '1px solid rgba(0,255,65,0.4)' }} />
            <div className="absolute bottom-1 right-1 w-3 h-3" style={{ borderBottom: '1px solid rgba(0,255,65,0.4)', borderRight: '1px solid rgba(0,255,65,0.4)' }} />
            {/* Type label */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2">
              <span className="text-[6px] font-nerv tracking-widest text-white/20">PILOT // CLASSIFIED</span>
            </div>
          </div>

          {/* Data panel */}
          <div className="px-3 pt-2 pb-2.5">
            {/* Pilot name */}
            <div className="mb-2">
              <p className="text-[7px] font-nerv text-[#FF6600]/55 tracking-widest mb-0.5">PILOT</p>
              <p className="text-[11px] font-bold text-white leading-tight">Houston H. Sarmiento</p>
            </div>

            {/* Sync rate */}
            <div className="mb-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[7px] font-nerv tracking-widest text-white/35 uppercase">Sync Rate</span>
                <span className="text-[8px] font-nerv font-bold" style={{ color: '#00FF41' }}>100%</span>
              </div>
              <SyncBar value={100} />
            </div>

            {/* Status rows */}
            <div className="mt-2 flex flex-col gap-0">
              <StatusRow label="Pattern" value="● BLUE" color="#00BFFF" />
              <StatusRow label="AT Field" value="ACTIVE" color="#00FF41" />
              <StatusRow label="Status" value="OPERATIONAL" color="#7B2FBE" />
            </div>

            {/* Footer */}
            <div className="mt-2 pt-1.5 flex items-center justify-between" style={{ borderTop: '1px solid rgba(123,47,190,0.15)' }}>
              <span className="text-[7px] font-nerv text-white/18">ID: 3A-HHS</span>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00FF41]" style={{ boxShadow: '0 0 4px #00FF41' }} />
                <span className="text-[7px] font-nerv text-[#00FF41]/60">SYNCED</span>
              </div>
            </div>
          </div>

          {/* Bottom hazard stripe */}
          <div style={{ height: 4, background: 'repeating-linear-gradient(90deg, #7B2FBE 0px, #7B2FBE 6px, #050008 6px, #050008 12px)' }} />
        </div>
      </motion.div>
    </div>
  )
}
