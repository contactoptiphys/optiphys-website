import React from 'react'

/**
 * OptiPhys logo — displays the company logo image with optional wordmark.
 *
 * @param {number} size - logo size in px (icon only)
 * @param {string} className - extra classes for the wrapper
 */
const Logo = ({ size = 64, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <img
        src="/optiphys-mark.png"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="flex-shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      <span className="relative font-headline font-semibold tracking-[-0.055em] text-on-surface"
        style={{ fontSize: Math.round(size * 0.5), lineHeight: 1 }}>
        <span className="relative inline-block">
          O<span aria-hidden="true" className="absolute" style={{ left: '50%', top: '0%', width: '2px', height: '100%', background: '#111318', transform: 'translateX(-50%)' }} />
        </span>ptiPhys
      </span>
    </div>
  )
}

export default Logo
