// OMARSOFT BESTOMAR — Service Worker v3.0.0
// Generated: 2026-07-21
// Strategy: Cache-first for static, Network-first for HTML

const CACHE_NAME    = 'omarsoft-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap',
];

// ── INSTALL ──────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing OMARSOFT v3...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS.map(url => {
        return new Request(url, { credentials: 'same-origin' });
      })).catch(err => {
        console.warn('[SW] Pre-cache partial failure (expected for local):', err);
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating OMARSOFT v3...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// ── FETCH ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and cross-origin analytics/WA
  if(event.request.method !== 'GET') return;
  if(url.hostname === 'wa.me') return;
  if(url.hostname.includes('google-analytics')) return;
  if(url.hostname.includes('facebook')) return;
  if(url.hostname.includes('tinyurl')) return;

  // HTML pages: Network-first (always fresh)
  if(event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Fonts: Cache-first (long-lived)
  if(url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(res => {
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
          return res;
        });
      })
    );
    return;
  }

  // Static assets: Cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      return fetch(event.request).then(res => {
        if(!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      }).catch(() => {
        // Offline fallback
        if(event.request.destination === 'image') return new Response('', {status: 204});
        return caches.match('/') || new Response('Offline', {status: 503});
      });
    })
  );
});

// ── BACKGROUND SYNC (future: form submissions) ───────────
self.addEventListener('sync', event => {
  if(event.tag === 'sync-contact-form') {
    console.log('[SW] Syncing contact form...');
    // TODO: Implement form sync when backend is ready
  }
});

// ── PUSH NOTIFICATIONS (future) ──────────────────────────
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'OMARSOFT BESTOMAR';
  const options = {
    body: data.body || 'رسالة جديدة من BESTOMAR',
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    tag: data.tag || 'omarsoft-notification',
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '🔗 فتح' },
      { action: 'dismiss', title: '✕ إغلاق' },
    ],
    dir: 'rtl',
    lang: 'ar',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if(event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});

console.log('[OMARSOFT SW v3.0] Ready — BEST FUTURE WITH BESTOMAR');
