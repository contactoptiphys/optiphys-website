import React, { useEffect, useState, useRef, memo } from 'react'

// ─── Scene Definitions (one per service) ───────────────────────────────────
// Each scene defines 6 persistent "surfaces" with positions, sizes,
// opacities, and semantic kinds. Surfaces interpolate continuously
// between scenes so the background morphs rather than cuts.
// ─────────────────────────────────────────────────────────────────────────────

const blank = (x, y) => ({ x, y, w: 0, h: 0, o: 0, kind: 'card' })

// Scene 0 — AI Chatbots: message → AI core → responses
const SCENE_CHAT = [
  { x: 30,  y: 110, w: 230, h: 100, o: .75, kind: 'message' },
  { x: 30,  y: 370, w: 195, h: 80,  o: .58, kind: 'message' },
  { x: 400, y: 200, w: 200, h: 165, o: .85, kind: 'core' },
  { x: 740, y: 100, w: 210, h: 95,  o: .72, kind: 'response' },
  { x: 745, y: 390, w: 210, h: 95,  o: .70, kind: 'response' },
  blank(500, 520),
]

// Scene 1 — Lead Gen & CRM: inquiry → pipeline → CRM → notification
const SCENE_LEAD = [
  { x: 35,  y: 270, w: 175, h: 115, o: .72, kind: 'lead' },
  { x: 270, y: 270, w: 175, h: 115, o: .72, kind: 'lead' },
  { x: 505, y: 270, w: 175, h: 115, o: .80, kind: 'lead' },
  { x: 720, y: 270, w: 175, h: 115, o: .74, kind: 'lead' },
  { x: 880, y: 210, w: 100, h: 75,  o: .58, kind: 'notify' },
  blank(500, 520),
]

// Scene 2 — Business Process: one event → three parallel actions → notification
const SCENE_WORKFLOW = [
  { x: 420, y: 60,  w: 175, h: 95,  o: .78, kind: 'event' },
  { x: 80,  y: 420, w: 175, h: 95,  o: .66, kind: 'action' },
  { x: 415, y: 420, w: 175, h: 95,  o: .70, kind: 'action' },
  { x: 740, y: 420, w: 175, h: 95,  o: .66, kind: 'action' },
  { x: 415, y: 565, w: 175, h: 62,  o: .52, kind: 'notify' },
  blank(500, 250),
]

// Scene 3 — AI Content: idea → AI core → content pieces → schedule
const SCENE_CONTENT = [
  { x: 35,  y: 260, w: 195, h: 120, o: .72, kind: 'idea' },
  { x: 370, y: 235, w: 195, h: 155, o: .82, kind: 'core' },
  { x: 700, y: 55,  w: 210, h: 95,  o: .68, kind: 'content' },
  { x: 700, y: 220, w: 210, h: 95,  o: .74, kind: 'content' },
  { x: 700, y: 385, w: 210, h: 95,  o: .66, kind: 'content' },
  { x: 400, y: 535, w: 240, h: 60,  o: .58, kind: 'schedule' },
]

// Scene 4 — Data Extraction: document layers → extractor core → grid + table
const SCENE_DATA = [
  { x: 45,  y: 90,  w: 260, h: 135, o: .56, kind: 'document' },
  { x: 80,  y: 270, w: 260, h: 135, o: .68, kind: 'document' },
  { x: 115, y: 450, w: 260, h: 135, o: .56, kind: 'document' },
  { x: 490, y: 230, w: 140, h: 165, o: .80, kind: 'core' },
  { x: 730, y: 130, w: 210, h: 290, o: .80, kind: 'grid' },
  { x: 730, y: 470, w: 210, h: 55,  o: .46, kind: 'table' },
]

// Scene 5 — Email SPAM: email stream → filter → priority vs spam
const SCENE_EMAIL = [
  { x: 30,  y: 130, w: 230, h: 75,  o: .60, kind: 'email' },
  { x: 30,  y: 250, w: 230, h: 75,  o: .68, kind: 'email' },
  { x: 30,  y: 370, w: 230, h: 75,  o: .58, kind: 'email' },
  { x: 405, y: 220, w: 190, h: 170, o: .82, kind: 'filter' },
  { x: 720, y: 110, w: 215, h: 90,  o: .74, kind: 'priority' },
  { x: 720, y: 435, w: 215, h: 90,  o: .48, kind: 'spam' },
]

// Scene 6 — WhatsApp: message → response → lead → CRM → notifications
const SCENE_WHATSAPP = [
  { x: 55,  y: 150, w: 235, h: 82,  o: .72, kind: 'message' },
  { x: 140, y: 275, w: 235, h: 82,  o: .66, kind: 'response' },
  { x: 230, y: 400, w: 235, h: 82,  o: .74, kind: 'lead' },
  { x: 570, y: 280, w: 170, h: 115, o: .82, kind: 'lead' },
  { x: 800, y: 210, w: 130, h: 82,  o: .64, kind: 'notify' },
  { x: 800, y: 380, w: 130, h: 82,  o: .56, kind: 'lead' },
]

const SCENES = [
  SCENE_CHAT,
  SCENE_LEAD,
  SCENE_WORKFLOW,
  SCENE_CONTENT,
  SCENE_DATA,
  SCENE_EMAIL,
  SCENE_WHATSAPP,
]

// ─── Pure math helpers ─────────────────────────────────────────────────────────

const clamp = (v) => Math.min(1, Math.max(0, v))
const mix   = (a, b, p) => a + (b - a) * p

const interpolate = (from, to, p) => ({
  x:    mix(from.x, to.x, p),
  y:    mix(from.y, to.y, p),
  w:    mix(from.w, to.w, p),
  h:    mix(from.h, to.h, p),
  o:    mix(from.o, to.o, p),
  kind: p < 0.5 ? from.kind : to.kind,
})

const computeNodes = (timeline) => {
  const current  = Math.min(Math.floor(timeline), SCENES.length - 1)
  const next     = Math.min(current + 1, SCENES.length - 1)
  const progress = timeline - current
  return SCENES[current].map((node, i) => interpolate(node, SCENES[next][i], progress))
}

// ─── Memoized SVG primitives ────────────────────────────────────────────────

const Surface = memo(function Surface({ node }) {
  if (node.o < 0.01) return null

  const radius = node.kind === 'core' || node.kind === 'filter' ? 24 : 16
  const fill   = node.kind === 'spam' ? '#5c3038' : node.kind === 'priority' ? '#263f66' : '#1e293b'
  const accent = node.kind === 'spam' ? '#ffb4ab' : '#60a5fa'
  const isGrid = node.kind === 'grid' || node.kind === 'table'

  return (
    <g opacity={node.o}>
      <rect
        x={node.x} y={node.y}
        width={node.w} height={node.h}
        rx={radius}
        fill={fill}
        stroke={accent}
        strokeOpacity="0.55"
      />
      {(node.kind === 'core' || node.kind === 'filter') && (
        <circle
          cx={node.x + node.w / 2}
          cy={node.y + node.h / 2}
          r={Math.min(node.w, node.h) * 0.17}
          fill="none"
          stroke={accent}
          strokeWidth="4"
        />
      )}
      {Array.from({ length: isGrid ? 4 : 3 }).map((_, i) => (
        <line
          key={i}
          x1={node.x + node.w * 0.18}
          x2={node.x + node.w * (0.78 - (i % 2) * 0.1)}
          y1={node.y + node.h * (0.28 + i * 0.17)}
          y2={node.y + node.h * (0.28 + i * 0.17)}
          stroke={accent}
          strokeOpacity="0.34"
          strokeWidth={isGrid ? 3 : 5}
          strokeLinecap="round"
        />
      ))}
      {isGrid && Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={node.x + node.w * (0.2 + i * 0.18)}
          x2={node.x + node.w * (0.2 + i * 0.18)}
          y1={node.y + 16}
          y2={node.y + node.h - 16}
          stroke={accent}
          strokeOpacity="0.32"
          strokeWidth="3"
        />
      ))}
      <circle cx={node.x + 20} cy={node.y + 19} r="4" fill={accent} opacity="0.7" />
    </g>
  )
})

const Connector = memo(function Connector({ from, to, opacity }) {
  if (opacity < 0.02 || !from.w || !to.w) return null
  const x1    = from.x + from.w / 2, y1 = from.y + from.h / 2
  const x2    = to.x   + to.w   / 2, y2 = to.y   + to.h   / 2
  const curve = Math.max(40, Math.abs(x2 - x1) * 0.28)
  return (
    <path
      d={`M ${x1} ${y1} C ${x1 + curve} ${y1}, ${x2 - curve} ${y2}, ${x2} ${y2}`}
      fill="none"
      stroke="#60a5fa"
      strokeOpacity={opacity * 0.42}
      strokeWidth="3"
      strokeLinecap="round"
    />
  )
})

// ─── Main Component ──────────────────────────────────────────────────────────
//
// Architecture:
// - One rAF loop drives the scroll-derived `state` via setState.
// - State updates batch through React 18 (no manual batching needed).
// - The component is decoupled from the carousel — it only listens to scroll.
// - Surface / Connector are memoized so unchanged SVG nodes skip reconciliation.
//

export default function CinematicAnimation() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [state, setState] = useState({ timeline: 0, intro: 1, outro: 0 })

  // Reduced-motion preference
  useEffect(() => {
    const query  = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  // Scroll-driven rAF loop — runs from hero exit through the bottom of the page.
  useEffect(() => {
    let raf = null
    const setRef = { current: setState }

    const tick = () => {
      raf = null

      // Start = top of the document, so the timeline begins from the very first scroll.
      // End   = bottom of the document, so the animation runs all the way down.
      // Intro = 1 at the top (hero float visible) → 0 as the user scrolls into the page.
      const docEnd   = document.documentElement.scrollHeight - window.innerHeight
      const viewport = window.scrollY + window.innerHeight * 0.52
      const start    = 0
      const end      = Math.max(start + 1, docEnd)
      const introLen = window.innerHeight * 0.55

      const timeline = clamp((viewport - start) / Math.max(1, end - start)) * (SCENES.length - 1)
      const intro    = clamp(1 - viewport / Math.max(1, introLen))
      const outro    = clamp((viewport - (end - window.innerHeight * 0.38)) / Math.max(1, window.innerHeight * 0.62))

      setRef.current({ timeline, intro, outro })
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(tick)
    }

    // Initial paint + first tick
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const { timeline, intro, outro } = state
  const nodes   = computeNodes(reducedMotion ? 0 : timeline)
  const introOp = reducedMotion ? 0.55 : 0.15 + intro * 0.62
  const outroOp = reducedMotion ? 0    : outro * 0.68
  const overlay = intro > 0.15 ? 0.34 : outro > 0.15 ? 0.38 : 0.50

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="automation-haze" cx="50%" cy="45%" r="62%">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#111318" stopOpacity="0" />
          </radialGradient>
          <filter id="automation-soften">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Hero intro group */}
        <g className={intro > 0.02 && !reducedMotion ? 'automation-hero-float' : undefined}>
          <ellipse
            cx="500" cy="350" rx="460" ry="310"
            fill="url(#automation-haze)"
            filter="url(#automation-soften)"
          />
          <g opacity={introOp} fill="none" stroke="#60a5fa" strokeLinecap="round">
            <path d="M 18 160 C 180 160, 250 190, 405 295"  strokeWidth="4" strokeOpacity="0.52" />
            <path d="M 18 540 C 190 540, 265 500, 405 390"  strokeWidth="4" strokeOpacity="0.42" />
            <rect x="34" y="116" width="220" height="92"  rx="22" strokeWidth="3" strokeOpacity="0.45" />
            <rect x="34" y="492" width="196" height="78"  rx="20" strokeWidth="3" strokeOpacity="0.36" />
            <circle cx="500" cy="350" r="128" strokeWidth="2" strokeOpacity="0.26" />
          </g>

          {/* Service scene connectors */}
          <Connector from={nodes[0]} to={nodes[2]} opacity={(nodes[0].o + nodes[2].o) / 2} />
          <Connector from={nodes[1]} to={nodes[2]} opacity={(nodes[1].o + nodes[2].o) / 2} />
          <Connector from={nodes[2]} to={nodes[3]} opacity={(nodes[2].o + nodes[3].o) / 2} />
          <Connector from={nodes[3]} to={nodes[4]} opacity={(nodes[3].o + nodes[4].o) / 2} />
          <Connector from={nodes[3]} to={nodes[5]} opacity={(nodes[3].o + nodes[5].o) / 2} />

          {/* Service surfaces */}
          {nodes.map((node, i) => <Surface key={i} node={node} />)}
        </g>

        {/* Solutions outro */}
        <g opacity={outroOp} fill="none" stroke="#60a5fa" strokeLinecap="round">
          <path d="M 360 330 C 500 330, 600 330, 705 330 S 855 270, 952 270" strokeWidth="5" strokeOpacity="0.55" />
          <path d="M 705 330 C 795 330, 840 450, 952 450"                strokeWidth="4" strokeOpacity="0.38" />
          <rect x="735" y="112" width="216" height="102" rx="24"        strokeWidth="3" strokeOpacity="0.38" />
          <rect x="735" y="408" width="216" height="102" rx="24"        strokeWidth="3" strokeOpacity="0.34" />
          <circle cx="705" cy="330" r="108"                              strokeWidth="2" strokeOpacity="0.24" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            rgba(17,19,24,${overlay}) 0%,
            rgba(17,19,24,0.30) 50%,
            rgba(17,19,24,${Math.min(0.55, overlay + 0.06)}) 100%)`,
        }}
      />

      <style>{`
        @keyframes automationHeroFloat {
          0%, 100% { transform: translate3d(0, -7px, 0); }
          50%       { transform: translate3d(15px, 8px, 0); }
        }
        .automation-hero-float { animation: automationHeroFloat 4.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .automation-hero-float { animation: none; } }
      `}</style>
    </div>
  )
}
