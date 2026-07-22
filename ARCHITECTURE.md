# 🏗️ OMARSOFT BESTOMAR — Architecture & Future Expansion Guide
**Version:** 3.0.0 | **Date:** 2026-07-21 | **Author:** Omar Jlidi / BESTOMAR

---

## 📁 Current File Structure

```
omarsoft.tn/                    ← Web root
├── index.html                  ← Main landing page (11.6 MB — optimize images)
├── 404.html                    ← Branded error page
├── robots.txt                  ← Search crawler rules
├── sitemap.xml                 ← XML sitemap (multilingual)
├── manifest.json               ← PWA manifest
├── sw.js                       ← Service Worker (cache-first)
├── .htaccess                   ← Apache config (security, caching, compression)
│
├── icons/                      ← PWA icons (to be generated)
│   ├── icon-72.png
│   ├── icon-192.png            ← maskable
│   └── icon-512.png            ← maskable
│
├── images/                     ← Optimized images (replace base64 here)
│   ├── omar-robots-bg.webp     ← Hero photo (target: <100KB)
│   ├── robots-office.webp      ← Gallery (target: <80KB each)
│   ├── logo-omarsoft.webp
│   └── og-image.jpg            ← Open Graph (1200x630)
│
└── assets/                     ← Future static assets
    ├── css/                    ← Future: extracted CSS
    ├── js/                     ← Future: extracted JS
    └── fonts/                  ← Future: self-hosted fonts
```

---

## 🗺️ FUTURE EXPANSION ROADMAP

### Phase A — Content Management System
```
/admin/                     ← CMS admin panel (headless)
├── login.html
├── dashboard.html          ← Content editor
├── api/
│   ├── content.json        ← CMS content (replace hard-coded text)
│   ├── translations.json   ← All AR/FR/EN strings
│   └── settings.json       ← Site settings
```

**Implementation:** All `data-cms-section` attributes in the HTML
are hooks for the future CMS. The `OMARSOFT.events` bus allows
components to react to content updates without page reload.

### Phase B — Blog (مدونة · Blog)
```
/blog/                      ← Blog index
├── index.html              ← AR/FR/EN filtered posts
├── [slug]/                 ← Post pages
│   └── index.html
└── api/
    └── posts.json          ← Blog post database
```

**Tech stack options:**
- Static: Jekyll / Hugo / Eleventy (free GitHub Pages hosting)
- Dynamic: Next.js + Vercel (free tier)
- Headless CMS: Contentful / Sanity (free tier)

**Enable in code:** `OMARSOFT.future.blog.enabled = true`

### Phase C — Store (متجر · Boutique)
```
/store/                     ← Product catalog
├── index.html              ← Products grid (AR/FR/EN)
├── product/[id]/           ← Product pages
├── cart/                   ← Shopping cart
├── checkout/               ← Checkout (WA + payment)
└── api/
    ├── products.json
    └── orders.json
```

**Payment options (Tunisia-compatible):**
- WhatsApp ordering (current)
- Konnect (Tunisian payment gateway)
- Stripe (future with business account)
- PayPal

### Phase D — Academy (أكاديمية · Académie)
```
/academy/                   ← Course catalog
├── index.html              ← Courses list
├── course/[id]/            ← Course pages
│   ├── index.html          ← Course overview
│   └── lesson/[n]/         ← Lesson player
├── dashboard/              ← Student dashboard
│   ├── progress.html
│   └── certificates.html
└── api/
    ├── courses.json
    ├── lessons.json
    └── progress.json       ← localStorage/IndexedDB initially
```

**Tech stack:**
- Video hosting: YouTube (unlisted) / Vimeo / Bunny.net
- Progress tracking: localStorage → Firebase → custom DB
- Certificates: PDF generation via Claude/js-pdf

### Phase E — Dashboard (لوحة التحكم)
```
/dashboard/                 ← Protected area
├── index.html              ← Overview
├── clients.html            ← Client management
├── content.html            ← Content calendar
├── analytics.html          ← Google Analytics embed
└── agents.html             ← AI Agents control panel
```

**Authentication options:**
- Firebase Auth (free tier)
- Supabase Auth (free tier)
- Simple JWT with Cloudflare Workers

### Phase F — AI Agents (وكلاء الذكاء الاصطناعي)
```
/agents/                    ← AI Agents marketplace
├── index.html              ← Agent catalog
├── agent/[id]/             ← Agent interface
│   └── index.html          ← Claude-powered chat UI
└── api/
    └── agents/
        ├── cv-reviewer.json
        ├── content-writer.json
        ├── business-planner.json
        └── network-assistant.json
```

**Agent types ready to deploy:**
1. **CV Reviewer** — Reviews CVs in AR/FR/EN using Claude API
2. **Content Writer** — Generates social media posts in 3 languages
3. **Business Planner** — Creates AI business plans
4. **IT Assistant** — Network troubleshooting chatbot
5. **Course Recommender** — Suggests academy courses based on profile

---

## 🔧 GLOBAL OMARSOFT JS OBJECT

The `window.OMARSOFT` object is the central registry for all future features:

```javascript
// Enable future pages
OMARSOFT.future.blog.enabled = true;
OMARSOFT.future.blog.api = 'https://api.omarsoft.tn/blog';

// Listen to events
OMARSOFT.on('lang:changed', ({lang}) => console.log('Language:', lang));
OMARSOFT.on('section:visible', ({id}) => console.log('Section visible:', id));
OMARSOFT.on('analytics:event', (data) => console.log('Analytics:', data));

// Navigate with future-page check
OMARSOFT.navigate('/blog'); // Shows "coming soon" if disabled

// Track events
trackEvent('purchase', 'Store', 'AI Course Bundle', 99);
```

---

## 🌐 MULTILINGUAL ARCHITECTURE

All strings are stored in the `T` (translations) object in JS.
Future CMS will serve `translations.json` instead:

```javascript
// Current (embedded)
const T = { ar: {...}, fr: {...}, en: {...} };

// Future (CMS-driven)
fetch('/api/translations.json')
  .then(r => r.json())
  .then(T => setLang(OMARSOFT.currentLang));
```

**RTL Support:** The `<html dir="rtl/ltr">` is auto-managed by `setLang()`.
Arabic is the default (primary market: Tunisia, Algeria, Morocco, Gulf).

**i18n expansion:**
- Phase 1 (current): AR, FR, EN ✅
- Phase 2 (planned): DE (Germany expats), IT (tourism partnerships)
- Phase 3 (future): TR (Turkish market), PT (Brazilian AI community)

---

## ⚡ PERFORMANCE OPTIMIZATION ROADMAP

| Current Issue | Solution | Expected Improvement |
|---|---|---|
| 11.6 MB HTML (base64 images) | External WebP images | 11 MB → ~180 KB HTML |
| Google Fonts blocking | Self-host fonts | -300ms FCP |
| No image CDN | Cloudflare Images | 60-70% smaller images |
| Single HTML file | Code splitting + bundler | Better cache efficiency |
| No critical CSS inlining | Extract above-fold CSS | Better LCP |

**Target Core Web Vitals (after image optimization):**
- LCP: < 1.8s (currently: 8-15s)
- FID/INP: < 100ms (currently: OK)
- CLS: < 0.05 (currently: OK)
- TTFB: < 200ms (with server)

---

## 🔒 SECURITY CHECKLIST

- [x] HTTPS enforcement (.htaccess)
- [x] Content Security Policy
- [x] X-Frame-Options: SAMEORIGIN
- [x] X-Content-Type-Options: nosniff
- [x] HSTS (Strict Transport Security)
- [x] rel="noopener noreferrer" on external links
- [x] No eval() in JavaScript
- [ ] Rate limiting on API endpoints (when backend added)
- [ ] CAPTCHA on contact form (when backend added)
- [ ] Two-factor auth on dashboard (Phase E)
- [ ] Regular dependency audit (when npm packages added)

---

## 📊 ANALYTICS READY HOOKS

```html
<!-- Google Analytics 4 (add your ID) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  OMARSOFT.analytics.ga4 = 'G-XXXXXXXXXX';
</script>

<!-- Facebook Pixel (add your pixel ID) -->
<script>
  !function(f,b,e,v,n,t,s){...}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
  OMARSOFT.analytics.fbPixel = 'YOUR_PIXEL_ID';
</script>
```

---

*Architecture by: OMARSOFT Engineering / Lead Architect BESTOMAR*
*All systems designed for: AR 🇹🇳 · FR 🇫🇷 · EN 🌍 · Future DE · IT · TR*
