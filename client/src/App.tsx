import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
      </Routes>
    </AnimatePresence>
  )
}
