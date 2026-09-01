import React from 'react'

/**
 * Radial glow effects that sit on top of the grid pattern
 * but behind all content. Each glow is tied to a corner/edge
 * of the viewport for visual balance.
 */
const BackgroundEffects = () => {
  return (
    <>
      {/* Top Glow Element */}
      <div
        className="fixed top-0 left-0 w-[800px] h-[800px] glow-bg pointer-events-none z-[-1]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom Glow Element */}
      <div
        className="fixed bottom-0 right-0 w-[1000px] h-[1000px] glow-bg pointer-events-none z-[-1]"
        style={{
          transform: 'translate(33%, 33%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary Glow - bottom left area */}
      <div
        className="fixed bottom-0 left-1/2 w-[600px] h-[600px] glow-bg pointer-events-none z-[-1] opacity-50"
        style={{
          transform: 'translate(-50%, 50%)',
        }}
        aria-hidden="true"
      />

      {/* Accent glow - right side mid */}
      <div
        className="fixed top-1/3 right-0 w-[500px] h-[500px] glow-bg pointer-events-none z-[-1] opacity-30"
        style={{
          transform: 'translate(50%, -50%)',
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default BackgroundEffects
