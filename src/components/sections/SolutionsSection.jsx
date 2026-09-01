import React from 'react'
import Card from '../ui/Card'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { solutions } from '../../config/solutions'

const SolutionCard = ({ solution, onSelect }) => (
  <Card className="group relative overflow-hidden h-full flex flex-col">
    {/* Accent gradient overlay */}
    <div
      className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${solution.accent} pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}
      aria-hidden="true"
    />

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full">
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-surface border border-white/10 group-hover:border-accent-blue/30 transition-colors duration-300 flex items-center justify-center mb-6">
        <Icon name={solution.icon} size={28} color="#adc6ff" />
      </div>

      {/* Title & Description */}
      <h3 className="font-headline text-headline-md text-on-surface mb-3">
        {solution.title}
      </h3>
      <p className="font-body text-body-md text-on-surface-variant mb-6 leading-relaxed">
        {solution.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-6 mt-auto border-t border-white/5">
        {solution.metrics.map((metric, i) => (
          <div key={i}>
            <div className="font-headline text-headline-md text-accent-blue font-extrabold">
              {metric.value}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
)

const SolutionsSection = ({ onCtaClick }) => {
  return (
    <section
      id="solutions"
      className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="inline-block font-label-sm text-label-sm text-accent-blue uppercase tracking-widest mb-4">
          Solutions
        </span>
        <h2 className="font-headline text-headline-lg md:text-headline-xl text-on-surface mb-4">
          Tailored to Your Industry
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Pre-engineered playbooks we adapt to your stack. Each one ships with benchmarks, dashboards, and a dedicated success manager.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onCtaClick}>
          See If We Fit Your Stack
        </Button>
      </div>
    </section>
  )
}

export default SolutionsSection