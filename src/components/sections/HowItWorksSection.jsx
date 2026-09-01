import React from 'react'
import Icon from '../ui/Icon'
import { processSteps } from '../../config/automations'

const ProcessStep = ({ step, index, isLast }) => (
  <div className="relative flex flex-col items-center text-center md:text-left md:items-start">
    {/* Step number circle */}
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center border border-white/10 hover:border-accent-blue/40 transition-colors duration-300">
        <Icon name={step.icon} size={32} color="#3B82F6" />
      </div>
      {/* Step number badge */}
      <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-accent-blue flex items-center justify-center font-headline text-code-sm font-extrabold text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]">
        {step.step}
      </div>
    </div>

    {/* Title */}
    <h3 className="font-headline text-headline-md text-on-surface mb-3">
      {step.title}
    </h3>

    {/* Description */}
    <p className="font-body text-body-md text-on-surface-variant mb-4 leading-relaxed">
      {step.description}
    </p>

    {/* Bullets */}
    <ul className="space-y-2 self-stretch">
      {step.bullets.map((bullet, i) => (
        <li key={i} className="flex items-start gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-accent-blue text-lg flex-shrink-0 mt-0.5">
            check_circle
          </span>
          <span className="font-body text-body-md">{bullet}</span>
        </li>
      ))}
    </ul>

    {/* Connector line (desktop only) */}
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-full w-full h-px workflow-line -translate-x-12" />
    )}
  </div>
)

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="inline-block font-label-sm text-label-sm text-accent-blue uppercase tracking-widest mb-4">
          How It Works
        </span>
        <h2 className="font-headline text-headline-lg md:text-headline-xl text-on-surface mb-4">
          From Chaos to Engineered Output
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          A proven three-step engagement that turns manual operations into automated systems in weeks, not quarters.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 relative">
        {processSteps.map((step, index) => (
          <ProcessStep
            key={step.id}
            step={step}
            index={index}
            isLast={index === processSteps.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection