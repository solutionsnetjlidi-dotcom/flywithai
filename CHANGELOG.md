# 📋 CHANGELOG — OMARSOFT BESTOMAR Landing Page
**Project:** OMARSOFT | Jlidi Network Solutions | Djerba, Tunisia
**Brand:** BEST FUTURE WITH BESTOMAR
**Lead:** Omar Jlidi (BESTOMAR)
**Stack:** Vanilla HTML5 · CSS3 · ES6+ · Web Audio API · PWA

---

## [3.1.0] — Final Polish — 2026-07-22
**18 surgical fixes across JS, CSS, HTML, Accessibility, SEO**

### 🐛 Bug Fixes
- **FIX-02** `setLang('ar')` was called 7× at startup — reduced to 1 (6 duplicates removed)
- **FIX-03** 5 separate scroll event listeners consolidated into 1 unified passive handler
- **FIX-04** Redundant `IntersectionObserver` for `.reveal` removed (kept enhanced version)
- **FIX-05** Duplicate `music-btn` click event handler removed
- **FIX-06** CSS: 2 duplicate selector definitions removed (`.brill`, `.reveal` first instances)
- **FIX-07** Confirmed no invalid `id="true"` attributes in markup
- **FIX-18** Removed dead CSS placeholder comments left by deduplication pass

### ✨ Accessibility (WCAG AA)
- **FIX-08** Language switcher: added `role="group"` + `aria-label` (AR/FR/EN)
- **FIX-16** FAQ: added `aria-controls`, `aria-labelledby`, `role="region"` per WCAG 2.1 AA
- **FIX-17** FAQ `aria-expanded` now auto-syncs via MutationObserver on class change
- **FIX-09** Added `.sr-only` CSS utility class for screen-reader-only content

### 🏗️ Semantic HTML
- **FIX-14** Footer: `<address>` element wraps contact info (local SEO + semantic)
- **FIX-15** Copyright: `<time datetime="...">` elements for machine-readable dates
- **FIX-09** Gallery: `<figure>` + `<figcaption class="sr-only">` semantic wrappers

### ⚡ Performance
- **FIX-03** Single passive scroll handler replaces 5 individual handlers (jank eliminated)
- **FIX-04** Removed duplicate IO instance (memory optimized)
- **FIX-10** Google Fonts URL: added `display=swap` (eliminates FOUT — Flash of Unstyled Text)
- **FIX-11** Hero image: explicit `loading="eager"` (critical LCP element must not be deferred)

### 🔍 SEO
- **FIX-01** Added `<link rel="manifest">`, favicon, apple-touch-icon to `<head>`
- **FIX-14** `<address>` tag improves local business SEO signal
- **FIX-15** `<time>` elements make copyright date machine-readable for crawlers

### 🎨 UI / UX Polish
- **FIX-12** Form placeholders now update on language switch (AR/FR/EN)
- **FIX-13** Premium micro-interactions added:
  - Hero stats: stagger entrance animation (0.2s delay each)
  - Audience cards: icon hover scale + rotate on hover
  - Outcome cards: check mark pulse on hover
  - FAQ: smoother icon rotation spring
  - Testimonials: quote mark parallax on hover
  - Ann badge: subtle breathe pulse animation
  - Logo: hover scale + rotate effect
  - Nav CTA: shimmer sweep animation
  - WA float: cubic-bezier spring transition
  - Path button: letter-spacing expansion on hover

### 🔒 Security
- **FIX-01** All external link `rel="noopener noreferrer"` verified

---

## [3.0.0] — Phase 3 Optimization — 2026-07-22
**Architecture, Performance, SEO, Accessibility, Forms**

### Added
- `<main id="main-content">` semantic landmark wrapping all page content
- `<nav role="navigation" aria-label="...">` proper landmark
- `<footer role="contentinfo">` + `<aside>` for announcement bar
- `aria-labelledby` on all 11 sections pointing to section headings
- `content-visibility: auto` on 10 below-fold sections (deferred rendering)
- `contain: layout style` on all sections (CSS containment for layout performance)
- WhatsApp-powered contact form with full trilingual validation
- `window.OMARSOFT` global architecture object (version, contact, future hooks, events)
- `EventTarget`-based event bus (`OMARSOFT.emit()` / `OMARSOFT.on()`)
- Service Worker registration with graceful fallback
- `trackEvent()` analytics helper (GA4 + FB Pixel ready, event bus)
- `IntersectionObserver` for section analytics tracking
- URL routing with `?lang=` parameter auto-detection
- `requestIdleCallback` for non-critical DNS prefetch
- Global error boundary (`window.error` + `unhandledrejection`)
- `OMARSOFT.navigate()` with future-page "coming soon" toast
- `OMARSOFT.future` hooks for Blog, Store, Academy, Dashboard, Agents
- `decoding="async"` on all below-fold images
- `fetchpriority="high"` on hero image
- `image-rendering: auto` on gallery images
- PWA meta: `apple-mobile-web-app-capable`, `application-name`, `format-detection`
- `@media (forced-colors: active)` high-contrast mode support
- `@media print` print stylesheet
- `@media (prefers-reduced-motion)` comprehensive coverage
- WCAG AA `:focus-visible` with 3px gold outline + 3px offset

### Supporting Files Created
- `robots.txt` — Crawl rules, bad-bot blocking, sitemap references
- `sitemap.xml` — Multilingual URL entries with hreflang + image schema
- `manifest.json` — Full PWA manifest (shortcuts, screenshots, protocol handlers)
- `sw.js` — Service Worker (cache-first/network-first, push notifications, sync)
- `404.html` — Branded OMARSOFT error page with auto-redirect
- `.htaccess` — Apache: HTTPS, CSP, caching, compression, WebP, security headers
- `ARCHITECTURE.md` — Future expansion guide (Blog/Store/Academy/Dashboard/Agents)
- `BESTOMAR_AUDIT_REPORT.md` — Complete audit (Phase 1→3 reference)

---

## [2.1.0] — Phase 2 Upgrades — 2026-07-22
**Premium UI, Accessibility, New Sections, CRO**

### Added
- Page loader (spinner with OMARSOFT branding, auto-hides on load)
- Scroll progress bar (gold gradient, GPU-accelerated)
- Back-to-top button (appears after 380px scroll)
- Gallery lightbox with keyboard navigation + focus trap
- FAQ accordion with keyboard support (`Enter`/`Space`)
- Testimonials section (3 cards, trilingual)
- FAQ section (5 questions, trilingual)
- Counter animation on numbers section (cubic-bezier ease)
- Path card icon wrapped in styled box with hover animation
- Social proof ticker (scrolling, pauses on hover)
- WhatsApp popup chat widget (appears after 12s, once per session)
- Cookie consent banner (GDPR, localStorage, trilingual)
- Urgency strip section (animated fire, trilingue)
- Toast notification system
- Parallax hero background (desktop only)
- PWA meta tags (theme-color, apple-mobile, etc.)
- Subtle noise texture overlay (0.018 opacity)
- Nav `.scrolled` state on scroll

### Accessibility
- Skip navigation link (`:focus-visible` → slides in)
- `:focus-visible` on all interactive elements (3px gold outline)
- `@media (prefers-reduced-motion)` for all animations
- `will-change` on animated elements (GPU promotion)
- `aria-label` on all buttons and navigation links
- `role="progressbar"` on scroll bar
- `role="dialog"` on lightbox with `aria-modal="true"`
- H1 pre-filled with Arabic text at parse time (SEO fix)
- `loading="lazy"` + `decoding="async"` on gallery images

### Performance
- `will-change: background-position` on `.brill` animation
- CSS containment hints added
- `requestAnimationFrame` for counter animation
- Passive event listeners for scroll

---

## [2.0.0] — Phase 1 Critical Fixes + Phase 2 Foundations — 2026-07-22
**SEO, Security, Architecture base, Phase 2 prep**

### Critical SEO Fixes
- Added `<meta name="description">` (was missing entirely)
- Added complete Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:locale)
- Added Twitter Card meta tags
- Added `<link rel="canonical">`
- Added `hreflang` for AR, FR, EN
- Added Schema.org JSON-LD (Person, Organization, FAQPage)
- Added `<link rel="preconnect">` for Google Fonts
- H1 element pre-filled with Arabic text at HTML parse time

### Security
- Added `rel="noopener noreferrer"` to all external links
- Verified all links use HTTPS

### Performance
- Added `loading="lazy"` to all below-fold images

### UX
- Auto-start music on first user interaction (browser autoplay policy compliant)
- Music button initial state: neutral "🎵 Music" instead of misleading "🔊 ON"
- `document.title` updates on language switch

---

## [1.0.0] — Initial Build — 2026-07-22
**Complete single-file trilingual landing page**

### Features
- Trilingual JS-powered language switcher (AR/FR/EN) with RTL/LTR auto-switch
- Web Audio API music engine (82 BPM, Cmaj7→Am7→Fmaj7→G7, reverb)
- OMARSOFT brilliant gold branding (animated gradient, CSS custom properties)
- OmarSoft logo + AI robot characters (Claude + Higgsfield)
- 11 sections: Hero, Quote, Comparison, Curriculum (5), Audience (5), Outcomes (5), Gallery, Paths, Numbers, Contact
- Gold border frame on hero photo
- WhatsApp floating button
- Scroll reveal animations (IntersectionObserver)
- Sticky navigation with shadow on scroll
- Announcement bar with store link
- All images base64-embedded (self-contained)
- Responsive: 900px, 768px, 560px breakpoints
- CSS Custom Properties architecture
- Google Fonts: Cairo (AR), Inter (EN), Playfair Display (headings)
- Footer with OmarSoft logo + tech stack pills

---

## Bug Tracker Reference

| ID | Severity | Status | Description |
|---|---|---|---|
| BUG-001 | 🔴 Critical | ✅ Fixed | setLang called 7× at startup (performance) |
| BUG-002 | 🔴 Critical | ✅ Fixed | 5 duplicate scroll event listeners |
| BUG-003 | 🟠 High | ✅ Fixed | Missing meta description (SEO) |
| BUG-004 | 🟠 High | ✅ Fixed | Missing Open Graph tags (social sharing) |
| BUG-005 | 🟠 High | ✅ Fixed | No rel=noopener on external links (security) |
| BUG-006 | 🟠 High | ✅ Fixed | H1 empty at parse time (SEO) |
| BUG-007 | 🟡 Medium | ✅ Fixed | No :focus-visible styles (WCAG) |
| BUG-008 | 🟡 Medium | ✅ Fixed | No skip navigation (WCAG) |
| BUG-009 | 🟡 Medium | ✅ Fixed | Google Fonts without display=swap (FOUT) |
| BUG-010 | 🟡 Medium | ✅ Fixed | Hero image missing loading=eager |
| BUG-011 | 🟡 Medium | ✅ Fixed | manifest.json not linked |
| BUG-012 | 🟡 Medium | ✅ Fixed | FAQ missing aria-controls (WCAG AA) |
| BUG-013 | 🔵 Low | ✅ Fixed | Duplicate CSS selectors (.brill, .reveal) |
| BUG-014 | 🔵 Low | ✅ Fixed | Form placeholders not updating on lang switch |
| BUG-015 | 🔵 Low | ✅ Fixed | No semantic <address> / <time> in footer |
| BUG-016 | 🔵 Low | ✅ Fixed | 4 IntersectionObserver instances (2 redundant) |

---

*Maintained by: OMARSOFT Engineering · Omar Jlidi · solutionsnetjlidi@gmail.com*
*Version control: Manual (consider Git when moving to multi-file structure)*
