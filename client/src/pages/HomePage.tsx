import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroScreen from '@/components/IntroScreen'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import PortfolioSection from '@/components/PortfolioSection'
import ContactSection from '@/components/ContactSection'
import ThirdImpact from '@/components/ThirdImpact'

const SECTIONS = ['home', 'about', 'portfolio', 'contact']

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (showIntro) return
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.45 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [showIntro])

  const handleNavClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(id)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}>
            <ThirdImpact />
            <Navbar activeSection={activeSection} onNavClick={handleNavClick} />
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
