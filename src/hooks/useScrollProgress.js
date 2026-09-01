import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Tracks which section is currently active and the user's scroll progress
 * through the page. Returns a stable object that only updates when values change.
 *
 * Usage:
 *   const { activeSection, sectionProgress, totalProgress, mouse } = useScrollProgress(sections)
 *
 * @param {Array<{id: string, ref: RefObject}>} sections - section id → ref mapping
 */
export function useScrollProgress(sections) {
  const [state, setState] = useState({
    activeSection: sections[0]?.id || null,
    sectionProgress: 0,
    totalProgress: 0,
    mouse: { x: 0.5, y: 0.5 },
  })

  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const stateRef = useRef(state)
  stateRef.current = state

  // Track mouse for subtle parallax.
  // - mouseRef always holds the latest value (no re-render on move).
  // - state.mouse is a throttled snapshot (~20fps) for components that prefer props.
  useEffect(() => {
    let lastUpdate = 0
    const handleMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      }
      const now = performance.now()
      if (now - lastUpdate > 50) {
        lastUpdate = now
        setState((prev) => {
          if (
            Math.abs(prev.mouse.x - mouseRef.current.x) < 0.01 &&
            Math.abs(prev.mouse.y - mouseRef.current.y) < 0.01
          ) {
            return prev
          }
          return { ...prev, mouse: { ...mouseRef.current } }
        })
      }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollY = window.scrollY
      const total = totalHeight > 0 ? scrollY / totalHeight : 0

      // Find active section among elements that exist in DOM
      let activeId = sections[0]?.id || null
      let activeProgress = 0

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i]
        const el = document.getElementById(item.domId || item.id)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const top = rect.top
        const height = el.offsetHeight

        // Section is active when its top edge is above viewport center
        if (top <= window.innerHeight * 0.5) {
          activeId = item.id
          const sectionTotal = top + height
          activeProgress = Math.max(
            0,
            Math.min(1, (window.innerHeight * 0.5 - top) / (sectionTotal || 1))
          )
          break
        }
      }

      const current = stateRef.current
      if (
        current.activeSection !== activeId ||
        Math.abs(current.sectionProgress - activeProgress) > 0.005 ||
        Math.abs(current.totalProgress - total) > 0.005
      ) {
        // Preserve existing mouse snapshot — we don't want scroll updates to overwrite
        // the (separately throttled) mouse state, which would create a new object identity
        // and trigger downstream re-renders on every scroll tick.
        setState((prev) => ({
          activeSection: activeId,
          sectionProgress: activeProgress,
          totalProgress: total,
          mouse: prev.mouse,
        }))
      }
    }

    handleScroll() // initialize
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sections])

  // Throttle: cap updates to ~30fps
  const throttledSetState = useCallback((updater) => {
    setState((prev) => updater(prev))
  }, [])

  return state
}

/**
 * Linear interpolation helper
 */
export const lerp = (a, b, t) => a + (b - a) * t

/**
 * Smooth step helper
 */
export const smoothstep = (edge0, edge1, x) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}
