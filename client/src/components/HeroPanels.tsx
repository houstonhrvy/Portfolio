import { motion } from 'framer-motion'

const NERV_FONT: React.CSSProperties = { fontFamily: '"Share Tech Mono", monospace' }

function TerminalPanel({
  title, children, style, floatAmp = 6, floatDur = 5, delay = 0,
}: {
  title: string
  children: React.ReactNode
  style?: React.CSSProperties
  floatAmp?: number
  floatDur?: number
  delay?: number
}) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        background: 'rgba(4,0,10,0.90)',
        border: '1px solid rgba(123,47,190,0.38)',
        boxShadow: '0 0 24px rgba(123,47,190,0.1), 0 12px 40px rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        ...style,
      }}
      animate={{ y: [-floatAmp / 2, floatAmp / 2, -floatAmp / 2] }}
      transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {/* Title bar */}
      <div style={{
        padding: '5px 10px',
        borderBottom: '1px solid rgba(123,47,190,0.25)',
        background: 'rgba(123,47,190,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ ...NERV_FONT, fontSize: 7, color: '#FF6600', letterSpacing: '0.25em' }}>
          ◆ {title}
        </span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[0.5, 0.35, 0.2].map((op, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: `rgba(123,47,190,${op})` }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>{children}</div>
    </motion.div>
  )
}

function SkillBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ ...NERV_FONT, fontSize: 8, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>{label}</span>
        <span style={{ ...NERV_FONT, fontSize: 8, color: '#00FF41' }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(123,47,190,0.15)', overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #4B0082, #7B2FBE, #00FF41)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function StatusDot({ color }: { color: string }) {
  return (
    <motion.span
      style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: color, marginRight: 5, boxShadow: `0 0 5px ${color}` }}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function Row({ label, value, color = '#00FF41' }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: '1px solid rgba(123,47,190,0.08)' }}>
      <span style={{ ...NERV_FONT, fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em' }}>{label}</span>
      <span style={{ ...NERV_FONT, fontSize: 8, color, fontWeight: 'bold', letterSpacing: '0.1em' }}>{value}</span>
    </div>
  )
}

export default function HeroPanels() {
  return (
    <div style={{ position: 'relative', width: 340, height: 400 }}>

      {/* Subtle connector line between panels */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} opacity="0.12">
        <line x1="60" y1="90" x2="60" y2="200" stroke="#7B2FBE" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="60" y1="200" x2="120" y2="200" stroke="#7B2FBE" strokeWidth="1" strokeDasharray="4 6" />
      </svg>

      {/* Panel 1 — PILOT DATA (top left) */}
      <TerminalPanel title="PILOT.DATA" floatAmp={5} floatDur={4.5} delay={0}
        style={{ top: 0, left: 0, width: 200 }}>
        <div style={{ marginBottom: 8 }}>
          <p style={{ ...NERV_FONT, fontSize: 7, color: '#FF6600', opacity: 0.6, letterSpacing: '0.2em', marginBottom: 2 }}>DESIGNATION</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.2 }}>Houston H.<br />Sarmiento</p>
        </div>
        <Row label="ROLE" value="WEB DEV" />
        <Row label="BASE" value="TELEX PH" color="rgba(255,255,255,0.55)" />
        <Row label="CLASS" value="A-CLEARANCE" color="#7B2FBE" />
      </TerminalPanel>

      {/* Panel 2 — SKILL MATRIX (middle, offset right) */}
      <TerminalPanel title="SKILL.MATRIX" floatAmp={8} floatDur={6} delay={1}
        style={{ top: 110, right: 0, width: 220 }}>
        <SkillBar label="REACT.JS" pct={90} />
        <SkillBar label="TYPESCRIPT" pct={82} />
        <SkillBar label="NODE.JS" pct={75} />
        <SkillBar label="MONGODB" pct={65} />
      </TerminalPanel>

      {/* Panel 3 — SYSTEM STATUS (bottom left) */}
      <TerminalPanel title="SYSTEM.STATUS" floatAmp={4} floatDur={5.5} delay={2}
        style={{ bottom: 0, left: 20, width: 190 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <StatusDot color="#00BFFF" />
          <span style={{ ...NERV_FONT, fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em' }}>PATTERN</span>
          <span style={{ ...NERV_FONT, fontSize: 8, color: '#00BFFF', marginLeft: 'auto', letterSpacing: '0.1em' }}>BLUE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <StatusDot color="#00FF41" />
          <span style={{ ...NERV_FONT, fontSize: 8, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em' }}>AT FIELD</span>
          <span style={{ ...NERV_FONT, fontSize: 8, color: '#00FF41', marginLeft: 'auto', letterSpacing: '0.1em' }}>ACTIVE</span>
        </div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(123,47,190,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ ...NERV_FONT, fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>SYNC RATE</span>
            <span style={{ ...NERV_FONT, fontSize: 8, color: '#00FF41' }}>100%</span>
          </div>
          <div style={{ height: 3, background: 'rgba(0,255,65,0.08)' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, #4B0082, #00FF41)' }}
              initial={{ width: 0 }} animate={{ width: '100%' }}
              transition={{ duration: 1.4, delay: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </TerminalPanel>

    </div>
  )
}
