export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  liveLink?: string
  repoLink?: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  recipient: string
  date: string
  type: string
}

export interface TechItem {
  name: string
  abbr: string
  color: string
  bg: string
}

export const projects: Project[] = [
  {
    id: 'wanderwave',
    title: 'WanderWave Travel & Tours',
    description:
      'A travel and tours company website featuring tour packages, booking inquiries, and a modern responsive design.',
    longDescription:
      'WanderWave Travel and Tours is a full-featured travel company website designed to showcase tour packages and destinations across the Philippines. Built with a focus on conversion, user experience, and clean visual design to drive booking inquiries.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GoHighLevel'],
    features: [
      'Responsive multi-section landing page',
      'Tour package showcase with booking flow',
      'Modern design with brand-consistent UI',
    ],
    liveLink: 'https://wanderwaveph.com',
    repoLink: undefined,
  },
  {
    id: 'portfolio-website',
    title: 'Developer Portfolio',
    description:
      'A modern dark-themed portfolio website built with React, Vite, and Framer Motion animations.',
    longDescription:
      'A personal developer portfolio website featuring a physics-based lanyard card, typewriter animation, smooth scroll-triggered reveals, tabbed project showcase, and an interactive guestbook — built with Vite + React and a MongoDB-backed Express API.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB'],
    features: [
      'Physics-based interactive lanyard ID card',
      'Scroll-triggered animations and count-up stats',
      'MongoDB-backed guestbook and contact form',
    ],
    liveLink: undefined,
    repoLink: 'https://github.com/houstonhrvy',
  },
]

export const certificates: Certificate[] = [
  {
    id: 'cert-bsit-2024',
    title: 'Bachelor of Science in Information Technology',
    issuer: 'Our Lady of the Sacred Heart College of Olongapo',
    recipient: 'HOUSTON HARVEY SARMIENTO',
    date: '2024',
    type: 'Academic Degree',
  },
]

export const techStack: TechItem[] = [
  { name: 'React.js', abbr: 'Re', color: '#61DAFB', bg: '#0e2a35' },
  { name: 'TypeScript', abbr: 'TS', color: '#3178C6', bg: '#0d1f3c' },
  { name: 'Tailwind', abbr: 'Tw', color: '#38BDF8', bg: '#0c2030' },
  { name: 'Next.js', abbr: 'N', color: '#e0e0e0', bg: '#1a1a1a' },
  { name: 'HTML5', abbr: 'H5', color: '#E34F26', bg: '#2e1208' },
  { name: 'CSS3', abbr: 'CS', color: '#264DE4', bg: '#0d1530' },
  { name: 'JavaScript', abbr: 'JS', color: '#F7DF1E', bg: '#2d2900' },
  { name: 'PHP', abbr: 'PH', color: '#A855F7', bg: '#1d0b30' },
  { name: 'MySQL', abbr: 'My', color: '#4479A1', bg: '#0d1e2f' },
  { name: 'MongoDB', abbr: 'Mo', color: '#47A248', bg: '#0a1f0d' },
  { name: 'Express', abbr: 'Ex', color: '#e0e0e0', bg: '#1a1a1a' },
  { name: 'Node.js', abbr: 'No', color: '#339933', bg: '#0a1f0a' },
]

export const stats = { projects: 2, certificates: 1, completedWorks: 3 }
