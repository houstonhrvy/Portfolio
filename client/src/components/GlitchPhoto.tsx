import { motion } from 'framer-motion'

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 18
  const b = '2px solid rgba(0,255,65,0.7)'
  const style: React.CSSProperties = {
    position: 'absolute', width: size, height: size,
    borderTop:    (pos === 'tl' || pos === 'tr') ? b : 'none',
    borderBottom: (pos === 'bl' || pos === 'br') ? b : 'none',
    borderLeft:   (pos === 'tl' || pos === 'bl') ? b : 'none',
    borderRight:  (pos === 'tr' || pos === 'br') ? b : 'none',
    top:    (pos === 'tl' || pos === 'tr') ? -1 : 'auto',
    bottom: (pos === 'bl' || pos === 'br') ? -1 : 'auto',
    left:   (pos === 'tl' || pos === 'bl') ? -1 : 'auto',
    right:  (pos === 'tr' || pos === 'br') ? -1 : 'auto',
  }
  return <div style={style} />
}

export default function GlitchPhoto() {
  const W = 280, H = 370

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ position: 'relative', width: W, height: H, userSelect: 'none' }}
    >
      {/* Outer glow */}
      <div style={{
        position: 'absolute', inset: -8, borderRadius: 2,
        background: 'radial-gradient(ellipse at center, rgba(123,47,190,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Photo frame */}
      <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', border: '1px solid rgba(123,47,190,0.3)' }}>

        {/* ── BASE PHOTO ── */}
        <img
          src="/assets/me.jpeg"
          alt="Houston Harvey Sarmiento"
          className="glitch-base"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />

        {/* ── RED CHANNEL SHIFT ── */}
        <img
          src="/assets/me.jpeg"
          aria-hidden
          className="glitch-r"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            mixBlendMode: 'screen',
            filter: 'saturate(8) hue-rotate(-30deg) brightness(0.9)',
            opacity: 0,
          }}
        />

        {/* ── CYAN CHANNEL SHIFT ── */}
        <img
          src="/assets/me.jpeg"
          aria-hidden
          className="glitch-b"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            mixBlendMode: 'screen',
            filter: 'saturate(8) hue-rotate(150deg) brightness(0.85)',
            opacity: 0,
          }}
        />

        {/* ── CRT SCANLINES ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
        }} />

        {/* ── BOTTOM DARK FADE ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(4,0,10,0.95) 0%, rgba(4,0,10,0.6) 55%, transparent 100%)',
        }} />

        {/* ── NAME PLATE ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
          <p style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 7, color: '#FF6600', letterSpacing: '0.3em', marginBottom: 4, opacity: 0.8 }}>
            ◆ NERV // PERSONNEL
          </p>
          <p style={{ fontSize: 17, fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em', lineHeight: 1.15, marginBottom: 6 }}>
            HOUSTON H.<br />SARMIENTO
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 8, color: 'rgba(123,47,190,0.8)', letterSpacing: '0.2em' }}>
              WEB DEVELOPER
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#00FF41', boxShadow: '0 0 5px #00FF41', display: 'inline-block' }} />
            <span style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 8, color: '#00FF41', letterSpacing: '0.15em' }}>
              SYNCED
            </span>
          </div>
        </div>

        {/* ── HORIZONTAL SCAN TICK ── */}
        <motion.div
          style={{
            position: 'absolute', left: 0, right: 0, height: 1,
            background: 'linear-gradient(to right, transparent 0%, rgba(0,255,65,0.18) 30%, rgba(0,255,65,0.35) 50%, rgba(0,255,65,0.18) 70%, transparent 100%)',
            pointerEvents: 'none',
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />
      </div>

      {/* ── CORNER BRACKETS (outside frame) ── */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      {/* ── SIDE LABEL ── */}
      <div style={{
        position: 'absolute', top: '50%', right: -22,
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: '"Share Tech Mono", monospace', fontSize: 7,
        color: 'rgba(123,47,190,0.4)', letterSpacing: '0.3em', whiteSpace: 'nowrap',
      }}>
        ID:3A-HHS // UNIT-01
      </div>
    </motion.div>
  )
}
