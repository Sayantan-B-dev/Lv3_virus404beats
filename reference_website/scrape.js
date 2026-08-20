// scrape.js — Zero-dependency Node.js mirror of https://www.paulkalkbrenner.net/
// Usage: node scrape.js  (Node >= 18, uses global fetch)
'use strict';
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://www.paulkalkbrenner.net/';
const OUT = __dirname;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// Hosts mirrored locally. Everything else stays hotlinked (external services).
const MIRROR_HOSTS = new Set([
  'cdn.prod.website-files.com',
  'd3e54v103j8qbb.cloudfront.net',
  'cdn.odyn.dev',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'ilja-dev.b-cdn.net',
]);

const catOf = (u) => {
  const p = new URL(u).pathname.toLowerCase();
  if (p.endsWith('.css')) return 'css';
  if (p.endsWith('.js')) return 'js';
  if (/\.(woff2?|ttf|otf|eot)$/.test(p)) return 'fonts';
  if (/\.(mp3|wav|ogg|m4a|aac)$/.test(p)) return 'audio';
  return 'img';
};

// absolute local path for a mirrored URL
const localPathFor = (u) => {
  const url = new URL(u);
  const cat = catOf(u);
  if (cat === 'img') {
    return path.join(OUT, 'assets', 'img', url.host, url.pathname.replace(/^\//, '').split('/').join(path.sep));
  }
  let base = decodeURIComponent(path.basename(url.pathname)).replace(/[<>:"/\\|?*]+/g, '_').trim();
  if (!base) base = 'asset_' + Math.abs(u.length);
  return path.join(OUT, 'assets', cat, base);
};

const relFrom = (fromFile, toAbs) => {
  let r = path.relative(path.dirname(fromFile), toAbs).split(path.sep).join('/');
  if (!r.startsWith('.')) r = './' + r;
  return r;
};

const log = (msg) => console.log(msg);

// ---------- URL extraction ----------
const absUrl = (ref, base) => {
  try { return new URL(ref, base).href; } catch { return null; }
};

const cleanUrl = (s) => s.replace(/[),\]}]+$/, '');

function extractFromHTML(html, base) {
  const urls = new Set();
  const re = /(?:https?:)?\/\/[^\s"'<>]+/g;
  let m;
  while ((m = re.exec(html))) {
    let s = cleanUrl(m[0]);
    if (s.startsWith('//')) s = 'https:' + s;
    const u = absUrl(s.replace(/&amp;/g, '&'), base);
    if (u && new URL(u).pathname !== '/') urls.add(u);
  }
  return urls;
}

function extractFromCSS(css, base) {
  const urls = new Set();
  const re = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let m;
  while ((m = re.exec(css))) {
    const u = absUrl(m[1], base);
    if (u) urls.add(u);
  }
  return urls;
}

function extractFromJS(js, base) {
  const urls = new Set();
  const re = /(?:https?:)?\/\/[^\s"'<>]+/g;
  let m;
  while ((m = re.exec(js))) {
    let s = cleanUrl(m[0]);
    if (s.startsWith('//')) s = 'https:' + s;
    const u = absUrl(s, base);
    if (u && new URL(u).pathname !== '/') urls.add(u);
  }
  return urls;
}

// ---------- fetching ----------
async function fetchText(u) {
  const res = await fetch(u, { headers: { 'user-agent': UA, accept: '*/*' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('text/html') || ct.includes('javascript') || ct.includes('css') || ct.includes('xml')) {
    return { text: await res.text(), buf: null };
  }
  return { text: null, buf: Buffer.from(await res.arrayBuffer()) };
}

async function download(u) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { text, buf } = await fetchText(u);
      return { text, buf };
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
}

async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

// ---------- main ----------
async function main() {
  log('Fetching ' + SITE_URL);
  const page = await download(SITE_URL);
  if (!page.text) throw new Error('No HTML text');
  fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'index.html'), page.text);

  // 1. discover all URLs
  const found = new Map(); // url -> category
  const add = (u, cat) => { if (MIRROR_HOSTS.has(new URL(u).host) && new URL(u).pathname !== '/') found.set(u, cat); };
  for (const u of extractFromHTML(page.text, SITE_URL)) add(u, catOf(u));

  // text files to also scan + rewrite
  const textFiles = new Map(); // absPath -> { url, base, text }
  const markText = (u, base) => {
    if (!MIRROR_HOSTS.has(new URL(u).host)) return;
    const p = localPathFor(u);
    textFiles.set(p, { url: u, base, text: null });
  };

  // 2. first pass: download CSS/JS, scan them, then download remaining assets
  let pass = 0;
  while (true) {
    pass++;
    const toScan = [...found.entries()].filter(([u]) => ['css', 'js'].includes(catOf(u)));
    if (toScan.length === 0) break;
    // remove scanned so next loop doesn't rescan; mark as textFiles
    for (const [u] of toScan) found.delete(u);
    await pool(toScan, 6, async ([u]) => {
      try {
        const d = await download(u);
        markText(u, u);
        if (d.text) textFiles.get(localPathFor(u)).text = d.text;
      } catch (e) { log('SKIP (scan) ' + u + ' :: ' + e.message); }
    });
    const newFound = new Set();
    for (const [, tf] of textFiles) {
      if (!tf.text) continue;
      const ex = tf.url.endsWith('.css') || /\.css(?:\?|$)/.test(tf.url) ? extractFromCSS(tf.text, tf.url) : extractFromJS(tf.text, tf.url);
      for (const u of ex) {
        if (MIRROR_HOSTS.has(new URL(u).host)) {
          const c = catOf(u);
          if (!found.has(u)) { found.set(u, c); newFound.add(u); }
        }
      }
    }
    if (newFound.size === 0) break;
    if (pass > 4) break;
  }

  // 3. download all remaining (non text-file) assets
  const downloads = [...found.entries()].map(([u, cat]) => ({ u, cat }));
  log('Mirroring ' + downloads.length + ' assets');
  const manifest = {};
  let ok = 0, fail = 0;
  await pool(downloads, 8, async ({ u, cat }) => {
    const dest = localPathFor(u);
    try {
      const d = await download(u);
      if (d.buf) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, d.buf);
        manifest[u] = relFrom(path.join(OUT, 'index.html'), dest);
        ok++;
      } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, d.text);
        manifest[u] = relFrom(path.join(OUT, 'index.html'), dest);
        ok++;
      }
    } catch (e) { fail++; log('FAIL ' + u + ' :: ' + e.message); }
  });
  log('Downloaded ' + ok + ', failed ' + fail);

  // 4. rewrite references in all text files
  const urlMap = {}; // url -> local abs path (html+css+js scanned files AND downloaded assets)
  for (const [p, tf] of textFiles) urlMap[tf.url] = p;
  for (const u of Object.keys(manifest)) urlMap[u] = localPathFor(u);

  const rewrite = (content, fromFile) => {
    for (const [u, dest] of Object.entries(urlMap)) {
      const rel = relFrom(fromFile, dest);
      // exact, decoded, and &amp;-escaped variants
      content = content.split(u).join(rel);
      const amp = u.replace(/&/g, '&amp;');
      if (amp !== u) content = content.split(amp).join(rel);
      try {
        const dec = decodeURIComponent(u);
        if (dec !== u) content = content.split(dec).join(rel);
      } catch {}
      if (u.startsWith('https:')) content = content.split('//' + u.slice(8)).join(rel.replace(/^\.?\//, ''));
    }
    return content;
  };

  const filesToRewrite = new Map();
  filesToRewrite.set(path.join(OUT, 'index.html'), page.text);
  for (const [p, tf] of textFiles) filesToRewrite.set(p, tf.text);

  for (const [p, content] of filesToRewrite) {
    if (!content) continue;
    let out = rewrite(content, p);
    // strip SRI + crossorigin on self-hosted resources
    out = out.replace(/integrity="[^"]*"\s*/g, '').replace(/crossorigin="anonymous"\s*/g, '');
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, out);
  }

  fs.writeFileSync(path.join(OUT, 'assets', 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('Done. manifest: ' + Object.keys(manifest).length + ' files');
}

main().catch((e) => { console.error(e); process.exit(1); });