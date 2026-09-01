import { useCallback } from 'react'

export const useSmoothScroll = () => {
  const scrollTo = useCallback((id, offset = 80) => {
    const target = document.getElementById(id)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return scrollTo
}

export const scrollToId = (id, offset = 80) => {
  const target = document.getElementById(id)
  if (!target) return
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
