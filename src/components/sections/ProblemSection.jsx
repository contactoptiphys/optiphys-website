import React from 'react'
import Card from '../ui/Card'
import Icon from '../ui/Icon'

const problemCards = [
  {
    id: 1,
    icon: 'forum',
    iconColor: '#ffb4ab',
    title: 'Answering Same Questions',
    description: 'Endless loops of repetitive customer inquiries draining support resources.',
  },
  {
    id: 2,
    icon: 'keyboard',
    iconColor: '#ffb4ab',
    title: 'Manual Data Entry',
    description: 'Copy-pasting data between CRMs, sheets, and marketing platforms.',
  },
  {
    id: 3,
    icon: 'notification_important',
    iconColor: '#ffb4ab',
    title: 'Missed Follow-ups',
    description: 'Leads slipping through the cracks due to forgotten manual outreach.',
  },
  {
    id: 4,
    icon: 'sync_problem',
    iconColor: '#ffb4ab',
    title: 'Disconnected Tools',
    description: 'Software stack that doesn\'t communicate, creating data silos.',
  },
  {
    id: 5,
    icon: 'hourglass_empty',
    iconColor: '#ffb4ab',
    title: 'Slow Response Times',
    description: 'Delayed reactions to critical business events affecting customer satisfaction.',
  },
  {
    id: 6,
    icon: 'analytics',
    iconColor: '#ffb4ab',
    title: 'Inaccurate Reporting',
    description: 'Decisions based on outdated or manually compiled, error-prone data.',
  },
]

const ProblemSection = () => {
  return (
    <section
      id="problems"
      className="py-16 md:py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
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
          <Card key={card.id}>
            <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-4 border border-white/10 group-hover:border-accent-blue/30 transition-colors duration-300">
              <Icon name={card.icon} size={24} color={card.iconColor} />
            </div>
            <h3 className="font-headline text-headline-md text-on-surface mb-2">
              {card.title}
            </h3>
            <p className="font-body text-body-md text-on-surface-variant">
              {card.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ProblemSection