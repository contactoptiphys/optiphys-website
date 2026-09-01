import React, { useState, useCallback, useEffect, useRef, memo } from 'react'
import Card from '../ui/Card'
import Icon from '../ui/Icon'
import { automations } from '../../config/automations'
import { useService } from '../../context/ServiceContext'

// ─── Service Card ──────────────────────────────────────────────────────────

const ServiceCard = memo(function ServiceCard({ item }) {
  return (
    <Card className="w-full p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300">
      <div className="flex flex-col gap-5 md:gap-6">
        {/* Top row: icon + title */}
        <div className="flex items-start gap-4 md:gap-6">
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center flex-shrink-0"
            style={{ boxShadow: '0 0 30px rgba(59,130,246,0.18)' }}
          >
            <Icon name={item.icon} size={32} color="#3B82F6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-headline text-headline-md md:text-headline-lg text-on-surface leading-tight">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Simple explanation */}
        <p className="font-body text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
          {item.explanation}
        </p>

        {/* What we provide */}
        <div>
          <p className="font-label-sm text-label-sm text-accent-blue uppercase tracking-widest mb-3">
            What we provide
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {item.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 font-body text-body-md text-on-surface-variant"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container text-on-surface-variant border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
})

// ─── Chevron Button ────────────────────────────────────────────────────────

const ChevronButton = memo(function ChevronButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous service' : 'Next service'}
      className={`
        group relative flex-shrink-0
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
        rounded-full glass-panel
        flex items-center justify-center
        text-on-surface shadow-xl shadow-black/40
        cursor-pointer
        transition-all duration-200 ease-out
        hover:border-accent-blue hover:bg-white/10 hover:shadow-accent-blue/20 hover:scale-110
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-accent-blue/50
      `}
    >
      <Icon
        name={direction === 'left' ? 'arrow_back' : 'arrow_forward'}
        size={24}
        className="transition-transform duration-200 group-hover:scale-110"
      />
    </button>
  )
})

// ─── Counter (01 / 07) ─────────────────────────────────────────────────────

const Counter = memo(function Counter({ index, total, onSelect }) {
  const formatted = (n) => String(n).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-3 select-none" aria-live="polite">
      {/* Number Display */}
      <div className="font-label-sm text-label-sm tracking-widest">
        <span className="text-accent-blue font-semibold">{formatted(index + 1)}</span>
        <span className="text-on-surface-variant/50 mx-2">/</span>
        <span className="text-on-surface-variant">{formatted(total)}</span>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-6 bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
})

// ─── Section ───────────────────────────────────────────────────────────────

const AutomateSection = () => {
  const { activeIndex, total, goToNext, goToPrev } = useService()
  const [slideDirection, setSlideDirection] = useState('next')
  const [animKey, setAnimKey] = useState(0)
  const touchStartX = useRef(null)

  const handleNext = useCallback(() => {
    setSlideDirection('next')
    setAnimKey((prev) => prev + 1)
    goToNext()
  }, [goToNext])

  const handlePrev = useCallback(() => {
    setSlideDirection('prev')
    setAnimKey((prev) => prev + 1)
    goToPrev()
  }, [goToPrev])

  const handleSelectIndex = useCallback((targetIndex) => {
    if (targetIndex === activeIndex) return
    setSlideDirection(targetIndex > activeIndex ? 'next' : 'prev')
    setAnimKey((prev) => prev + 1)
    // We can navigate step by step or directly if supported
    const steps = (targetIndex - activeIndex + total) % total
    if (steps <= total / 2) {
      for (let i = 0; i < steps; i++) goToNext()
    } else {
      const backSteps = total - steps
      for (let i = 0; i < backSteps; i++) goToPrev()
    }
  }, [activeIndex, total, goToNext, goToPrev])

  // Touch Swipe Support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
    touchStartX.current = null
  }

  // Keyboard navigation
  useEffect(() => {
    const isTyping = (el) => {
      if (!el) return false
      const t = el.tagName
      return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || el.isContentEditable
    }
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      if (isTyping(e.target)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      e.preventDefault()
      if (e.key === 'ArrowRight') handleNext()
      else handlePrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev])

  const active = automations[activeIndex]

  return (
    <section className="pt-6 pb-16 md:pt-10 md:pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <span className="inline-block font-label-sm text-label-sm text-accent-blue uppercase tracking-widest mb-2 md:mb-3">
          What We Automate
        </span>
        <h2 className="font-headline text-headline-lg md:text-headline-xl text-on-surface mb-3 md:mb-4">
          Every Manual Process Is a Candidate for Automation
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We work across your entire stack — from CRM to finance to marketing ops. If a human does it twice, we automate it once.
        </p>
      </div>

      {/* Carousel Container — arrows centered at the middle on the sides */}
      <div
        className="relative max-w-4xl mx-auto px-4 sm:px-14 md:px-16 lg:px-20 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Chevron on the side, vertically centered */}
        <div className="absolute left-0 sm:left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
          <ChevronButton direction="left" onClick={handlePrev} />
        </div>

        {/* Card Stage */}
        <div className="relative w-full overflow-hidden rounded-xl">
          <div
            key={`${activeIndex}-${animKey}`}
            className={`w-full ${
              slideDirection === 'next'
                ? 'animate-slide-smooth-next'
                : 'animate-slide-smooth-prev'
            }`}
          >
            <ServiceCard item={active} />
          </div>
        </div>

        {/* Right Chevron on the side, vertically centered */}
        <div className="absolute right-0 sm:right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
          <ChevronButton direction="right" onClick={handleNext} />
        </div>
      </div>

      {/* Counter & Interactive Dots */}
      <div className="mt-6">
        <Counter index={activeIndex} total={total} onSelect={handleSelectIndex} />
      </div>

      <style>{`
        @keyframes slideSmoothNext {
          0% {
            opacity: 0;
            transform: translateX(42px) scale(0.98);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes slideSmoothPrev {
          0% {
            opacity: 0;
            transform: translateX(-42px) scale(0.98);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0px);
          }
        }

        .animate-slide-smooth-next {
          animation: slideSmoothNext 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }

        .animate-slide-smooth-prev {
          animation: slideSmoothPrev 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  )
}

export default AutomateSection


