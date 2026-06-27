import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Shield, Crosshair } from 'lucide-react'

const NF = { fontFamily: '"Share Tech Mono",monospace' } as const

const ITEMS = [
  { Icon: Cpu,       label: 'MAGI',     sub: 'ONLINE' },
  { Icon: Shield,    label: 'AT-FIELD', sub: 'ACTIVE' },
  { Icon: Crosshair, label: 'WEAPONS',  sub: 'ARMED'  },
]

const LOG = [
  '> NEURAL BRIDGE LINK........... OK',
  '> PILOT SYNC PROTOCOL........... OK',
  '> AT FIELD CALIBRATION.......... OK',
  '> UNIT-01 ALL SYSTEMS........... NOMINAL',
]

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [lines,   setLines]   = useState<string[]>([])
  const [syncPct, setSyncPct] = useState(0)

  useEffect(() => {
    const t = setTimeout(onComplete, 4800)
    return () => clearTimeout(t)
  }, [onComplete])

  /* Boot log lines appear sequentially */
  useEffect(() => {
    LOG.forEach((line, i) => setTimeout(() => setLines(p => [...p, line]), 1600 + i * 380))
  }, [])

  /* Sync rate counter */
  useEffect(() => {
    let v = 0
    const iv = setInterval(() => { v += 2; setSyncPct(Math.min(100, v)); if (v >= 100) clearInterval(iv) }, 38)
    return () => clearInterval(iv)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: 'easeInOut' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* CRT scanlines */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.10) 3px,rgba(0,0,0,0.10) 4px)' }} />

      {/* Side accent bars */}
      {[0, 1].map(side => (
        <motion.div key={side}
          className={`absolute ${side === 0 ? 'left-0' : 'right-0'} top-0 bottom-0 w-[2px]`}
          style={{ background: 'linear-gradient(to bottom,transparent,#7B2FBE,transparent)' }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: side * 1.1 }}
        />
      ))}

      {/* HUD corners */}
      <motion.div className="absolute top-5 left-5" initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
        <p style={{ ...NF, fontSize:11, color:'rgba(255,102,0,0.85)', letterSpacing:'0.25em' }}>NERV // MAGI TERMINAL</p>
      </motion.div>
      <motion.div className="absolute top-5 right-5 text-right" initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
        <p style={{ ...NF, fontSize:11, color:'rgba(255,102,0,0.85)', letterSpacing:'0.25em' }}>CLEARANCE: CLASS-A</p>
      </motion.div>
      <motion.div className="absolute bottom-5 left-5" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
        <p style={{ ...NF, fontSize:10, color:'rgba(123,47,190,0.7)', letterSpacing:'0.2em' }}>© NERV HQ // TOKYO-3</p>
      </motion.div>
      <motion.div className="absolute bottom-5 right-5 text-right" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
        <p style={{ ...NF, fontSize:10, color:'rgba(123,47,190,0.7)', letterSpacing:'0.2em' }}>UNIT-01 // STANDBY</p>
      </motion.div>

      {/* ◆ NERV ◆ eyebrow */}
      <motion.p style={{ ...NF, fontSize:11, color:'rgba(255,102,0,0.85)', letterSpacing:'0.65em', marginBottom:24, position:'relative', zIndex:20 }}
        initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
        ◆ NERV ◆
      </motion.p>

      {/* Boot status icons */}
      <div className="flex gap-12 mb-10 relative z-20">
        {ITEMS.map(({ Icon, label, sub }, i) => (
          <motion.div key={label} className="flex flex-col items-center gap-3"
            initial={{ opacity:0, y:18 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.2 + 0.3, duration:0.5, ease:'easeOut' }}>
            <div style={{ width:68, height:68, display:'flex', alignItems:'center', justifyContent:'center', border:'1.5px solid rgba(123,47,190,0.65)', background:'rgba(123,47,190,0.09)', clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', boxShadow:'0 0 16px rgba(123,47,190,0.22)' }}>
              <Icon size={26} color="#7B2FBE" />
            </div>
            <div className="text-center">
              <p style={{ ...NF, fontSize:12, color:'rgba(123,47,190,0.9)', letterSpacing:'0.2em', fontWeight:700 }}>{label}</p>
              <p style={{ ...NF, fontSize:11, color:'rgba(0,255,65,0.85)', letterSpacing:'0.2em' }}>{sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main NERV title */}
      <motion.div className="text-center relative z-20"
        initial={{ opacity:0, scale:0.88 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ delay:0.8, duration:0.7, ease:'easeOut' }}>
        <h1 className="nerv-flicker"
          style={{ fontSize:'clamp(72px,10vw,110px)', fontWeight:900, letterSpacing:'-0.02em', color:'#FF6600', textShadow:'0 0 50px rgba(255,102,0,0.65), 0 0 100px rgba(255,102,0,0.2)' }}>
          NERV
        </h1>
        <p style={{ ...NF, fontSize:14, color:'rgba(255,255,255,0.65)', letterSpacing:'0.35em', marginTop:6 }}>
          SYNC RATE:{' '}
          <span style={{ color:'#00FF41', fontWeight:700 }}>{syncPct}%</span>
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div className="relative z-20" style={{ marginTop:20, width:280 }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}>
        <div style={{ width:'100%', height:3, background:'rgba(123,47,190,0.2)', overflow:'hidden' }}>
          <motion.div style={{ height:'100%', background:'linear-gradient(90deg,#7B2FBE,#00FF41)' }}
            initial={{ width:'0%' }} animate={{ width:'100%' }}
            transition={{ delay:1.15, duration:2.6, ease:'easeOut' }} />
        </div>
      </motion.div>

      {/* Pilot ID */}
      <motion.p className="relative z-20"
        style={{ ...NF, fontSize:13, color:'rgba(255,255,255,0.65)', letterSpacing:'0.22em', marginTop:16 }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}>
        PILOT ID: <span style={{ color:'rgba(0,255,65,0.85)' }}>houstonhrvy</span>
      </motion.p>

      {/* Boot log */}
      <div className="relative z-20" style={{ marginTop:20, width:340, minHeight:80 }}>
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.p key={i}
              initial={{ opacity:0, x:-10 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:0.3 }}
              style={{ ...NF, fontSize:11, color:'rgba(0,255,65,0.75)', letterSpacing:'0.08em', marginBottom:4 }}>
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
