import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappNumber, whatsappMessage } from '../../config/constants'

const WhatsAppButton = () => {
  // WhatsApp click-to-chat URL with pre-filled message
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with OptiPhys on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[1030] flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:ring-offset-2 focus:ring-offset-background"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}

export default WhatsAppButton