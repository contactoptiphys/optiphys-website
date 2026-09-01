import React, { useState, useEffect } from 'react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { navLinks } from '../../config/footer'
import { scrollToId } from '../../hooks/useSmoothScroll'

const Header = ({ onContactUs }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    scrollToId(id, 80)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactClick = () => {
    setMobileMenuOpen(false)
    if (onContactUs) onContactUs()
  }

  return (
    <nav
      className={`sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b transition-all duration-300 ${
        isScrolled ? 'border-white/10 shadow-md' : 'border-transparent'
      }`}
    >
      <div className="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto">
        {/* Logo */}
        <a
          href="#"
          onClick={handleLogoClick}
          aria-label="OptiPhys — back to top"
          className="flex items-center flex-shrink-0"
        >
          <Logo size={64} />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 px-3 py-2 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" size="md" onClick={handleContactClick}>
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-on-surface p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-surface/95 backdrop-blur-xl">
          <div className="px-margin-mobile py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="block font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5 px-3 py-2 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleContactClick}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
