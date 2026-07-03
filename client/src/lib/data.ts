export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  liveLink?: string
  repoLink?: string
  previewImage: string
  status: 'LIVE' | 'IN PROGRESS'
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
  icon: string
  category: string
  desc: string
}

export const projects: Project[] = [
  {
    id: 'wanderwave',
    title: 'WanderWave Travel & Tours',
    description:
      'A travel and tours company website featuring tour packages, booking inquiries, and a modern responsive design.',
    longDescription:
      'WanderWave Travel and Tours is a full-featured travel company website designed to showcase tour packages and destinations across the Philippines. Built with a focus on conversion, user experience, and clean visual design to drive booking inquiries — from the landing page down to the inquiry form.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GoHighLevel'],
    features: [
      'Responsive multi-section landing page',
      'Tour package showcase with booking flow',
      'Modern design with brand-consistent UI',
    ],
    liveLink: 'https://wanderwaveph.com',
    repoLink: undefined,
    previewImage: '/assets/projects/wanderwave.jpg',
    status: 'LIVE',
  },
  {
    id: 'telexph',
    title: 'Telex PH',
    description:
      'Corporate website for Telex PH, showcasing services, company information, and client engagement channels.',
    longDescription:
      'Telex PH is the company website built to represent the brand online — presenting its services, values, and contact channels in a clean, professional layout. Developed while working as a Web Developer at Telex PH, with a focus on performance, clarity, and a maintainable front end.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
    features: [
      'Company services and information pages',
      'Responsive layout across devices',
      'Optimized load performance and clean UI',
    ],
    liveLink: 'https://telexph.com',
    repoLink: undefined,
    previewImage: '/assets/projects/telexph.jpg',
    status: 'LIVE',
  },
  {
    id: 'hostops',
    title: 'HostOps',
    description:
      'A property and hosting operations platform designed to streamline management workflows for hosts.',
    longDescription:
      'HostOps is a platform built to help property hosts manage their operations more efficiently — bringing bookings, tasks, and property information together in one place. Designed with a focus on usability and a modern interface to simplify day-to-day hosting workflows.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    features: [
      'Centralized property operations dashboard',
      'Streamlined booking and task workflows',
      'Clean, modern responsive interface',
    ],
    liveLink: 'https://hostops.online',
    repoLink: undefined,
    previewImage: '/assets/projects/hostops.jpg',
    status: 'LIVE',
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

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SIMPLEICON = 'https://cdn.simpleicons.org'

export const techStack: TechItem[] = [
  { name: 'React.js', abbr: 'Re', color: '#61DAFB', bg: '#0e2a35', icon: `${DEVICON}/react/react-original.svg`,
    category: 'UI FRAMEWORK', desc: 'Component-based library for building reactive interfaces. Used across projects for dynamic, state-driven UIs.' },
  { name: 'TypeScript', abbr: 'TS', color: '#3178C6', bg: '#0d1f3c', icon: `${DEVICON}/typescript/typescript-original.svg`,
    category: 'TYPED SUPERSET', desc: 'Adds static typing to JavaScript, catching errors early and keeping larger codebases maintainable.' },
  { name: 'Tailwind', abbr: 'Tw', color: '#38BDF8', bg: '#0c2030', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
    category: 'CSS FRAMEWORK', desc: 'Utility-first styling used to compose responsive, consistent designs directly in markup.' },
  { name: 'Next.js', abbr: 'N', color: '#e0e0e0', bg: '#1a1a1a', icon: `${SIMPLEICON}/nextdotjs/ffffff`,
    category: 'REACT FRAMEWORK', desc: 'Adds routing, SSR, and production tooling on top of React for full applications.' },
  { name: 'HTML5', abbr: 'H5', color: '#E34F26', bg: '#2e1208', icon: `${DEVICON}/html5/html5-original.svg`,
    category: 'MARKUP LANGUAGE', desc: 'Semantic structure and accessibility foundation for every page built.' },
  { name: 'CSS3', abbr: 'CS', color: '#264DE4', bg: '#0d1530', icon: `${DEVICON}/css3/css3-original.svg`,
    category: 'STYLE LAYER', desc: 'Handles layout, responsiveness, and visual polish across all web projects.' },
  { name: 'JavaScript', abbr: 'JS', color: '#F7DF1E', bg: '#2d2900', icon: `${DEVICON}/javascript/javascript-original.svg`,
    category: 'SCRIPTING ENGINE', desc: 'Core language for client-side interactivity, DOM manipulation, and async logic.' },
  { name: 'PHP', abbr: 'PH', color: '#A855F7', bg: '#1d0b30', icon: `${DEVICON}/php/php-original.svg`,
    category: 'SERVER LANGUAGE', desc: 'Powers backend logic and dynamic pages for server-rendered sites like Telex PH.' },
  { name: 'MySQL', abbr: 'My', color: '#4479A1', bg: '#0d1e2f', icon: `${DEVICON}/mysql/mysql-original.svg`,
    category: 'RELATIONAL DB', desc: 'Structured, SQL-based storage for relational data with joins and transactions.' },
  { name: 'MongoDB', abbr: 'Mo', color: '#47A248', bg: '#0a1f0d', icon: `${DEVICON}/mongodb/mongodb-original.svg`,
    category: 'NOSQL DATABASE', desc: 'Flexible, document-based storage used for rapid iteration and JSON-shaped data.' },
  { name: 'Express', abbr: 'Ex', color: '#e0e0e0', bg: '#1a1a1a', icon: `${SIMPLEICON}/express/ffffff`,
    category: 'API FRAMEWORK', desc: 'Minimal Node.js framework for building REST APIs and backend services.' },
  { name: 'Node.js', abbr: 'No', color: '#339933', bg: '#0a1f0a', icon: `${DEVICON}/nodejs/nodejs-original.svg`,
    category: 'RUNTIME ENGINE', desc: 'Server-side JavaScript runtime enabling full-stack development with one language.' },
]

export const stats = { projects: 3, certificates: 1, completedWorks: 3 }
