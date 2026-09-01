# CLAUDE.md — OptiPhys Website

> **First-read this file for any new session.** All design decisions, file structure, and patterns are documented here so you can pick up where you left off.

---

## Project Overview

**OptiPhys** is a Business Automation Agency website. Built with **React 18 + Vite + Tailwind CSS**.

- **Theme**: Dark glassmorphism, Material Design 3 color tokens
- **Node**: ESM (`"type": "module"` in package.json)
- **Port**: Dev server runs on port 3000
- **Background**: Cinematic scroll-driven SVG animation system (no Three.js)

---

## File Structure

```
website/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Sticky nav, mobile menu, scroll detection
│   │   │   └── Footer.jsx       # 4-col grid, smooth hash nav
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx       # Title, subtitle, CTAs
│   │   │   ├── ProblemSection.jsx    # 6 pain-point bento cards
│   │   │   ├── AutomateSection.jsx   # Premium single-service carousel with smooth transitions
│   │   │   ├── HowItWorksSection.jsx # 3-step process with connectors
│   │   │   ├── SolutionsSection.jsx  # 4 solution cards with metrics
│   │   │   ├── ContactSection.jsx    # Validated form, success state
│   │   │   └── ContactPage.jsx       # Full-page contact form (SPA route)
│   │   ├── three/
│   │   │   └── CinematicAnimation.jsx  # Scroll-driven cinematic SVG animation
│   │   ├── ui/
│   │   │   ├── Button.jsx       # primary / secondary / ghost + sizes sm/md/lg
│   │   │   ├── Card.jsx         # Glass-panel wrapper with hover border
│   │   │   ├── Icon.jsx         # Material Symbols Outlined wrapper
│   │   │   └── Logo.jsx         # OptiPhys image logo + wordmark
│   │   └── effects/
│   │       └── BackgroundEffects.jsx  # Radial glows (CSS)
│   ├── context/
│   │   └── ServiceContext.jsx   # Carousel activeIndex + navigation (goToNext/goToPrev)
│   ├── config/
│   │   ├── constants.js         # Design tokens (colors, fonts, spacing)
│   │   ├── automations.js       # 7 automation categories + 3-step process
│   │   └── footer.js            # Nav links, legal, social
│   ├── hooks/
│   │   ├── useSmoothScroll.js   # scrollToId() utility
│   │   ├── useScrollReveal.js   # IntersectionObserver hook
│   │   ├── useScrollProgress.js # Scroll position + mouse + active section
│   │   └── RevealSection.jsx    # Scroll-fade-in wrapper component
│   ├── styles/
│   │   └── index.css            # Tailwind + glass-panel + grid-bg + glow-bg + animations
│   ├── App.jsx                  # Root — lazy-loads CinematicAnimation, renders all sections
│   └── main.jsx                 # React entry
├── tailwind.config.js           # Custom colors, fonts, spacing
├── postcss.config.js
├── vite.config.js
├── index.html                   # HTML template with SEO meta tags + Google Fonts CDN
└── package.json
```

---

## Design Tokens

### Colors (Tailwind class names)
| Token | Hex | Use |
|-------|-----|-----|
| `bg-background` / `bg-surface` | `#111318` | Page background |
| `bg-surface-container` | `#1e2025` | Cards, inputs |
| `bg-surface-container-low` | `#1a1b21` | Footer |
| `bg-surface-container-lowest` | `#0c0e13` | Footer bg |
| `text-on-surface` | `#e2e2e9` | Primary text |
| `text-on-surface-variant` | `#c2c6d6` | Secondary text |
| `bg-accent-blue` | `#3B82F6` | Primary CTA |
| `text-primary` | `#adc6ff` | Blue highlights |
| `text-error` | `#ffb4ab` | Error/warning icons |
| `border-white/10` | — | Subtle borders |

### Typography
- **Sora** (headlines): `font-headline` + `text-headline-{sm|md|lg|xl}`
- **Inter** (body): `font-body` + `text-body-{md|lg}`, `font-label`, `font-code`

### Spacing
- `px-margin-mobile` = 20px / `px-margin-desktop` = 48px
- `max-w-container-max` = 1280px
- `gap-gutter` = 24px / `pt-stack-lg` = 32px

### Custom CSS Classes (in `index.css`)
- `.glass-panel` — `rgba(30,41,59,0.4)` + `backdrop-filter: blur(32px)` + `border: 1px solid rgba(255,255,255,0.1)`
- `.grid-bg` — 64px grid pattern
- `.glow-bg` — radial blue gradient
- `.workflow-line` — horizontal gradient line

---

## Navigation

All links use `href="#section-id"` with `scrollToId()` for smooth scrolling. No react-router needed — single-page site.

| Link | ID | Section |
|------|----|---------|
| Header nav links | `#what-we-automate`, `#how-it-works`, `#solutions` | Section anchors |
| Header "Contact Us" button | routes to `ContactPage` | Separate page (SPA route) |
| "Explore Workflows" (Hero) | `#what-we-automate` | Automation section |
| Footer nav | same anchors | Same sections |

### Page Routing
`App.jsx` manages page state with `useState('landing' | 'contact')`. The `ContactPage` is a full-page component with its own header. No react-router — pure React state.

---

## Buttons

- **Primary** (`bg-accent-blue` + glow shadow + active scale)
- **Secondary** (`.glass-panel` + hover bg)
- **Ghost** (text-only + hover bg)

Sizes: `sm` / `md` (default) / `lg`

All buttons use the `onClick` prop. No `<a>` tags for CTAs — use `<Button onClick={...}>` unless navigating to a new URL.

---

## Logo

**OptiPhys** uses an image logo with the wordmark "OptiPhys" rendered as text with a vertical cut through the "O". See `src/components/ui/Logo.jsx`.

**Image:** `public/optiphys-mark.png` — the company's AI logo mark

**Props:**
- `size` (number, default 64) — logo mark size in px
- `className` (string) — extra wrapper classes

**Vertical cut in "O":** A 2px vertical line spans the full height of the "O" in the page background color (`#111318`), creating a clean split effect.

**Usage:**
```jsx
<Logo size={72} /> {/* Header - 72px logo + "OptiPhys" wordmark */}
<Logo size={72} /> {/* Footer - same */}
```

The favicon at `public/favicon.svg` is a static SVG snapshot for browser tab display.

---

## Background System — Cinematic Scroll Animation

### CinematicAnimation.jsx (Layer 1: Deepest, z-[-10])
`src/components/three/CinematicAnimation.jsx` — A lightweight, self-contained SVG animation system driven entirely by scroll position. **No Three.js, no WebGL, no GSAP** — pure React + `requestAnimationFrame` for ~2.85 kB gzipped.

**Architecture:**
- **Scroll tracking** — Custom `requestAnimationFrame` loop computes a continuous `timeline` (0→6) based on viewport position from the top of the page to the bottom. Timeline begins from `scrollY = 0` and runs all the way to `document.documentElement.scrollHeight - window.innerHeight`.
- **7 Scenes (SCENES array)** — Each of the 7 services gets one scene. Each scene defines 6 persistent "surfaces" (information blocks) with positions, sizes, opacities, and semantic kinds.
- **Continuous interpolation** — Surfaces morph between scenes via linear interpolation. One connected story, not seven disconnected slides.
- **Connectors** — Curved Bézier paths draw between key surfaces to visualize information flow.
- **Surface kinds** — `message`, `lead`, `event`, `action`, `idea`, `content`, `document`, `core`, `filter`, `priority`, `spam`, `schedule`, `grid`, `table`, `notify` — each renders with distinct visual treatment.
- **Intro float** — At `scrollY = 0`, `intro = 1` and the hero group animates with `automation-hero-float`. As the user scrolls, `intro` fades from 1 → 0 over the first ~55vh of scroll, transitioning from the floating hero intro into the scroll-driven scene morphing.
- **Outro** — Near the bottom of the page, `outro` ramps from 0 → 1 as the viewport approaches the end, fading in the final lead-into-sales-system visual.
- **Overlay** — Dynamic dark gradient ensures text readability over the animation.
- **Accessibility** — `prefers-reduced-motion` disables all motion; `aria-hidden="true"` prevents screen readers from reading the decorative SVG.

**Scene → Service Mapping:**
| Scene | Service | Key Visual Metaphor |
|-------|---------|---------------------|
| 0 | AI Chatbots & Simple Automations | Messages → AI Core → Responses |
| 1 | Lead Generation & CRM Automation | Leads flowing through pipeline stages → notification |
| 2 | Business Process Automation | Single event → 3 parallel actions → team notification |
| 3 | AI Content & Marketing Automation | Idea → AI Core → Content pieces → Schedule |
| 4 | Data Extraction & Processing | Documents → Core extractor → Grid + Table |
| 5 | Email SPAM Control | Email stream → Filter → Priority vs Spam |
| 6 | WhatsApp Lead Automation | Message → Response → Lead → CRM → Notification |

### BackgroundEffects.jsx (Layer 2: z-[-1])
`src/components/effects/BackgroundEffects.jsx` — 4 radial gradient divs in corners.

---

## Accessibility

- **Skip link** — "Skip to main content" link appears on keyboard focus (top-left, blue button)
- **Skip target** — `id="hero"` on the HeroSection for skip link destination
- **Main landmark** — `<main id="main-content" role="main">` wraps all content sections
- **`aria-hidden`** — CinematicAnimation and BackgroundEffects are hidden from screen readers
- **`prefers-reduced-motion`** — All animations (CinematicAnimation float, Logo pulse if used) disable when the user has this preference set
- **Keyboard navigation** — All interactive elements (nav links, buttons, form inputs) are focusable and have visible focus states

---

## SEO / Meta Tags

All managed in `index.html`:
- `<title>`, `<meta name="description">`, `<meta name="robots">`
- Open Graph tags: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`
- Twitter Card tags: `twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`
- `theme-color` for mobile browser chrome

**Note:** Replace `/og-image.png` with a real Open Graph image (1200×630px recommended) before deploying.

---

## Scroll Tracking

**`useScrollProgress`** (in `src/hooks/useScrollProgress.js`) — Used by `RevealSection` for fade-in animations. Returns `{ activeSection, sectionProgress, totalProgress, mouse }`.

**CinematicAnimation internal tracker** — Custom `requestAnimationFrame` loop. Computes `timeline` (0→6) from `scrollY = 0` to document bottom. Also computes `intro` (1→0 over first ~55vh of scroll) for the hero float animation, and `outro` (0→1 near page bottom) for the outro fade-in. Does not use the hook to avoid listener churn.

---

## Service Carousel (AutomateSection)

`src/components/sections/AutomateSection.jsx` — Premium single-service carousel. Shows one large service card at a time with smooth left/right slide transitions.

**Architecture:**
- **`ServiceContext`** provides `{ activeIndex, total, goToNext, goToPrev }` — infinite loop via modular arithmetic.
- **State machine** — `phase: 'idle' | 'next' | 'prev'`. When the user clicks an arrow, `activeIndex` changes; the `useEffect` computes direction from `(activeIndex - outIndex + total) % total`, sets `phase`, then resets to `'idle'` after `TRANSITION_MS = 380`.
- **Two cards stacked** — `outgoing` and `active` cards are both rendered; their classes flip based on `phase`:
  - `card-slide-in-from-left` / `card-slide-in-from-right` — incoming card animates in via CSS keyframes
  - `card-slide-out-right` / `card-slide-out-left` — outgoing card animates out
  - `card-in-center` / `card-hidden` — settled states
- **CSS keyframes** (`slideInFromLeft`, `slideInFromRight`, `slideOutLeft`, `slideOutRight`) drive the GPU-accelerated `transform: translateX` + `opacity` transition. `will-change: transform, opacity` promotes each card to its own compositor layer for 60fps.
- **Layout rule** — The card lives in the same flex row as the chevron buttons (no counter below), so the buttons center against exactly the card height. The counter is rendered as a separate sibling block below the flex row.
- **Keyboard navigation** — ArrowLeft/ArrowRight step through services (ignored when typing in form fields or when modifier keys are held).
- **Touch swipe** — `touchstart`/`touchend` swipe gestures trigger `goToPrev`/`goToNext` on horizontal delta > 40px.

---

## Contact Form

### ContactPage (Full-page route)
`src/components/sections/ContactPage.jsx` — Replaces the old `ContactSection` (removed from landing). Two-column layout:
- **Left:** Company details (logo, email `contact.optiphys@gmail.com`, phone `+91 78423 63232`, location "Hyderabad, Telangana, India")
- **Right:** Validated form with fields: name, email, phone, company, service (dropdown of all 7 services)
- Submit: "Book a Service With Us" button → 1.5s simulated async delay → success state with "Back to Home" and "Book Another Service" actions

### Form validation pattern
Validate in `handleSubmit`, clear errors on `handleChange`. Error messages render inline below each field with `text-error`.

---

## Animations

| Name | Usage |
|------|-------|
| `animate-fadeInUp` | Card entrance on scroll |
| `automation-hero-float` | Gentle floating in cinematic hero intro |
| `card-slide-in-from-left` / `card-slide-in-from-right` | Carousel incoming card (CSS keyframes, GPU-accelerated) |
| `card-slide-out-left` / `card-slide-out-right` | Carousel outgoing card (CSS keyframes, GPU-accelerated) |
| `.opacity-0 translate-y-8` → `.opacity-100 translate-y-0` | `RevealSection` wrapper |
| `transition-colors` | Hover states on nav, cards, buttons |
| `active:scale-95` | Button press feedback |

---

## Build & Run

```bash
npm install          # Install dependencies
npm run dev          # Dev server — http://localhost:3000
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

**Bundle size:**
- Main bundle: ~173 kB (55 kB gzip)
- **CinematicAnimation chunk (lazy): ~7.65 kB (2.85 kB gzip)** — lightweight SVG animation

---

## Common Patterns

### Adding a new section
1. Create `src/components/sections/NewSection.jsx`
2. Add data to `src/config/` if applicable
3. Import into `App.jsx` and wrap with `<RevealSection id="section-id">`
4. Add `id="section-id"` to the inner section element (so scroll detection finds it)
5. If the new section should drive the cinematic animation, add it to `CinematicAnimation.jsx` SCENES
6. Add navigation link in `src/config/footer.js` → `navigation` array

### Adding a new icon
Use Material Symbols Outlined names: `<Icon name="bolt" size={24} color="#adc6ff" />`

### Styling with Tailwind
- Use design-token classes (`bg-surface`, `text-on-surface`) instead of arbitrary hex
- `.glass-panel` class provides the frosted glass effect
- `.workflow-line` creates gradient separator lines

### Form validation
Check `ContactSection.jsx` for the pattern — validate in `handleSubmit`, clear errors on `handleChange`.

---

## Project Status

| Phase | Status |
|-------|--------|
| Core landing page (Hero, Problem, Footer) | ✅ Done |
| What We Automate section (7 categories) | ✅ Done |
| How It Works section (3-step process) | ✅ Done |
| Solutions section (4 cards with metrics) | ✅ Done |
| Premium single-service carousel with smooth slide transitions | ✅ Done |
| Contact page (full-page form with 7-service dropdown) | ✅ Done |
| "Let's Talk" landing section removed (replaced by Contact page) | ✅ Done |
| Header right-aligned blue "Contact Us" button (single CTA) | ✅ Done |
| Hero CTA reduced to "Explore Workflows" only | ✅ Done |
| Smooth scroll navigation | ✅ Done |
| Mobile menu | ✅ Done |
| Scroll-reveal animations | ✅ Done |
| **Cinematic scroll-driven SVG animation** (top → bottom of page) | ✅ Done |
| Hero float intro + outro fade-in | ✅ Done |
| Accessibility (skip link, ARIA, reduced motion) | ✅ Done |
| SEO meta tags (Open Graph, Twitter Cards) | ✅ Done |
| Logo with company brand image + vertical-cut wordmark | ✅ Done |
| Social links removed from footer | ✅ Done |
| CLAUDE.md documentation | ✅ Done |

### Legacy files removed
- ~~Three.js / React Three Fiber / Drei~~ — removed from dependencies
- ~~`src/components/three/Scene3D.jsx`~~ — deleted
- ~~`src/components/three/ecosystem/`~~ — deleted
- ~~`src/config/scene3d.js`~~ — deleted (replaced by CinematicAnimation.jsx)
- ~~Dead 3D geometry props~~ (`geometry`, `position`, `scale`, `glow`) removed from `automations.js`
- ~~`src/components/sections/ContactSection.jsx`~~ — deleted (replaced by full-page `ContactPage.jsx`)
- ~~"Book a Free Consultation" header button~~ — replaced by "Contact Us"
- ~~"Get Started Today" hero CTA~~ — removed; "Explore Workflows" only

### Possible next steps
- [ ] Replace `/og-image.png` with real Open Graph image
- [ ] Add testimonial section
- [ ] Add pricing / plans section
- [ ] Add case study / portfolio section
- [ ] Real form submission (Netlify Forms, Formspree)
- [ ] Dark/light mode toggle
- [ ] Add contact phone number (currently "Coming Soon")