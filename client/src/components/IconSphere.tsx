import { useEffect, useRef, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SI  = 'https://cdn.simpleicons.org'
const NF  = { fontFamily: '"Share Tech Mono",monospace' } as const

interface Skill { name: string; src: string; color: string; cat: string; desc: string }

const SKILLS: Skill[] = [
  { name: 'HTML5',      cat: 'MARKUP LANGUAGE',  color: '#E34F26', src: `${CDN}/html5/html5-original.svg`,             desc: 'Defines the structural skeleton of every web page. Semantic elements, document hierarchy, and accessibility all start here.' },
  { name: 'CSS3',       cat: 'STYLE LAYER',       color: '#1572B6', src: `${CDN}/css3/css3-original.svg`,               desc: 'Controls visual presentation — layout, animation, typography, and responsive design via flexbox, grid, and media queries.' },
  { name: 'JavaScript', cat: 'SCRIPTING ENGINE',  color: '#F7DF1E', src: `${CDN}/javascript/javascript-original.svg`,   desc: 'Core runtime of the web. Handles dynamic behavior, DOM manipulation, async operations, and all client-side logic.' },
  { name: 'TypeScript', cat: 'TYPED SUPERSET',    color: '#3178C6', src: `${CDN}/typescript/typescript-original.svg`,   desc: 'Adds static type checking to JavaScript. Catches errors at compile time, improves IDE support, and scales large codebases.' },
  { name: 'PHP',        cat: 'SERVER LANGUAGE',   color: '#777BB4', src: `${CDN}/php/php-original.svg`,                 desc: 'Server-side scripting language powering backend logic, templating, and database communication for dynamic web apps.' },
  { name: 'Python',     cat: 'GENERAL PURPOSE',   color: '#3776AB', src: `${CDN}/python/python-original.svg`,           desc: 'Used for backend development, automation scripts, data processing, and rapid prototyping with minimal syntax overhead.' },
  { name: 'Java',       cat: 'OOP LANGUAGE',      color: '#ED8B00', src: `${CDN}/java/java-original.svg`,               desc: 'Object-oriented language built for scalable enterprise applications. Powers backend services, REST APIs, and Android apps.' },
  { name: 'React',      cat: 'UI FRAMEWORK',      color: '#61DAFB', src: `${CDN}/react/react-original.svg`,             desc: 'Component-based library for building reactive UIs. Virtual DOM diffing ensures only changed nodes re-render for speed.' },
  { name: 'Next.js',    cat: 'REACT FRAMEWORK',   color: '#aaaaaa', src: `${SI}/nextdotjs/aaaaaa`,                      desc: 'Adds SSR, SSG, file-based routing, and API routes to React. Industry standard for production-ready web applications.' },
  { name: 'Tailwind',   cat: 'CSS FRAMEWORK',     color: '#06B6D4', src: `${CDN}/tailwindcss/tailwindcss-original.svg`, desc: 'Utility-first CSS framework. Compose complex designs directly in markup without writing custom stylesheets.' },
  { name: 'Node.js',    cat: 'RUNTIME ENGINE',    color: '#339933', src: `${CDN}/nodejs/nodejs-original.svg`,           desc: 'JavaScript runtime on the server side. Enables full-stack JS development, REST APIs, real-time apps, and microservices.' },
  { name: 'MySQL',      cat: 'RELATIONAL DB',     color: '#4479A1', src: `${CDN}/mysql/mysql-original.svg`,             desc: 'SQL-based relational database. Stores structured data with ACID compliance, joins, indexing, and transaction support.' },
  { name: 'MongoDB',    cat: 'NOSQL DATABASE',    color: '#47A248', src: `${CDN}/mongodb/mongodb-original.svg`,         desc: 'Document-oriented NoSQL database. Stores data as JSON-like BSON documents — flexible schema for rapid development.' },
  { name: 'Git',        cat: 'VERSION CONTROL',   color: '#F05032', src: `${CDN}/git/git-original.svg`,                 desc: 'Distributed version control system. Tracks all changes, enables branching strategies, and coordinates team collaboration.' },
  { name: 'GitHub',     cat: 'CODE HOSTING',      color: '#aaaaaa', src: `${SI}/github/aaaaaa`,                         desc: 'Cloud platform for Git repositories. Pull requests, CI/CD pipelines, issue tracking, and open-source collaboration hub.' },
  { name: 'VS Code',    cat: 'CODE EDITOR',       color: '#007ACC', src: `${CDN}/vscode/vscode-original.svg`,           desc: 'Primary development environment. Extensions, IntelliSense, integrated terminal, debugger, and built-in Git support.' },
  { name: 'Figma',      cat: 'DESIGN TOOL',       color: '#F24E1E', src: `${CDN}/figma/figma-original.svg`,             desc: 'Browser-based UI/UX design tool. Creates wireframes, mockups, and interactive prototypes for web and mobile interfaces.' },
  { name: 'Postman',    cat: 'API PLATFORM',      color: '#FF6C37', src: `${CDN}/postman/postman-original.svg`,         desc: 'Tests and documents REST, GraphQL, and SOAP APIs. Automates request sequences and validates response contracts.' },
  { name: 'Vite',       cat: 'BUILD TOOL',        color: '#646CFF', src: `${CDN}/vitejs/vitejs-original.svg`,           desc: 'Next-generation frontend build tool. Instant HMR via native ES modules and optimized Rollup bundling for production.' },
  { name: 'Vercel',     cat: 'DEPLOY PLATFORM',   color: '#aaaaaa', src: `${SI}/vercel/aaaaaa`,                         desc: 'Zero-config deployment platform for frontend frameworks. Edge network, preview deployments, and serverless functions.' },
  { name: 'Netlify',    cat: 'JAMSTACK HOST',     color: '#00C7B7', src: `${SI}/netlify/00C7B7`,                        desc: 'JAMstack hosting with CI/CD integration. Auto-deploys from Git, handles forms, identity, and edge function routing.' },
  { name: 'Adobe',      cat: 'CREATIVE SUITE',    color: '#FF0000', src: `${SI}/adobe/FF0000`,                          desc: 'Industry-standard creative tools — Photoshop for image editing, Illustrator for vector graphics and asset production.' },
]

function fibonacciSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  const ga = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const t = ga * i
    pts.push([r * Math.cos(t), y, r * Math.sin(t)])
  }
  return pts
}

function rot([x, y, z]: [number, number, number], rx: number, ry: number): [number, number, number] {
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const x1 = x * cy + z * sy, z1 = -x * sy + z * cy
  const cx = Math.cos(rx), sx = Math.sin(rx)
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx]
}

function hexPts(cx: number, cy: number, r: number, deg = 0): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + (deg * Math.PI) / 180
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
}

function HudCorner({ pos, label, value, alert }: { pos: 'tl'|'tr'|'bl'|'br'; label: string; value?: string; alert?: boolean }) {
  const isTop = pos[0] === 't', isLeft = pos[1] === 'l'
  const col = alert ? 'rgba(255,30,0,0.7)' : 'rgba(0,255,65,0.5)'
  const b = `1px solid ${col}`
  return (
    <div style={{ position:'absolute', top:isTop?4:'auto', bottom:!isTop?4:'auto', left:isLeft?4:'auto', right:!isLeft?4:'auto', pointerEvents:'none', display:'flex', flexDirection:isTop?'column':'column-reverse', alignItems:isLeft?'flex-start':'flex-end', gap:2, zIndex:10 }}>
      <div style={{ width:10, height:10, borderTop:isTop?b:'none', borderBottom:!isTop?b:'none', borderLeft:isLeft?b:'none', borderRight:!isLeft?b:'none' }} />
      <div style={{ ...NF, fontSize:6, lineHeight:1.4, textAlign:isLeft?'left':'right' }}>
        <div style={{ color:'rgba(255,255,255,0.3)', letterSpacing:'0.15em' }}>{label}</div>
        {value && <div style={{ color:alert?'#FF3030':'#00FF41', fontWeight:700, letterSpacing:'0.1em' }}>{value}</div>}
      </div>
    </div>
  )
}

export default function IconSphere() {
  const stageRef    = useRef<HTMLDivElement>(null)
  const itemRefs    = useRef<(HTMLDivElement | null)[]>([])
  const sizeRef     = useRef(0)
  const rotX        = useRef(0.3)
  const rotY        = useRef(0)
  const velX        = useRef(0)
  const velY        = useRef(0)
  const dragging    = useRef(false)
  const lastPos     = useRef({ x: 0, y: 0 })
  const hoveredIdx  = useRef(-1)
  const hoveredPos  = useRef({ x: 0, y: 0 })   // projected 2D pos when hover started
  const hoveredHitR = useRef(0)                  // hit radius at hover start
  const rafRef      = useRef<number>()

  const curS = useRef(SKILLS.map(() => 0.5))
  const curA = useRef(SKILLS.map(() => 0.5))

  const [sync,    setSync]    = useState(97)
  const [alert,   setAlert]   = useState(false)
  const [tooltip, setTooltip] = useState<Skill | null>(null)

  const base = useMemo(() => fibonacciSphere(SKILLS.length), [])

  useEffect(() => {
    const iv = setInterval(() => setSync(s => Math.min(100, Math.max(84, Math.round(s + (Math.random() - 0.48) * 3)))), 900)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => { setAlert(true); setTimeout(() => setAlert(false), 2200) }, 14000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const stage = stageRef.current; if (!stage) return
    const upd = () => { sizeRef.current = stage.clientWidth }
    upd(); const ro = new ResizeObserver(upd); ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  /* ── RAF loop ── */
  useEffect(() => {
    const frame = () => {
      const R = sizeRef.current * 0.41
      const hov = hoveredIdx.current
      const anyHov = hov !== -1

      if (!dragging.current && !anyHov) {
        velX.current *= 0.93; velY.current *= 0.93
        rotX.current += velX.current
        rotY.current += velY.current + 0.012
      }

      base.forEach(([x, y, z], i) => {
        const [rx, ry, rz] = rot([x, y, z], rotX.current, rotY.current)
        const depth = (rz + 1) / 2
        const bS    = 0.28 + depth * 0.9
        const bA    = Math.max(0.08, 0.12 + depth * 0.88)
        const isHov = hov === i

        // Hovered icon fades out at orbit pos — left overlay shows the big version
        const tS = isHov ? 0.04 : anyHov ? bS * 0.35 : bS
        const tA = isHov ? 0    : anyHov ? Math.max(0.025, bA * 0.1) : bA

        curS.current[i] += (tS - curS.current[i]) * 0.055
        curA.current[i] += (tA - curA.current[i]) * 0.055

        const el = itemRefs.current[i]
        if (!el) return
        el.style.transform = `translate(${rx * R}px,${ry * R}px) translate(-50%,-50%) scale(${curS.current[i]})`
        el.style.opacity   = String(Math.max(0, curA.current[i]))
        el.style.zIndex    = String(Math.round(depth * 100))
        el.style.filter    = (!anyHov && depth > 0.6) ? `drop-shadow(0 0 4px ${SKILLS[i].color}55)` : 'none'
      })

      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [base])

  /* ── Stage-level hover with hysteresis — prevents flicker when mouse moves ── */
  function onStageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (dragging.current) return
    const rect = stageRef.current!.getBoundingClientRect()
    const mx = e.clientX - rect.left - rect.width  / 2
    const my = e.clientY - rect.top  - rect.height / 2
    const R  = sizeRef.current * 0.41

    // Hysteresis: keep current hover until mouse exits a 2× sticky radius
    const hov = hoveredIdx.current
    if (hov !== -1) {
      const dist = Math.hypot(mx - hoveredPos.current.x, my - hoveredPos.current.y)
      if (dist < hoveredHitR.current * 2.0) return   // still inside sticky zone
    }

    let best = -1, bestDist = Infinity, bestPx = 0, bestPy = 0, bestHR = 0
    base.forEach(([x, y, z], i) => {
      const [rx, ry, rz] = rot([x, y, z], rotX.current, rotY.current)
      if (rz < -0.05) return
      const scale = 0.28 + ((rz + 1) / 2) * 0.9
      const hitR  = 80 * scale * 0.68
      const dist  = Math.hypot(mx - rx * R, my - ry * R)
      if (dist < bestDist && dist < hitR) {
        bestDist = dist; best = i
        bestPx = rx * R; bestPy = ry * R; bestHR = hitR
      }
    })

    if (best !== hoveredIdx.current) {
      hoveredIdx.current = best
      if (best !== -1) { hoveredPos.current = { x: bestPx, y: bestPy }; hoveredHitR.current = bestHR }
      setTooltip(best >= 0 ? SKILLS[best] : null)
    }
  }

  function onStageMouseLeave() {
    hoveredIdx.current = -1
    setTooltip(null)
  }

  /* ── Drag ── */
  useEffect(() => {
    const stage = stageRef.current; if (!stage) return
    const dn = (e: MouseEvent) => { if (hoveredIdx.current !== -1) return; dragging.current=true; velX.current=velY.current=0; lastPos.current={x:e.clientX,y:e.clientY}; stage.style.cursor='grabbing' }
    const mv = (e: MouseEvent) => {
      if (!dragging.current) return
      const dx=e.clientX-lastPos.current.x, dy=e.clientY-lastPos.current.y
      rotY.current+=dx*0.005; rotX.current+=dy*0.005; velY.current=dx*0.004; velX.current=dy*0.004
      lastPos.current={x:e.clientX,y:e.clientY}
    }
    const up = () => { dragging.current=false; stage.style.cursor='grab' }
    const ts = (e: TouchEvent) => { if (hoveredIdx.current !== -1) return; dragging.current=true; velX.current=velY.current=0; lastPos.current={x:e.touches[0].clientX,y:e.touches[0].clientY} }
    const tm = (e: TouchEvent) => {
      if (!dragging.current) return; e.preventDefault()
      const dx=e.touches[0].clientX-lastPos.current.x, dy=e.touches[0].clientY-lastPos.current.y
      rotY.current+=dx*0.005; rotX.current+=dy*0.005; velY.current=dx*0.004; velX.current=dy*0.004
      lastPos.current={x:e.touches[0].clientX,y:e.touches[0].clientY}
    }
    const te = () => { dragging.current=false }
    stage.addEventListener('mousedown',dn); window.addEventListener('mousemove',mv); window.addEventListener('mouseup',up)
    stage.addEventListener('touchstart',ts,{passive:false}); stage.addEventListener('touchmove',tm,{passive:false}); stage.addEventListener('touchend',te)
    return () => {
      stage.removeEventListener('mousedown',dn); window.removeEventListener('mousemove',mv); window.removeEventListener('mouseup',up)
      stage.removeEventListener('touchstart',ts); stage.removeEventListener('touchmove',tm); stage.removeEventListener('touchend',te)
    }
  }, [])

  return (
    <div style={{ width:'100%', maxWidth:460 }}>

      {/* Header */}
      <div style={{ marginBottom:8, display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ ...NF, fontSize:7, color:'#FF6600', opacity:0.8, letterSpacing:'0.3em' }}>◆ TECH.STACK</span>
        <div style={{ flex:1, height:1, background:'linear-gradient(to right,rgba(123,47,190,0.35),transparent)' }} />
        <span style={{ ...NF, fontSize:7 }}>
          <span style={{ color:'rgba(255,255,255,0.35)' }}>SYNC </span>
          <span style={{ color:sync>=95?'#00FF41':sync>=88?'#FFB800':'#FF4444' }}>{sync}%</span>
        </span>
      </div>

      {/* ── Sphere stage ── */}
      <div ref={stageRef} onMouseMove={onStageMouseMove} onMouseLeave={onStageMouseLeave}
        style={{ position:'relative', width:'100%', aspectRatio:'1', cursor:'grab', userSelect:'none', WebkitUserSelect:'none', outline:alert?'1px solid rgba(255,30,0,0.55)':'1px solid rgba(123,47,190,0.08)', transition:'outline-color 0.2s' }}>

        {/* AT Field hexagons */}
        <svg className="at-field-hex" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <polygon points={hexPts(50,50,43,0)}  fill="none" stroke="rgba(255,140,0,0.11)"   strokeWidth="0.5" />
          <polygon points={hexPts(50,50,32,15)} fill="none" stroke="rgba(123,47,190,0.17)"  strokeWidth="0.4" />
          <polygon points={hexPts(50,50,20,0)}  fill="none" stroke="rgba(0,255,65,0.11)"    strokeWidth="0.35" />
          <ellipse cx="50" cy="50" rx="41" ry="11" stroke="rgba(123,47,190,0.09)" strokeWidth="0.3" fill="none" />
          <ellipse cx="50" cy="50" rx="11" ry="41" stroke="rgba(0,255,65,0.05)"   strokeWidth="0.3" fill="none" />
          <circle  cx="50" cy="50" r="41"          stroke="rgba(123,47,190,0.05)" strokeWidth="0.3" fill="none" strokeDasharray="1.5 3" />
          {[0,60,120].map((ang,k) => { const a=(ang*Math.PI)/180,c=Math.cos(a),s=Math.sin(a); return <line key={k} x1={50-41*c} y1={50-41*s} x2={50+41*c} y2={50+41*s} stroke="rgba(123,47,190,0.05)" strokeWidth="0.3" /> })}
        </svg>

        {/* Radar sweeps */}
        <div style={{ position:'absolute', top:'9%', left:'9%', right:'9%', bottom:'9%', borderRadius:'50%', overflow:'hidden', pointerEvents:'none' }}>
          <div className="eva-radar-sweep" style={{ position:'absolute', inset:0, background:'conic-gradient(from 0deg,transparent,rgba(0,255,65,0.12) 45deg,transparent 65deg)' }} />
        </div>
        <div style={{ position:'absolute', top:'9%', left:'9%', right:'9%', bottom:'9%', borderRadius:'50%', overflow:'hidden', pointerEvents:'none' }}>
          <div className="eva-radar-sweep-slow" style={{ position:'absolute', inset:0, background:'conic-gradient(from 180deg,transparent,rgba(255,140,0,0.07) 30deg,transparent 55deg)' }} />
        </div>

        {/* Energy core */}
        <div className="eva-core-pulse" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'16%', height:'16%', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,65,0.22) 0%,rgba(123,47,190,0.15) 50%,transparent 70%)', pointerEvents:'none' }} />

        {/* HUD corners */}
        <HudCorner pos="tl" label="SCAN"     value="ACTIVE"                    alert={alert} />
        <HudCorner pos="tr" label="AT FIELD" value={alert?'BREACH':'STABLE'}   alert={alert} />
        <HudCorner pos="bl" label="PATTERN"  value={alert?'ORANGE':'BLUE'}     alert={alert} />
        <HudCorner pos="br" label={`${SKILLS.length} MOD`} value="LOADED" />

        {/* Angel alert */}
        {alert && <>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, pointerEvents:'none' }}>
            <div className="eva-alert-flash" style={{ ...NF, fontSize:9, color:'#FF1E1E', letterSpacing:'0.3em', textAlign:'center', lineHeight:1.6, textShadow:'0 0 12px #FF1E1E,0 0 24px #FF000080' }}>
              ⚠ ANGEL DETECTED<br/><span style={{ fontSize:7, color:'rgba(255,30,30,0.7)' }}>INITIATE COMBAT PROTOCOL</span>
            </div>
          </div>
          <div className="eva-alert-border" style={{ position:'absolute', inset:0, border:'2px solid rgba(255,30,0,0.5)', zIndex:201, pointerEvents:'none' }} />
        </>}

        {/* ── Top-left: Big icon — top half, left half of sphere ── */}
        <AnimatePresence mode="sync">
          {tooltip && (
            <motion.div key={`icon-${tooltip.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ position:'absolute', top:0, left:0, height:'50%', width:'52%', zIndex:600, pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,rgba(2,0,8,0.94) 55%,transparent)' }}>

              <div style={{ position:'absolute', width:'70%', aspectRatio:'1', borderRadius:'50%', background:`radial-gradient(circle,${tooltip.color}30 0%,transparent 70%)`, filter:'blur(16px)' }} />

              <img src={tooltip.src} alt={tooltip.name} draggable={false}
                style={{ width:96, height:96, objectFit:'contain', position:'relative', zIndex:1, filter:`drop-shadow(0 0 18px ${tooltip.color}) drop-shadow(0 0 44px ${tooltip.color}60)` }}
              />
              <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 8px' }}>
                <div style={{ ...NF, fontSize:13, color:'#fff', fontWeight:700, letterSpacing:'0.04em', textShadow:`0 0 14px ${tooltip.color}80`, lineHeight:1 }}>{tooltip.name}</div>
              </div>

              <div style={{ position:'absolute', top:8, left:8, width:12, height:12, borderTop:`1px solid ${tooltip.color}80`, borderLeft:`1px solid ${tooltip.color}80` }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom: Description panel slides up from inside sphere ── */}
        <AnimatePresence>
          {tooltip && (
            <motion.div key={`desc-${tooltip.name}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position:'absolute', bottom:0, left:0, right:0, height:'50%', zIndex:600, pointerEvents:'none', display:'flex', flexDirection:'column', overflow:'hidden', background:'rgba(2,0,8,0.96)', borderTop:`1px solid ${tooltip.color}40` }}>

              {/* Accent bar */}
              <div style={{ height:2, flexShrink:0, background:`linear-gradient(to right,${tooltip.color},${tooltip.color}40,transparent)` }} />

              {/* Header: icon + name + cat */}
              <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px 7px', flexShrink:0 }}>
                <img src={tooltip.src} alt={tooltip.name} draggable={false}
                  style={{ width:38, height:38, objectFit:'contain', flexShrink:0, filter:`drop-shadow(0 0 8px ${tooltip.color}cc)` }}
                />
                <div style={{ minWidth:0 }}>
                  <div style={{ ...NF, fontSize:7, color:tooltip.color, letterSpacing:'0.25em', marginBottom:3 }}>{tooltip.cat}</div>
                  <h3 style={{ ...NF, fontSize:18, color:'#fff', margin:0, lineHeight:1, letterSpacing:'0.02em', textShadow:`0 0 16px ${tooltip.color}70` }}>
                    {tooltip.name}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height:1, flexShrink:0, background:`linear-gradient(to right,${tooltip.color}55,transparent)`, margin:'0 14px' }} />

              {/* Description text */}
              <div style={{ padding:'8px 14px', flex:1, overflow:'hidden' }}>
                <p style={{ ...NF, fontSize:10.5, color:'rgba(255,255,255,0.7)', lineHeight:1.78, letterSpacing:'0.03em', margin:0 }}>
                  {tooltip.desc}
                </p>
              </div>

              {/* Status */}
              <div style={{ padding:'5px 14px 7px', flexShrink:0, borderTop:`1px solid ${tooltip.color}18`, display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:tooltip.color, display:'inline-block', flexShrink:0, boxShadow:`0 0 7px ${tooltip.color}` }} />
                <span style={{ ...NF, fontSize:8, color:tooltip.color, letterSpacing:'0.2em' }}>MODULE ACTIVE</span>
              </div>

              {/* Scanlines */}
              <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.055) 2px,rgba(0,0,0,0.055) 3px)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Orbit icons ── */}
        {SKILLS.map((skill, i) => (
          <div key={skill.name} ref={el => { itemRefs.current[i] = el }}
            onTouchStart={e => { e.stopPropagation(); hoveredIdx.current=i; hoveredPos.current={x:0,y:0}; hoveredHitR.current=999; setTooltip(skill) }}
            onTouchEnd={()  => { hoveredIdx.current=-1; setTooltip(null) }}
            style={{ position:'absolute', top:'50%', left:'50%', display:'flex', flexDirection:'column', alignItems:'center', gap:4, willChange:'transform,opacity', cursor:'pointer' }}>
            <img src={skill.src} alt={skill.name} draggable={false} loading="lazy"
              style={{ width:80, height:80, display:'block', objectFit:'contain', pointerEvents:'none' }} />
            <span style={{ ...NF, fontSize:7, color:'rgba(255,255,255,0.6)', letterSpacing:'0.08em', whiteSpace:'nowrap', lineHeight:1, pointerEvents:'none' }}>
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ marginTop:6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ ...NF, fontSize:6, color:'rgba(255,255,255,0.2)', letterSpacing:'0.15em' }}>DRAG · SPIN · HOVER</span>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ width:4, height:4, borderRadius:'50%', background:alert?'#FF1E1E':'#00FF41', display:'inline-block', boxShadow:`0 0 5px ${alert?'#FF1E1E':'#00FF41'}` }} />
          <span style={{ ...NF, fontSize:6, color:alert?'#FF1E1E':'rgba(0,255,65,0.6)', letterSpacing:'0.1em' }}>{alert?'ALERT':'OPERATIONAL'}</span>
        </div>
      </div>
    </div>
  )
}
