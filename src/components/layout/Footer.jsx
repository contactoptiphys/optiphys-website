import React from 'react'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { footerLinks } from '../../config/footer'
import { scrollToId } from '../../hooks/useSmoothScroll'

const Footer = ({ onContact }) => {
  const handleLinkClick = (e, link) => {
    if (link.action === 'contact') {
      e.preventDefault()
      if (onContact) onContact()
      return
    }
    if (link.href && link.href.startsWith('#') && link.href.length > 1) {
      e.preventDefault()
      scrollToId(link.href.slice(1), 80)
    }
  }

  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 w-full pt-stack-lg pb-stack-md mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto mb-12">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="inline-block mb-4"
            aria-label="OptiPhys — back to top"
          >
            <Logo size={72} />
          </a>
          <p className="font-body text-body-md text-on-surface-variant max-w-sm mb-6">
            Engineering Sophisticated Efficiency. We transform chaotic operations into streamlined, automated systems.
          </p>
          {/* Social Links */}
          <div className="flex gap-3">
            {footerLinks.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-accent-blue hover:bg-surface-container-high transition-colors border border-white/5"
                aria-label={link.label}
              >
                <Icon name={link.icon} size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-label-sm text-label-sm text-on-surface mb-4">
            Navigation
          </h4>
          <ul className="space-y-2">
            {footerLinks.navigation.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href || '#'}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-label-sm text-label-sm text-on-surface mb-4">
            Legal
          </h4>
          <ul className="space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-margin-desktop max-w-container-max mx-auto text-center border-t border-white/5 pt-8">
        <p className="font-code text-code-sm text-on-surface-variant">
          © {new Date().getFullYear()} OptiPhys. Engineering Sophisticated Efficiency.
        </p>
      </div>
    </footer>
  )
}

export default Footer
