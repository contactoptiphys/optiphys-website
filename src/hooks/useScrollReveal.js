import { useEffect, useRef, useState } from 'react'

/**
 * Hook that observes when an element enters the viewport.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // Once visible, stay visible
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
