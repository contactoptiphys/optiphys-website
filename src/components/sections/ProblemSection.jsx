import React, { useState } from 'react'
import Card from '../ui/Card'
import Icon from '../ui/Icon'

const problemCards = [
  {
    id: 1,
    icon: 'forum',
    iconColor: '#ffb4ab',
    title: 'Answering Same Questions',
    description: 'Endless loops of repetitive customer inquiries draining support resources.',
    solution: {
      heading: 'How We Solve It',
      bullets: [
        'AI-powered chatbots answer common customer questions 24/7',
        'Provide instant information about services, pricing, and availability',
        'Reduce repetitive support work so the team focuses on higher-value tasks',
      ],
    },
  },
  {
    id: 2,
    icon: 'keyboard',
    iconColor: '#ffb4ab',
    title: 'Manual Data Entry',
    description: 'Copy-pasting data between CRMs, sheets, and marketing platforms.',
    solution: {
      heading: 'How We Solve It',
      bullets: [
        'Automate data collection and transfer between forms, spreadsheets, and CRMs',
        'Capture information automatically and keep systems updated',
        'Reduce repetitive manual entry and eliminate human errors',
      ],
    },
  },
  {
    id: 3,
    icon: 'notification_important',
    iconColor: '#ffb4ab',
    title: 'Missed Follow-ups',
    description: 'Leads slipping through the cracks due to forgotten manual outreach.',
    solution: {
      heading: 'How We Solve It',
      bullets: [
        'Automatically capture new leads and organize their information',
        'Trigger notifications and reminders for the sales team',
        'Automate follow-up workflows so leads are less likely to be forgotten',
      ],
    },
  },
  {
    id: 4,
    icon: 'sync_problem',
    iconColor: '#ffb4ab',
    title: 'Disconnected Tools',
    description: 'Software stack that doesn\'t communicate, creating data silos.',
    solution: {
      heading: 'How We Solve It',
      bullets: [
        'Connect different tools and automate information flow between them',
        'Create workflows where an action in one system triggers another',
        'Reduce data silos and eliminate unnecessary manual transfers',
      ],
    },
  },
  {
    id: 5,
    icon: 'hourglass_empty',
    iconColor: '#ffb4ab',
    title: 'Slow Response Times',
    description: 'Delayed reactions to critical business events affecting customer satisfaction.',
    solution: {
      heading: 'How We Solve It',
      bullets: [
        'Automate repetitive responses and time-sensitive workflows',
        'Use AI chatbots and notifications to respond instantly',
        'Ensure important events trigger the right action without delay',
      ],
    },
  },
  {
    id: 6,
    icon: 'analytics',
    iconColor: '#ffb4ab',
    title: 'Inaccurate Reporting',
    description: 'Decisions based on outdated or manually compiled, error-prone data.',
    solution: {
      heading: 'How We Solve It',
      bullets: [
        'Automatically collect and organize data from relevant sources',
        'Keep reports updated through automated workflows',
        'Reduce manual data handling and improve reliability',
      ],
    },
  },
]

const ProblemCard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => setIsFlipped(!isFlipped)

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front">
          <Card className="h-full">
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-4 border border-white/10 group-hover:border-accent-blue/30 transition-colors duration-300 flex-shrink-0">
                <Icon name={card.icon} size={24} color={card.iconColor} />
              </div>
              <h3 className="font-headline text-headline-md text-on-surface mb-2">
                {card.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant flex-1">
                {card.description}
              </p>
              <div className="pt-3 border-t border-white/5 flex-shrink-0">
                <button
                  onClick={handleFlip}
                  className="font-label-sm text-label-sm text-accent-blue hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 rounded px-2 py-1 -ml-2"
                  aria-label={`Learn more about solving ${card.title}`}
                >
                  Learn More →
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Back Side */}
        <div className="flip-card-back">
          <Card className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center">
                  <Icon name="lightbulb" size={18} color="#adc6ff" />
                </div>
                <h3 className="font-headline text-headline-md text-on-surface">
                  {card.solution.heading}
                </h3>
              </div>
              <ul className="space-y-2 flex-1">
                {card.solution.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-accent-blue text-base flex-shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-white/5 flex-shrink-0">
                <button
                  onClick={handleFlip}
                  className="font-label-sm text-label-sm text-accent-blue hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 rounded px-2 py-1 -ml-2"
                  aria-label="Back to problem"
                >
                  ← Back to Problem
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

const ProblemSection = () => {
  return (
    <section
      id="problems"
      className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
          Your Team Shouldn't Spend Hours Doing Repetitive Work.
        </h2>
        <p className="font-body text-body-md text-on-surface-variant">
          The silent killers of productivity and growth.
        </p>
      </div>

      {/* Problem Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problemCards.map((card) => (
          <ProblemCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}

export default ProblemSection