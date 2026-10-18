'use strict';

const VERSION = '2026-10-18-p1';
const SCOPE = new URL(self.registration.scope);
const CACHE_PREFIX = `phrasal-path-${encodeURIComponent(SCOPE.pathname)}-`;
const CACHE = `${CACHE_PREFIX}${VERSION}`;
// This release includes the complete local library, including every Ryan recording.
// Regenerate this inventory whenever content or asset filenames change.
const ASSETS = [
  "./app.js",
  "./assets/icon-180.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon.svg",
  "./assets/install-qr.png",
  "./audio/manifest.json",
  "./audio/p001-example.mp3",
  "./audio/p001.mp3",
  "./audio/p002-example.mp3",
  "./audio/p002.mp3",
  "./audio/p003-example.mp3",
  "./audio/p003.mp3",
  "./audio/p004-example.mp3",
  "./audio/p004.mp3",
  "./audio/p005-example.mp3",
  "./audio/p005.mp3",
  "./audio/p006-example.mp3",
  "./audio/p006.mp3",
  "./audio/p007-example.mp3",
  "./audio/p007.mp3",
  "./audio/p008-example.mp3",
  "./audio/p008.mp3",
  "./audio/p009-example.mp3",
  "./audio/p009.mp3",
  "./audio/p010-example.mp3",
  "./audio/p010.mp3",
  "./audio/p011-example.mp3",
  "./audio/p011.mp3",
  "./audio/p012-example.mp3",
  "./audio/p012.mp3",
  "./audio/p013-example.mp3",
  "./audio/p013.mp3",
  "./audio/p014-example.mp3",
  "./audio/p014.mp3",
  "./audio/p015-example.mp3",
  "./audio/p015.mp3",
  "./audio/p016-example.mp3",
  "./audio/p016.mp3",
  "./audio/p017-example.mp3",
  "./audio/p017.mp3",
  "./audio/p018-example.mp3",
  "./audio/p018.mp3",
  "./audio/p019-example.mp3",
  "./audio/p019.mp3",
  "./audio/p020-example.mp3",
  "./audio/p020.mp3",
  "./audio/p021-example.mp3",
  "./audio/p021.mp3",
  "./audio/p022-example.mp3",
  "./audio/p022.mp3",
  "./audio/p023-example.mp3",
  "./audio/p023.mp3",
  "./audio/p024-example.mp3",
  "./audio/p024.mp3",
  "./audio/p025-example.mp3",
  "./audio/p025.mp3",
  "./audio/p026-example.mp3",
  "./audio/p026.mp3",
  "./audio/p027-example.mp3",
  "./audio/p027.mp3",
  "./audio/p028-example.mp3",
  "./audio/p028.mp3",
  "./audio/p029-example.mp3",
  "./audio/p029.mp3",
  "./audio/p030-example.mp3",
  "./audio/p030.mp3",
  "./audio/p031-example.mp3",
  "./audio/p031.mp3",
  "./audio/p032-example.mp3",
  "./audio/p032.mp3",
  "./audio/p033-example.mp3",
  "./audio/p033.mp3",
  "./audio/p034-example.mp3",
  "./audio/p034.mp3",
  "./audio/p035-example.mp3",
  "./audio/p035.mp3",
  "./audio/p036-example.mp3",
  "./audio/p036.mp3",
  "./audio/p037-example.mp3",
  "./audio/p037.mp3",
  "./audio/p038-example.mp3",
  "./audio/p038.mp3",
  "./audio/p039-example.mp3",
  "./audio/p039.mp3",
  "./audio/p040-example.mp3",
  "./audio/p040.mp3",
  "./audio/p041-example.mp3",
  "./audio/p041.mp3",
  "./audio/p042-example.mp3",
  "./audio/p042.mp3",
  "./audio/p043-example.mp3",
  "./audio/p043.mp3",
  "./audio/p044-example.mp3",
  "./audio/p044.mp3",
  "./audio/p045-example.mp3",
  "./audio/p045.mp3",
  "./audio/p046-example.mp3",
  "./audio/p046.mp3",
  "./audio/p047-example.mp3",
  "./audio/p047.mp3",
  "./audio/p048-example.mp3",
  "./audio/p048.mp3",
  "./audio/p049-example.mp3",
  "./audio/p049.mp3",
  "./audio/p050-example.mp3",
  "./audio/p050.mp3",
  "./audio/p051-example.mp3",
  "./audio/p051.mp3",
  "./audio/p052-example.mp3",
  "./audio/p052.mp3",
  "./audio/p053-example.mp3",
  "./audio/p053.mp3",
  "./audio/p054-example.mp3",
  "./audio/p054.mp3",
  "./audio/p055-example.mp3",
  "./audio/p055.mp3",
  "./audio/p056-example.mp3",
  "./audio/p056.mp3",
  "./audio/p057-example.mp3",
  "./audio/p057.mp3",
  "./audio/p058-example.mp3",
  "./audio/p058.mp3",
  "./audio/p059-example.mp3",
  "./audio/p059.mp3",
  "./audio/p060-example.mp3",
  "./audio/p060.mp3",
  "./audio/p061-example.mp3",
  "./audio/p061.mp3",
  "./audio/p062-example.mp3",
  "./audio/p062.mp3",
  "./audio/p063-example.mp3",
  "./audio/p063.mp3",
  "./audio/p064-example.mp3",
  "./audio/p064.mp3",
  "./audio/p065-example.mp3",
  "./audio/p065.mp3",
  "./audio/p066-example.mp3",
  "./audio/p066.mp3",
  "./audio/p067-example.mp3",
  "./audio/p067.mp3",
  "./audio/p068-example.mp3",
  "./audio/p068.mp3",
  "./audio/p069-example.mp3",
  "./audio/p069.mp3",
  "./audio/p070-example.mp3",
  "./audio/p070.mp3",
  "./audio/p071-example.mp3",
  "./audio/p071.mp3",
  "./audio/p072-example.mp3",
  "./audio/p072.mp3",
  "./audio/p073-example.mp3",
  "./audio/p073.mp3",
  "./audio/p074-example.mp3",
  "./audio/p074.mp3",
  "./audio/p075-example.mp3",
  "./audio/p075.mp3",
  "./audio/p076-example.mp3",
  "./audio/p076.mp3",
  "./audio/p077-example.mp3",
  "./audio/p077.mp3",
  "./audio/p078-example.mp3",
  "./audio/p078.mp3",
  "./audio/p079-example.mp3",
  "./audio/p079.mp3",
  "./audio/p080-example.mp3",
  "./audio/p080.mp3",
  "./audio/p081-example.mp3",
  "./audio/p081.mp3",
  "./audio/p082-example.mp3",
  "./audio/p082.mp3",
  "./audio/p083-example.mp3",
  "./audio/p083.mp3",
  "./audio/p084-example.mp3",
  "./audio/p084.mp3",
  "./audio/p085-example.mp3",
  "./audio/p085.mp3",
  "./audio/p086-example.mp3",
  "./audio/p086.mp3",
  "./audio/p087-example.mp3",
  "./audio/p087.mp3",
  "./audio/p088-example.mp3",
  "./audio/p088.mp3",
  "./audio/p089-example.mp3",
  "./audio/p089.mp3",
  "./audio/p090-example.mp3",
  "./audio/p090.mp3",
  "./audio/p091-example.mp3",
  "./audio/p091.mp3",
  "./audio/p092-example.mp3",
  "./audio/p092.mp3",
  "./audio/p093-example.mp3",
  "./audio/p093.mp3",
  "./audio/p094-example.mp3",
  "./audio/p094.mp3",
  "./audio/p095-example.mp3",
  "./audio/p095.mp3",
  "./audio/p096-example.mp3",
  "./audio/p096.mp3",
  "./audio/p097-example.mp3",
  "./audio/p097.mp3",
  "./audio/p098-example.mp3",
  "./audio/p098.mp3",
  "./audio/p099-example.mp3",
  "./audio/p099.mp3",
  "./audio/p100-example.mp3",
  "./audio/p100.mp3",
  "./audio/p101-example.mp3",
  "./audio/p101.mp3",
  "./audio/p102-example.mp3",
  "./audio/p102.mp3",
  "./audio/p103-example.mp3",
  "./audio/p103.mp3",
  "./audio/p104-example.mp3",
  "./audio/p104.mp3",
  "./audio/p105-example.mp3",
  "./audio/p105.mp3",
  "./audio/p106-example.mp3",
  "./audio/p106.mp3",
  "./audio/p107-example.mp3",
  "./audio/p107.mp3",
  "./audio/p108-example.mp3",
  "./audio/p108.mp3",
  "./audio/p109-example.mp3",
  "./audio/p109.mp3",
  "./audio/p110-example.mp3",
  "./audio/p110.mp3",
  "./audio/p111-example.mp3",
  "./audio/p111.mp3",
  "./audio/p112-example.mp3",
  "./audio/p112.mp3",
  "./audio/p113-example.mp3",
  "./audio/p113.mp3",
  "./audio/p114-example.mp3",
  "./audio/p114.mp3",
  "./audio/p115-example.mp3",
  "./audio/p115.mp3",
  "./audio/p116-example.mp3",
  "./audio/p116.mp3",
  "./audio/p117-example.mp3",
  "./audio/p117.mp3",
  "./audio/p118-example.mp3",
  "./audio/p118.mp3",
  "./audio/p119-example.mp3",
  "./audio/p119.mp3",
  "./audio/p120-example.mp3",
  "./audio/p120.mp3",
  "./audio/p121-example.mp3",
  "./audio/p121.mp3",
  "./audio/p122-example.mp3",
  "./audio/p122.mp3",
  "./audio/p123-example.mp3",
  "./audio/p123.mp3",
  "./audio/p124-example.mp3",
  "./audio/p124.mp3",
  "./audio/p125-example.mp3",
  "./audio/p125.mp3",
  "./audio/p126-example.mp3",
  "./audio/p126.mp3",
  "./audio/p127-example.mp3",
  "./audio/p127.mp3",
  "./audio/p128-example.mp3",
  "./audio/p128.mp3",
  "./audio/p129-example.mp3",
  "./audio/p129.mp3",
  "./audio/p130-example.mp3",
  "./audio/p130.mp3",
  "./audio/p131-example.mp3",
  "./audio/p131.mp3",
  "./audio/p132-example.mp3",
  "./audio/p132.mp3",
  "./audio/p133-example.mp3",
  "./audio/p133.mp3",
  "./audio/p134-example.mp3",
  "./audio/p134.mp3",
  "./audio/p135-example.mp3",
  "./audio/p135.mp3",
  "./audio/p136-example.mp3",
  "./audio/p136.mp3",
  "./audio/p137-example.mp3",
  "./audio/p137.mp3",
  "./audio/p138-example.mp3",
  "./audio/p138.mp3",
  "./audio/p139-example.mp3",
  "./audio/p139.mp3",
  "./audio/p140-example.mp3",
  "./audio/p140.mp3",
  "./audio/p141-example.mp3",
  "./audio/p141.mp3",
  "./audio/p142-example.mp3",
  "./audio/p142.mp3",
  "./audio/p143-example.mp3",
  "./audio/p143.mp3",
  "./audio/p144-example.mp3",
  "./audio/p144.mp3",
  "./audio/p145-example.mp3",
  "./audio/p145.mp3",
  "./audio/p146-example.mp3",
  "./audio/p146.mp3",
  "./audio/p147-example.mp3",
  "./audio/p147.mp3",
  "./audio/p148-example.mp3",
  "./audio/p148.mp3",
  "./audio/p149-example.mp3",
  "./audio/p149.mp3",
  "./audio/p150-example.mp3",
  "./audio/p150.mp3",
  "./audio/p151-example.mp3",
  "./audio/p151.mp3",
  "./audio/p152-example.mp3",
  "./audio/p152.mp3",
  "./audio/p153-example.mp3",
  "./audio/p153.mp3",
  "./audio/p154-example.mp3",
  "./audio/p154.mp3",
  "./audio/p155-example.mp3",
  "./audio/p155.mp3",
  "./audio/p156-example.mp3",
  "./audio/p156.mp3",
  "./audio/p157-example.mp3",
  "./audio/p157.mp3",
  "./audio/p158-example.mp3",
  "./audio/p158.mp3",
  "./audio/p159-example.mp3",
  "./audio/p159.mp3",
  "./audio/p160-example.mp3",
  "./audio/p160.mp3",
  "./audio/p161-example.mp3",
  "./audio/p161.mp3",
  "./audio/p162-example.mp3",
  "./audio/p162.mp3",
  "./audio/p163-example.mp3",
  "./audio/p163.mp3",
  "./audio/p164-example.mp3",
  "./audio/p164.mp3",
  "./audio/p165-example.mp3",
  "./audio/p165.mp3",
  "./audio/p166-example.mp3",
  "./audio/p166.mp3",
  "./audio/p167-example.mp3",
  "./audio/p167.mp3",
  "./audio/p168-example.mp3",
  "./audio/p168.mp3",
  "./audio/p169-example.mp3",
  "./audio/p169.mp3",
  "./audio/p170-example.mp3",
  "./audio/p170.mp3",
  "./audio/p171-example.mp3",
  "./audio/p171.mp3",
  "./audio/p172-example.mp3",
  "./audio/p172.mp3",
  "./audio/p173-example.mp3",
  "./audio/p173.mp3",
  "./audio/p174-example.mp3",
  "./audio/p174.mp3",
  "./audio/p175-example.mp3",
  "./audio/p175.mp3",
  "./audio/p176-example.mp3",
  "./audio/p176.mp3",
  "./audio/p177-example.mp3",
  "./audio/p177.mp3",
  "./audio/p178-example.mp3",
  "./audio/p178.mp3",
  "./audio/p179-example.mp3",
  "./audio/p179.mp3",
  "./audio/p180-example.mp3",
  "./audio/p180.mp3",
  "./audio/p181-example.mp3",
  "./audio/p181.mp3",
  "./audio/p182-example.mp3",
  "./audio/p182.mp3",
  "./audio/p183-example.mp3",
  "./audio/p183.mp3",
  "./audio/p184-example.mp3",
  "./audio/p184.mp3",
  "./audio/p185-example.mp3",
  "./audio/p185.mp3",
  "./audio/p186-example.mp3",
  "./audio/p186.mp3",
  "./audio/p187-example.mp3",
  "./audio/p187.mp3",
  "./audio/p188-example.mp3",
  "./audio/p188.mp3",
  "./audio/p189-example.mp3",
  "./audio/p189.mp3",
  "./audio/p190-example.mp3",
  "./audio/p190.mp3",
  "./audio/p191-example.mp3",
  "./audio/p191.mp3",
  "./audio/p192-example.mp3",
  "./audio/p192.mp3",
  "./audio/p193-example.mp3",
  "./audio/p193.mp3",
  "./audio/p194-example.mp3",
  "./audio/p194.mp3",
  "./audio/p195-example.mp3",
  "./audio/p195.mp3",
  "./audio/p196-example.mp3",
  "./audio/p196.mp3",
  "./audio/p197-example.mp3",
  "./audio/p197.mp3",
  "./audio/p198-example.mp3",
  "./audio/p198.mp3",
  "./audio/p199-example.mp3",
  "./audio/p199.mp3",
  "./audio/p200-example.mp3",
  "./audio/p200.mp3",
  "./data.js",
  "./engine.js",
  "./index.html",
  "./manifest.webmanifest",
  "./offline.js",
  "./research.js",
  "./style.css"
];
const URLS = ASSETS.map(path => new URL(path, SCOPE).href);
const URL_SET = new Set(URLS);
const INDEX_URL = new URL('./index.html', SCOPE).href;
const CORE = ['./index.html', './style.css', './app.js', './data.js', './engine.js', './research.js', './offline.js', './manifest.webmanifest'];
let preparation = null;
let status = { type: 'PHRASAL_PATH_OFFLINE_STATUS', version: VERSION, state: 'downloading', completed: 0, total: URLS.length };

async function publish(state, completed) {
  status = { ...status, state, completed };
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of clients) {
    if (client.url.startsWith(SCOPE.href)) client.postMessage(status);
  }
}

async function storeComplete(cache, url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    // Never persist a partial audio response. The request deliberately has no Range header.
    const response = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin', signal: controller.signal }));
    if (response.status !== 200 || response.type === 'opaque') throw new Error('Incomplete resource');
    await cache.put(url, response);
  } finally {
    clearTimeout(timeout);
  }
}

async function inventory(cache) {
  const missing = [];
  for (const url of URLS) {
    const response = await cache.match(url);
    if (!response || response.status !== 200) missing.push(url);
  }
  return missing;
}

async function prepareOffline() {
  if (preparation) return preparation;
  preparation = (async () => {
    try {
      const cache = await caches.open(CACHE);
      const missing = await inventory(cache);
      let completed = URLS.length - missing.length;
      await publish('downloading', completed);
      let cursor = 0;
      // Four concurrent downloads are gentle on mobile connections and resume individually.
      await Promise.all(Array.from({ length: Math.min(4, missing.length) }, async () => {
        while (cursor < missing.length) {
          const url = missing[cursor++];
          try {
            await storeComplete(cache, url);
            completed += 1;
            if (completed % 8 === 0 || completed === URLS.length) await publish('downloading', completed);
          } catch (_) {
            // Keep successful files. A retry downloads only the ones still missing.
          }
        }
      }));
      const remaining = await inventory(cache);
      if (remaining.length) {
        await publish('error', URLS.length - remaining.length);
        return;
      }
      await publish('ready', URLS.length);
      // CacheStorage is shared by all Pages projects on this origin; only remove our scope.
      for (const key of await caches.keys()) {
        if (key.startsWith(CACHE_PREFIX) && key !== CACHE) await caches.delete(key);
      }
    } catch (_) {
      await publish('error', status.completed);
    }
  })();
  try { await preparation; } finally { preparation = null; }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(CORE.map(path => storeComplete(cache, new URL(path, SCOPE).href)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  // Finish activation promptly, so online reading/playback is not blocked while
  // the whole library downloads. offline.js starts the durable message event.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
  if (event.data?.type !== 'PHRASAL_PATH_PREPARE_OFFLINE') return;
  event.waitUntil(prepareOffline());
});

async function rangedAudio(response, range) {
  const data = await response.arrayBuffer();
  const size = data.byteLength;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
  const invalid = () => new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}`, 'Accept-Ranges': 'bytes' } });
  if (!match || (!match[1] && !match[2]) || !size) return invalid();
  let start, end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return invalid();
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) return invalid();
    end = Math.min(end, size - 1);
  }
  const headers = new Headers(response.headers);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Content-Type', 'audio/mpeg');
  headers.delete('Content-Encoding');
  return new Response(data.slice(start, end + 1), { status: 206, statusText: 'Partial Content', headers });
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
  url.search = '';
  url.hash = '';
  const isNavigation = event.request.mode === 'navigate';
  const cacheURL = isNavigation ? INDEX_URL : url.href;
  if (!isNavigation && !URL_SET.has(cacheURL)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(cacheURL);
    if (cached?.status === 200) {
      const range = event.request.headers.get('range');
      if (range && /\.mp3$/i.test(url.pathname)) return rangedAudio(cached, range);
      return cached;
    }
    // During the first download users can already read and play audio online.
    // Only the complete-library job writes to the versioned cache.
    return fetch(event.request);
  })());
});
