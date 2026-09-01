# OptiPhys Website — Task List

## ✅ Completed

- [x] Core landing page (Hero, Problem, Footer)
- [x] What We Automate section (7 automation categories)
- [x] How It Works section (3-step process)
- [x] Solutions section (4 solution cards with metrics)
- [x] Contact form (validated form, success state)
- [x] **Full-page Contact Us route** (separate `ContactPage.jsx` with 7-service dropdown)
- [x] **"Let's Talk" landing section removed** (replaced by Contact page)
- [x] **Header CTA simplified** to single right-aligned blue "Contact Us" button
- [x] **Hero CTA reduced** to "Explore Workflows" only
- [x] **Premium single-service carousel** (one large card, chevron nav, "01 / 07" counter, smooth slide transitions, keyboard + touch support)
- [x] Smooth scroll navigation
- [x] Mobile menu
- [x] Scroll-reveal animations
- [x] **Cinematic scroll-driven SVG animation system** (replaces Three.js; runs from top of page to bottom)
- [x] **Hero float intro** (fades in at top, fades out as user scrolls into content)
- [x] Logo rebranded to company image + vertical-cut wordmark
- [x] Social links removed from footer
- [x] CLAUDE.md documentation updated
- [x] **Removed deprecated dependencies from package.json** (Three.js, R3F, Drei, GSAP)
- [x] **Deleted legacy Three.js files** (`ecosystem/` directory, dead 3D props in `automations.js`)
- [x] **Deleted legacy `ContactSection.jsx`** (replaced by full-page `ContactPage.jsx`)
- [x] **Build verified** (no errors, ~183 kB main + 7.4 kB animation chunk)
- [x] **Mobile responsiveness verified** (animation uses `overflow-hidden`, `pointer-events-none`, `aria-hidden`; `prefers-reduced-motion` honored)
- [x] **Accessibility audit completed** (added skip-to-content link, `main` landmark, ARIA roles, keyboard focus states)
- [x] **SEO meta tags added** (Open Graph + Twitter Card + theme-color + robots)
- [x] Contact form validation and simulated async delay (reverted to pre-Supabase state)

## 📋 Maintenance

- [ ] Replace `/og-image.png` placeholder with real 1200×630 Open Graph image before deploying
- [ ] Run periodic `npm audit` to check for dependency vulnerabilities

## 🚀 Future Enhancements (Lower Priority)

- [ ] Add testimonial section
- [ ] Add pricing / plans section
- [ ] Add case study / portfolio section
- [ ] Email notification on new contact (Postgres → Resend/SendGrid)
- [ ] Admin dashboard to view/export submitted leads
- [ ] Dark/light mode toggle
- [ ] Add unit tests for hooks (`useScrollProgress`, `useSmoothScroll`)
- [ ] Add lighthouse CI to track performance scores
- [ ] Add structured data (JSON-LD) for Business / Organization
- [ ] Add sitemap.xml and robots.txt
- [ ] Add real phone number (currently "Coming Soon")
