import React from 'react'

const Icon = ({
  name,
  size = 24,
  className = '',
  color,
  stroke = 1.5,
  ...props
}) => {
  return (
    <span
      className={`material-symbols-outlined inline-flex items-center justify-center ${className}`}
      style={{
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        color: color || 'currentColor',
        fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        ...props.style,
      }}
      {...props}
    >
      {name}
    </span>
  )
}

export default Icon