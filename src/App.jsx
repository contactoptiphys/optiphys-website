import React, { lazy, Suspense, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProblemSection from './components/sections/ProblemSection'
import AutomateSection from './components/sections/AutomateSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import SolutionsSection from './components/sections/SolutionsSection'
import ContactPage from './components/sections/ContactPage'
import BackgroundEffects from './components/effects/BackgroundEffects'
import RevealSection from './hooks/RevealSection.jsx'
import { ServiceProvider } from './context/ServiceContext'

const CinematicAnimation = lazy(() =>
  import('./components/three/CinematicAnimation')
)

function LandingPage({ onContactUs }) {
  return (
    <>
      {/* Skip link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      {/* Layer 1: Cinematic scroll-driven animation (deepest, z-[-3]) */}
      <Suspense fallback={null}>
        <CinematicAnimation />
      </Suspense>

      {/* Layer 2: Radial glows + grid (z-[-1]) */}
      <BackgroundEffects />

      {/* Layer 3: Sticky Header (z-50) */}
      <Header onContactUs={onContactUs} />

      {/* Layer 4: Main Content (z-10) */}
      <main id="main-content" className="relative z-10" role="main">
        {/* Hero */}
        <HeroSection />

        {/* Problems */}
        <RevealSection id="problems">
          <ProblemSection />
        </RevealSection>

        {/* What We Automate — carousel */}
        <RevealSection id="what-we-automate">
          <AutomateSection />
        </RevealSection>

        {/* How It Works */}
        <RevealSection id="how-it-works">
          <HowItWorksSection />
        </RevealSection>

        {/* Solutions */}
        <RevealSection id="solutions">
          <SolutionsSection onCtaClick={onContactUs} />
        </RevealSection>
      </main>

      {/* Layer 5: Footer */}
      <Footer onContact={onContactUs} />

    </>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing' | 'contact'

  const handleContactUs = () => {
    setCurrentPage('contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToLanding = () => {
    setCurrentPage('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentPage === 'contact') {
    return (
      <>
        <Suspense fallback={null}>
          <CinematicAnimation />
        </Suspense>
        <BackgroundEffects />
        <ContactPage onBack={handleBackToLanding} />
      </>
    )
  }

  return (
    <ServiceProvider>
      <LandingPage onContactUs={handleContactUs} />
    </ServiceProvider>
  )
}

export default App
