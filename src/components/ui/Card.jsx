import React from 'react'

const Card = ({
  children,
  className = '',
  hover = true,
  onClick,
  ...props
}) => {
  const baseStyles = 'glass-panel p-6 rounded-xl'

  const hoverStyles = hover
    ? 'hover:border-accent-blue/50 transition-colors duration-300 group'
    : ''

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card