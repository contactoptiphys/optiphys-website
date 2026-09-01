import React, { createContext, useContext, useState, useCallback } from 'react'
import { automations } from '../config/automations'

const ServiceContext = createContext(null)

export const ServiceProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = automations.length

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  return (
    <ServiceContext.Provider
      value={{ activeIndex, total, goToNext, goToPrev }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

export const useService = () => {
  const ctx = useContext(ServiceContext)
  if (!ctx) throw new Error('useService must be used within ServiceProvider')
  return ctx
}
