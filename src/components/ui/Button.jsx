import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-label-sm text-label-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue/50'

  const variants = {
    primary: 'bg-accent-blue text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95',
    secondary: 'glass-panel text-on-surface hover:bg-white/5 border-white/20 active:scale-95',
    ghost: 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 active:scale-95',
  }

  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button