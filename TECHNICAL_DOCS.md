# 📚 TECHNICAL DOCUMENTATION — OMARSOFT BESTOMAR
**Version:** 3.1.0 | **Date:** 2026-07-22
**Stack:** HTML5 · CSS3 (Custom Properties) · ES6+ · Web Audio API · PWA

---

## 🏗️ Project Architecture

```
Single-Page Application (SPA) — Self-Contained HTML
├── <head>              Meta, SEO, OG, Schema, Fonts, CSS
├── <body>
│   ├── .skip-link      Accessibility skip navigation
│   ├── .loader         Page loading spinner
│   ├── .scroll-bar     Scroll progress indicator
│   ├── .back-top       Back to top button
│   ├── .lightbox       Gallery lightbox overlay
│   ├── <aside>         Announcement bar
│   ├── <nav>           Sticky navigation
│   ├── <main>          ← All page content
│   │   ├── #hero       Hero section
│   │   ├── .quote-band Quote section
│   │   ├── .social-proof-bar  Ticker
│   │   ├── #comparison Comparison table
│   │   ├── #curriculum 5-module curriculum
│   │   ├── #audience   5 target audiences
│   │   ├── #outcomes   5 deliverables
│   │   ├── #gallery    Photo portfolio
│   │   ├── #paths      Client/Agent paths
│   │   ├── #numbers    Statistics
│   │   ├── #testimonials 3 reviews
│   │   ├── #faq        5 questions
│   │   ├── .urgency-strip Urgency CTA
│   │   └── #contact    Contact + Form
│   ├── <footer>        Brand + links
│   ├── .wa-float       WhatsApp floating button
│   ├── .wa-popup       WhatsApp chat widget
│   ├── #music-btn      Music toggle
│   ├── .cookie-bar     GDPR consent
│   ├── .toast-container Toast system
│   └── <script>        All JS (56 KB)
```

---

## 🎨 Design System

### Color Palette
```css
--g1: #7B5900      /* Gold deep    — shadows, depth */
--g2: #C9A227      /* Gold base    — primary accent */
--g3: #EAC84A      /* Gold light   — hover states */
--g4: #F8EBA0      /* Gold pale    — shimmer peak */
--nv: #040D1F      /* Navy deep    — page background */
--nvm: rgba(8,20,50,.88)  /* Navy mid — card backgrounds */
--sv: #B0C0D4      /* Silver       — secondary text */
--svl: #D8E4F0     /* Silver light — form labels */
--gr: #00C853      /* Green        — agent path, WA */
--wh: #FFFFFF      /* White        — primary text */
--w9: rgba(255,255,255,.9)   /* Near white */
--w7: rgba(255,255,255,.7)   /* Secondary text */
--w4: rgba(255,255,255,.4)   /* Muted text */
--w12: rgba(255,255,255,.12) /* Border */
--w05: rgba(255,255,255,.05) /* Card background */
```

### Contrast Ratios (WCAG AA: 4.5:1 minimum)
| Foreground | Background | Ratio | Status |
|---|---|---|---|
| `--g2` (#C9A227) | `--nv` (#040D1F) | 7.2:1 | ✅ AAA |
| `--wh` (#FFFFFF) | `--nv` (#040D1F) | 18.1:1 | ✅ AAA |
| `--w7` on `--nv` | — | ~4.8:1 | ✅ AA |
| `--g3` on `--nv` | — | ~9.1:1 | ✅ AAA |
| Gold on white (logo) | — | ~4.9:1 | ✅ AA |

### Typography Scale
```css
/* Display — section titles */
font-family: 'Playfair Display', serif;
font-size: clamp(22px, 4vw, 42px);
font-weight: 900;

/* Arabic body — Cairo */
font-family: 'Cairo', sans-serif;
font-size: 15px;
line-height: 1.75;

/* English/Latin — Inter */
font-family: 'Inter', sans-serif;
letter-spacing: 0.3px–4px (context-dependent)

/* Heading hierarchy */
h1: clamp(34px, 5.5vw, 72px)  /* Hero name */
h2: clamp(22px, 4vw, 42px)    /* Section titles */
h3: 17px                       /* Form title, sub-sections */
```

### Spacing System (8px grid)
```
4px  — micro gaps (icon+text)
8px  — small gaps (form errors)
10px — list item gaps
12px — badge padding
14px — button gap
16px — card padding small
18px — card padding
22px — card padding large
24px — grid gaps
28px — section element gaps
36px — stat gaps
48px — section padding small
52px — numbers section
64px — tablet section padding
70px — testimonials/faq
72px — section default
80px — major sections
```

### Border Radius
```css
--r:  18px   /* Cards */
--rb: 50px   /* Buttons, pills */
10px         /* Form inputs */
12px         /* Toast, cookies */
20px         /* Urgency strip, WA popup */
22px         /* Comparison table */
24px         /* Hero frame, path cards */
```

---

## ⚙️ JavaScript Architecture

### Global Namespace: `window.OMARSOFT`
```javascript
OMARSOFT = {
  version:  '3.1.0',
  brand:    'OMARSOFT',
  tagline:  'BEST FUTURE WITH BESTOMAR',
  contact:  { whatsapp, email, store, location, rc, mf },
  future:   { blog, store, academy, dashboard, agents },  // Feature flags
  currentLang: 'ar',
  supportedLangs: ['ar', 'fr', 'en'],
  rtlLangs: ['ar'],
  analytics: { ga4, fbPixel, ttPixel, hotjar },
  events:   EventTarget,     // Internal event bus
  emit(event, detail),       // Dispatch custom event
  on(event, callback),       // Subscribe to event
  navigate(path, lang),      // Future-page aware navigation
}
```

### Event Bus
```javascript
// Subscribe
OMARSOFT.on('lang:changed',    ({lang})     => ...);
OMARSOFT.on('section:visible', ({id})       => ...);
OMARSOFT.on('analytics:event', (data)         => ...);

// Dispatch
OMARSOFT.emit('lang:changed', { lang: 'fr' });
```

### Language System
```javascript
// Single entry point — all language updates flow through here
function setLang(lang) {
  // 1. Update <html lang=""> and <html dir="">
  // 2. Update all T[lang] DOM elements
  // 3. Update document.title
  // 4. Update urgency/cookie/WA/SP/form translations
  // 5. Update form placeholders
  // 6. Update OMARSOFT.currentLang
  // 7. Emit 'lang:changed' event
}

// Supported languages
const langs = ['ar', 'fr', 'en'];
// RTL languages
const rtl = ['ar'];
// Auto-detect from URL: /?lang=fr
```

### Translation Structure (T object)
```javascript
T = {
  ar: {
    // Announcement
    ann_badge, ann_text, ann_btn,
    // Navigation
    nav_cur, nav_aud, nav_out, nav_path, nav_con, nav_cta,
    // Hero
    hero_name, hero_sub, hero_title, hero_desc, hero_cta1, hero_cta2,
    s1n,s1u,s1l, s2n,s2u,s2l, s3n,s3u,s3l,  // Stats
    // Quote
    quote,
    // Comparison table
    comp_sec, comp_title, comp_old, comp_new, comp_rows[4],
    // Curriculum
    cur_sec, cur_title, cur_sub, cur_items[5],
    // Audience
    aud_sec, aud_title, aud_sub, aud_items[5],
    // Outcomes
    out_sec, out_title, out_sub, out_items[5],
    // Paths
    path_title, p1_title, p1_desc, p1_f[4], p1_btn,
    p2_title, p2_desc, p2_f[4], p2_btn,
    // Contact
    con_title, con_desc,
    // Numbers
    nl3, nl4,
  },
  fr: { /* same keys */ },
  en: { /* same keys */ },
}
```

### Music Engine (Web Audio API)
```javascript
Music = {
  // Config
  BPM: 82,
  BeatLength: 60/82 = 0.73s,
  ChordProgression: [Cmaj7, Am7, Fmaj7, G7],
  MelodyPattern: [8 notes per bar × 4 bars],

  // Layers
  pad(time, chord, dur),    // Sustained chords (sine, lowpass, attack/release)
  bass(time, freq),          // Triangle wave, lowpass filter
  kick(time),                // Pitched sine burst 140→38 Hz
  snare(time),               // White noise burst, bandpass 2200 Hz
  hihat(time, vol),          // White noise, highpass 9000 Hz
  bell(time, freq, dur),     // Sine + reverb send
  mkReverb(),                // Convolver (2.5s impulse response)

  // API
  toggle() → boolean,        // Start/stop, returns isPlaying
  isPlaying() → boolean,
}
```

### Analytics Integration Points
```javascript
// Call anywhere in code:
trackEvent(action, category, label, value);

// Pre-wired events:
trackEvent('click', 'CTA', 'Store Link', 1);    // Store links
trackEvent('click', 'CTA', 'WhatsApp', 1);       // WA links
trackEvent('form_submit', 'Contact Form', subject, 1);  // Form
trackEvent('section_view', 'Engagement', sectionId, 1); // Sections
trackEvent('js_error', 'Error', message, 0);     // Errors

// To activate GA4: set OMARSOFT.analytics.ga4 = 'G-XXXXXXXXXX'
// To activate FB:  set OMARSOFT.analytics.fbPixel = 'PIXEL_ID'
```

---

## 🌐 SEO Implementation

### Meta Tags
```html
<title>عمر الجليدي | BESTOMAR — مستشار الذكاء الاصطناعي · Djerba Tunisie</title>
<meta name="description" content="155-char description">
<meta name="keywords" content="AI Consultant, Djerba, OMARSOFT, ...">
<link rel="canonical" href="https://omarsoft.tn/">
<link rel="alternate" hreflang="ar" href="...?lang=ar">
<link rel="alternate" hreflang="fr" href="...?lang=fr">
<link rel="alternate" hreflang="en" href="...?lang=en">
```

### Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "name": "Omar Jlidi", ... },
    { "@type": "Organization", "name": "OMARSOFT", ... },
    { "@type": "FAQPage", "mainEntity": [...] }
  ]
}
```

### Core Web Vitals Targets
| Metric | Current (w/ b64) | Target (w/ external images) |
|---|---|---|
| LCP | 8–15s ❌ | <1.8s ✅ |
| FID/INP | ~50ms ✅ | <100ms ✅ |
| CLS | <0.05 ✅ | <0.05 ✅ |
| TTFB | N/A (local) | <200ms ✅ |
| Page Size | 11.6 MB ❌ | <200 KB ✅ |

**Critical optimization needed:** Extract base64 images to external WebP files.
Expected result: 11.6 MB → 180 KB (98% reduction).

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|---|---|---|
| `min-width: 1440px` | Large Desktop | max-width 1340px, larger hero photo |
| `max-width: 900px` | Tablet/Phone | 1-col hero, photo below text |
| `max-width: 768px` | Tablet | 2-col audience, 1-col paths |
| `max-width: 600px` | Large Phone | Ann bar ticker, cookie stack |
| `max-width: 480px` | Small Phone | Smaller hero name, 1-col all grids |

---

## ♿ Accessibility (WCAG 2.1 AA)

### Landmarks
| Role | Element | Description |
|---|---|---|
| `banner` | `<aside class="ann-bar">` | Announcement bar |
| `navigation` | `<nav>` | Main navigation |
| `main` | `<main id="main-content">` | Page content |
| `contentinfo` | `<footer>` | Footer |
| `complementary` | Announcement aside | Secondary info |
| `dialog` | `.lightbox`, `.wa-popup` | Overlays |
| `progressbar` | `.scroll-bar` | Scroll indicator |
| `region` | FAQ answers | Expandable sections |
| `group` | Language switcher | Button group |

### Keyboard Navigation
- **Tab order:** Skip link → Nav → Main → Sections → Footer
- **Skip link:** Visible on focus, jumps to `#main-content`
- **FAQ:** `Enter`/`Space` toggles, arrow keys cycle items
- **Lightbox:** `Escape` closes, focus trapped inside
- **Music:** Full keyboard accessible
- **Language switcher:** Full keyboard accessible

### Focus Indicators
```css
:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

## 🔒 Security Checklist

| Check | Status | Notes |
|---|---|---|
| HTTPS enforcement | ✅ | .htaccess RewriteRule |
| Content-Security-Policy | ✅ | .htaccess header |
| X-Frame-Options | ✅ | SAMEORIGIN |
| X-Content-Type-Options | ✅ | nosniff |
| HSTS | ✅ | max-age=31536000 |
| Referrer-Policy | ✅ | strict-origin-when-cross-origin |
| External links noopener | ✅ | All target="_blank" links |
| No eval() usage | ✅ | Confirmed |
| No inline event handlers | ✅ | All addEventListener |
| Sensitive data exposed | ✅ | Only public contact info |
| Form validation | ✅ | Client-side + natural WA flow |

---

## 📂 Deployment Guide

### File Upload Order
```
1. sw.js              ← Service Worker (must be at root)
2. manifest.json      ← PWA manifest
3. robots.txt         ← Block crawlers from /admin
4. sitemap.xml        ← Submit to Google Search Console
5. .htaccess          ← Server config (upload FIRST before HTML)
6. 404.html           ← Custom error page
7. index.html         ← Main page (rename from bestomar-landing.html)
8. ARCHITECTURE.md    ← Keep for team reference (don't expose publicly)
```

### Post-Deploy Checklist
```
□ Test HTTPS redirect (http:// → https://)
□ Test custom 404 page
□ Submit sitemap to Google Search Console
□ Submit sitemap to Bing Webmaster Tools
□ Set up Google Analytics 4 (replace G-XXXXXXXXXX)
□ Set up Facebook Pixel (replace PIXEL_ID)
□ Test on iOS Safari + Chrome Android
□ Run Lighthouse audit (target: 90+ all categories)
□ Run WAVE accessibility checker
□ Test PWA install prompt
□ Verify Open Graph with Facebook Debugger
□ Verify Twitter Card with Card Validator
□ Test WhatsApp share preview
□ Set up Cloudflare CDN (free tier) for performance
□ Set up Google Search Console property
```

### Performance Quick Wins (Post-Deploy)
```
1. Convert base64 images to WebP:
   - omar-robots-bg.webp  → target 80 KB
   - robots-office.webp   → target 60 KB
   - og-image.jpg         → 1200×630, target 120 KB
   (Expected result: 11.6 MB → 160 KB page size)

2. Enable Cloudflare:
   - Auto-minify HTML/CSS/JS
   - WebP conversion
   - HTTP/2 Push
   - Cache TTL: 1 year for static

3. Self-host Google Fonts:
   - Download Cairo, Inter, Playfair Display
   - Place in /assets/fonts/
   - Remove Google Fonts link, add local @font-face
   (Saves 1 blocking network request)
```

---

## 🔮 Future Development

### Activate Future Pages (1 line each)
```javascript
// In browser console or after adding backend:
OMARSOFT.future.blog.enabled = true;
OMARSOFT.future.blog.api = 'https://api.omarsoft.tn/blog';

OMARSOFT.future.store.enabled = true;
OMARSOFT.future.academy.enabled = true;
// When enabled, OMARSOFT.navigate('/blog') routes to /blog/
// When disabled, shows "Coming soon" toast
```

### Add New Language
```javascript
// 1. Add to T object:
T.de = { ann_badge: '🔥 Neu', hero_name: 'Omar Jlidi', ... };

// 2. Add language button:
// <button class="lbtn" onclick="setLang('de')">DE</button>

// 3. Add hreflang:
// <link rel="alternate" hreflang="de" href="...?lang=de">

// 4. Update supportedLangs:
OMARSOFT.supportedLangs.push('de');
```

### Add New Section (CMS-ready)
```html
<!-- All future sections use data-cms-section -->
<section id="new-section" data-cms-section="new" aria-labelledby="new-title">
  <div class="container">
    <h2 class="sec-title" id="new-title" data-cms-editable="true"></h2>
    <!-- content -->
  </div>
</section>
```

---

*Documentation by: OMARSOFT Engineering v3.1.0*
*Omar Jlidi · solutionsnetjlidi@gmail.com · Djerba, Tunisia · +21654421123*
