// verify.js — check the local mirror is self-contained
const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
const localRe = /(?:\.\/)?assets\/(img|css|js|fonts|audio)\/[^\s"'>]+/g;
const localRefs = [...new Set(html.match(localRe) || [])];
const cdnHosts = ['cdn.prod.website-files.com', 'cdn.odyn.dev', 'd3e54v103j8qbb.cloudfront.net', 'unpkg.com', 'cdn.jsdelivr.net', 'ilja-dev.b-cdn.net'];
const leftover = cdnHosts.filter((h) => html.includes(h));
console.log('index.html local refs:', localRefs.length);
console.log('index.html leftover mirror-host refs:', leftover.length ? leftover : 'NONE');

// check each local ref resolves to an existing file
const missing = [];
for (const ref of localRefs) {
  const p = path.join(OUT, ref.replace(/^\.\//, '').split('/').join(path.sep));
  if (!fs.existsSync(p)) missing.push(ref);
}
console.log('missing files:', missing.length ? missing : 'NONE');

// check css/js files for leftover mirror URLs
for (const dir of ['css', 'js']) {
  const files = fs.readdirSync(path.join(OUT, 'assets', dir));
  let left = [];
  for (const f of files) {
    const txt = fs.readFileSync(path.join(OUT, 'assets', dir, f), 'utf8');
    for (const h of cdnHosts) if (txt.includes(h)) { left.push(`${dir}/${f} :: ${h}`); break; }
  }
  console.log(`assets/${dir} leftover mirror refs:`, left.length ? left : 'NONE');
}

const man = JSON.parse(fs.readFileSync(path.join(OUT, 'assets', 'manifest.json'), 'utf8'));
console.log('manifest entries:', Object.keys(man).length);
const imgCount = (function count(d) { return fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(d, e.name)) : 1), 0); })(path.join(OUT, 'assets', 'img'));
console.log('img files:', imgCount);

const audioRefs = [...new Set(html.match(/assets\/audio\/[^"']+/g) || [])];
for (const r of audioRefs) console.log('audio ref ok:', fs.existsSync(path.join(OUT, r.replace(/\//g, path.sep))), r);
const pre = html.match(/<link[^>]*preconnect[^>]*>/g) || [];
console.log('preconnect tags (intentionally kept):', pre.length);