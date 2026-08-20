// copy-assets.mjs — copies reference site images into public/images with simple names.
// Re-run after re-scraping: node scripts/copy-assets.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REF = path.join(__dirname, '..', 'reference_website', 'assets', 'img');
const OUT = path.join(__dirname, '..', 'public', 'images');

// source filename -> target name (targets are simple; user replaces files manually later)
const MAP = {
  '6a2aba6a76a163ef813b6fef_loader-1.avif': 'hero-1.avif',
  '6a2aba6bac6397334ba8df9f_loader-2.avif': 'hero-2.avif',
  '6a2aba6b97311393e65f3861_loader-3.avif': 'hero-3.avif',
  '6a2aba6a6ee69c4e0602298c_loader-4.avif': 'hero-4.avif',
  '6a2aba6b485f26467441e65a_loader-5.avif': 'hero-5.avif',
  '6a2aba6ba0f2a00ae45afd65_loader-6.avif': 'hero-6.avif',
  '6a2bd331063f8696864b24b7_PaulKalkbrenner_Cover_Press_Shoot_SvenjaAva_8%20(1)%201.avif': 'break-1.avif',
  '69c5c21b55849a1105d8a75b_pk-action-1.avif': 'break-2.avif',
  '69cfcdcd4e62b24f356aecea_pk-albums-portrait.avif': 'album-1.avif',
  '69e20ccac52305475b351ad5_Parts%20of%20Life%20BW.avif': 'album-2.avif',
  '69e21844f61ee8788a288203_7%20BW.avif': 'album-3.avif',
  '69f9bdee7dcf4184168dccc3_image-strip-1.avif': 'gallery-1.avif',
  '69f9bdff459695ca6d9b36a5_life-portrait.avif': 'gallery-2.avif',
  '69f9bdff4fb1ef440c9da42d_impact-concert.avif': 'gallery-3.avif',
  '69f9be110b1ad608378ed76e_pk-tours-portrait-2.avif': 'gallery-4.avif',
  '69f9be114a50cd1a75fa6105_pk-journey.avif': 'gallery-5.avif',
  '6a2c1c285482561a3879b323_00002%20PK%20LIVE%20-%202024.avif': 'gallery-6.avif',
  '69c5c21badf9ed7cbbbd8f4a_pk-journey.avif': 'about.avif',
  '69c5c21bb84a2b31f9b3fdc9_pk-tours-portrait.avif': 'portrait.avif',
  '69c65e0bafe9f3a065c7ad8c_image-strip-1.avif': 'marquee-1.avif',
  '69c65e10db69da6b85d89347_image-strip-2.avif': 'marquee-2.avif',
  '69c65e1922f2ec5747a7279a_image-strip-3.avif': 'marquee-3.avif',
  '69c65e1f9be8bcd4289f7a3e_image-strip-4.avif': 'marquee-4.avif',
  '69c65e2628c619e4b3f344e5_image-strip-5.avif': 'marquee-5.avif',
  '69c65e2b9be8bcd4289f7c49_image-strip-6.avif': 'marquee-6.avif',
  '69c65e310c96017d071cf49d_image-strip-7.avif': 'marquee-7.avif',
  '69c65e42cce178473756c1b5_image-strip-8.avif': 'marquee-8.avif',
  '69c65e4aeffd52e09f027758_image-strip-9.avif': 'marquee-9.avif',
  '69cfce7a83e5f0dba920c62f_noise-white-500.avif': 'noise.avif',
  '69ea042d268958f4c9b6962e_noise-strip.png': 'noise-strip.png',
  '6a2c222a162ee1aa4d244cdb_og_image.png': 'og.png',
  '69ce6b62781e1a8befed75fd_logo-spotify.svg': 'platforms/spotify.svg',
  '69ce6b4400cd728b5be25260_logo-youtube-music.svg': 'platforms/youtube-music.svg',
  '69ce6b1a519d44ded250cbbe_logo-amazon-music.svg': 'platforms/amazon-music.svg',
  '69ce6b0ea8da7a02b7b3e2f7_logo-deezer.svg': 'platforms/deezer.svg',
  '69ce6ac778f356b0899fbd1e_logo-itunes.svg': 'platforms/itunes.svg',
  '6a0478bdd7e87cc5ae163ad9_logo-beatport.svg': 'platforms/beatport.svg',
  '69ce6a8c2c5c6e5f80a0073c_logo-apple-music.svg': 'platforms/apple-music.svg',
  '69ce6a752245eac265da8f80_logo-tidal.svg': 'platforms/tidal.svg',
};

const all = fs.readdirSync(REF, { recursive: true }).filter((f) => fs.statSync(path.join(REF, f)).isFile());
const found = new Map(all.map((f) => [path.basename(f), f]));
let copied = 0;
const missing = [];
for (const [srcName, target] of Object.entries(MAP)) {
  const src = found.get(srcName);
  if (!src) { missing.push(srcName); continue; }
  const dest = path.join(OUT, target);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(REF, src), dest);
  copied++;
}
console.log(`copied ${copied}/${Object.keys(MAP).length}`);
if (missing.length) console.log('MISSING:', missing.join('\n'));

// favicon: simple "V" monogram
const fav = path.join(OUT, '..', 'favicon.svg');
fs.writeFileSync(fav, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#0a0a0a"/><path d="M14 18 32 50 50 18" fill="none" stroke="#a7ff9c" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
console.log('favicon.svg written');
