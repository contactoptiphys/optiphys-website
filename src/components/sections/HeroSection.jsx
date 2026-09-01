import React from 'react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { scrollToId } from '../../hooks/useSmoothScroll'

const HeroSection = () => {
  const handleExploreWorkflows = () => {
    scrollToId('what-we-automate', 80)
  }

  return (
    <section
      id="hero"
      className="relative pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center flex flex-col items-center"
    >
      {/* Title with gradient text */}
      <h1 className="font-headline text-headline-lg-mobile md:text-headline-xl max-w-4xl mx-auto mb-6 text-on-surface">
        Stop Wasting Time on Work Your{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-primary">
          Business Can Automate.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
        We build intelligent workflow engines that replace manual chaos with precise, automated systems. Focus on growth, not repetitive tasks.
      </p>

      {/* CTA Buttons */}
      <div className="flex justify-center mb-20">
        <Button variant="primary" size="lg" onClick={handleExploreWorkflows}>
          Explore Workflows
        </Button>
      </div>

      {/* Hero Transformation Diagram */}
      <div className="w-full max-w-5xl glass-panel rounded-xl p-8 relative overflow-hidden">
        {/* Decorative gradient overlay (replaces external image) */}
        <div
          className="absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25), transparent 70%)',
          }}
        />

        {/* Workflow lines (decorative) */}
        <div className="absolute top-1/2 left-0 w-full h-px workflow-line opacity-30" />

        {/* Diagram Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-64">
          {/* Manual Side */}
          <div className="flex-1 flex flex-col items-center opacity-70">
            <span className="font-label-sm text-label-sm text-on-surface-variant mb-4 tracking-widest uppercase">
              Manual Work
            </span>
            <div className="flex gap-4">
              <Icon name="description" size={32} color="#ffb4ab" />
              <Icon name="schedule" size={32} color="#ffb4ab" />
              <Icon name="warning" size={32} color="#ffb4ab" />
            </div>
          </div>

          {/* Engine */}
          <div className="flex-shrink-0 w-32 h-32 rounded-full border border-accent-blue/50 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-surface-dim">
            <div
              className="absolute inset-2 border border-accent-blue rounded-full animate-[spin_10s_linear_infinite] border-t-transparent"
              aria-hidden="true"
            />
            <span className="font-headline text-headline-md font-extrabold text-primary">
              FLOW
            </span>
          </div>

          {/* Automated Side */}
          <div className="flex-1 flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-primary mb-4 tracking-widest uppercase">
              Automated System
            </span>
            <div className="flex gap-4">
              <Icon name="check_circle" size={32} color="#adc6ff" />
              <Icon name="trending_up" size={32} color="#adc6ff" />
              <Icon name="bolt" size={32} color="#adc6ff" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection