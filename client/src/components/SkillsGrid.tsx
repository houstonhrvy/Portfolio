import { useState } from 'react'
import { motion } from 'framer-motion'

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SI  = 'https://cdn.simpleicons.org'

const SKILLS = [
  // Languages
  { name: 'HTML5',      src: `${CDN}/html5/html5-original.svg`,               color: '#E34F26' },
  { name: 'CSS3',       src: `${CDN}/css3/css3-original.svg`,                 color: '#1572B6' },
  { name: 'JavaScript', src: `${CDN}/javascript/javascript-original.svg`,     color: '#F7DF1E' },
  { name: 'TypeScript', src: `${CDN}/typescript/typescript-original.svg`,     color: '#3178C6' },
  { name: 'PHP',        src: `${CDN}/php/php-original.svg`,                   color: '#777BB4' },
  { name: 'Python',     src: `${CDN}/python/python-original.svg`,             color: '#3776AB' },
  { name: 'Java',       src: `${CDN}/java/java-original.svg`,                 color: '#ED8B00' },
  // Frameworks & Libraries
  { name: 'React',      src: `${CDN}/react/react-original.svg`,               color: '#61DAFB' },
  { name: 'Next.js',    src: `${SI}/nextdotjs/ffffff`,                        color: '#ffffff' },
  { name: 'Tailwind',   src: `${CDN}/tailwindcss/tailwindcss-original.svg`,   color: '#06B6D4' },
  { name: 'Node.js',    src: `${CDN}/nodejs/nodejs-original.svg`,             color: '#339933' },
  // Databases
  { name: 'MySQL',      src: `${CDN}/mysql/mysql-original.svg`,               color: '#4479A1' },
  { name: 'MongoDB',    src: `${CDN}/mongodb/mongodb-original.svg`,           color: '#47A248' },
  // Tools & Platforms
  { name: 'Git',        src: `${CDN}/git/git-original.svg`,                   color: '#F05032' },
  { name: 'GitHub',     src: `${SI}/github/ffffff`,                           color: '#ffffff' },
  { name: 'VS Code',    src: `${CDN}/vscode/vscode-original.svg`,             color: '#007ACC' },
  { name: 'Figma',      src: `${CDN}/figma/figma-original.svg`,               color: '#F24E1E' },
  { name: 'Postman',    src: `${CDN}/postman/postman-original.svg`,           color: '#FF6C37' },
  { name: 'Vite',       src: `${CDN}/vitejs/vitejs-original.svg`,             color: '#646CFF' },
  { name: 'Vercel',     src: `${SI}/vercel/ffffff`,                           color: '#ffffff' },
  { name: 'Netlify',    src: `${SI}/netlify/00C7B7`,                          color: '#00C7B7' },
  { name: 'Photoshop',  src: `${CDN}/photoshop/photoshop-original.svg`,       color: '#31A8FF' },
]

function SkillIcon({ name, src, color }: { name: string; src: string; color: string }) {
  const [active, setActive] = useState(false)

  return (
    <motion.div
      onClick={() => { setActive(true); setTimeout(() => setActive(false), 400) }}
      whileHover={{ y: -6, scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
      transition={{ duration: 0.15 }}
      className={`skill-icon${active ? ' skill-icon-active' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '10px 6px 8px',
        cursor: 'pointer',
        border: '1px solid rgba(123,47,190,0.18)',
        background: 'rgba(5,0,12,0.75)',
        borderRadius: 4,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        minWidth: 0,
        willChange: 'transform',
        ['--glow-color' as string]: color,
      }}
    >
      <img
        src={src}
        alt={name}
        width={32}
        height={32}
        loading="lazy"
        style={{ display: 'block', objectFit: 'contain' }}
        draggable={false}
      />
      <span style={{
        fontFamily: '"Share Tech Mono", monospace',
        fontSize: 7,
        color: 'rgba(255,255,255,0.38)',
        letterSpacing: '0.12em',
        textAlign: 'center',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </motion.div>
  )
}

export default function SkillsGrid() {
  return (
    <div style={{ width: '100%', maxWidth: 380 }}>
      {/* Header */}
      <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 7,
          color: '#FF6600',
          opacity: 0.7,
          letterSpacing: '0.3em',
        }}>
          ◆ TECH.STACK
        </span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(123,47,190,0.3), transparent)' }} />
        <span style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 7, color: 'rgba(0,255,65,0.5)', letterSpacing: '0.1em' }}>
          {SKILLS.length} MODULES
        </span>
      </div>

      {/* Grid — responsive columns */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1.5">
        {SKILLS.map((skill) => (
          <SkillIcon key={skill.name} {...skill} />
        ))}
      </div>

      {/* Footer hint */}
      <p style={{
        fontFamily: '"Share Tech Mono", monospace',
        fontSize: 7,
        color: 'rgba(255,255,255,0.18)',
        letterSpacing: '0.15em',
        marginTop: 10,
        textAlign: 'right',
      }}>
        HOVER OR CLICK TO INTERACT
      </p>
    </div>
  )
}
