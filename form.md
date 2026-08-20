# virus404beats — Content Form

Fill in / verify everything here. Every answer maps to a field in **`src/config/site.ts`**.
Fields already prefilled from your info — just verify; fields marked **[TODO]** need real values.

---

## 1. Contact

| Question | Answer | Config field |
|---|---|---|
| WhatsApp number (with country code, digits only, e.g. `919876543210`) | **[TODO] `91XXXXXXXXXX`** | `contact.whatsapp` |
| WhatsApp prefill message | `Hi virus404! I want to book a beat / mixing & mastering session.` | `contact.whatsappMessage` |
| Email | **[TODO] `hello@virus404beats.com`** | `contact.email` |
| YouTube handle | `@virus404beats` | `contact.youtube` |
| Instagram handle | `virus404beats` *(verify)* | `contact.instagram` |
| SoundCloud link | _(none yet)_ | `contact.soundcloud` |
| SoundBetter profile | `https://soundbetter.com/profiles/451361-virus404` | `contact.soundbetter` |
| Spotify artist link | **[TODO]** | `contact.spotify` |

## 2. Streaming links (platforms strip)

Each platform icon links to your artist page. Fill **[TODO]** ones:

| Platform | Link |
|---|---|
| Spotify | `contact.spotify` (from §1) |
| YouTube Music | `contact.youtube` |
| Amazon Music | **[TODO]** `platforms[2].href` |
| Deezer | **[TODO]** `platforms[3].href` |
| iTunes | **[TODO]** `platforms[4].href` |
| Beatport | **[TODO]** `platforms[5].href` |
| Apple Music | **[TODO]** `platforms[6].href` |
| Tidal | **[TODO]** `platforms[7].href` |

## 3. Releases (`releases[]`)

| Year | Title | Credits | Stream link |
|---|---|---|---|
| 2026 | ANTISOCIAL | UNFILTERED AKASH, MISHI B & Virus404 | **[TODO]** |
| 2023 | REAL DEAL | YxvngSha_dre & Virus404 | **[TODO]** |
| 2023 | 09:22 / PAISA, NASHA, FAME | YxvngSha_dre, Virus404, tobehoyejak | **[TODO]** |

Each release also links to YouTube (`https://youtube.com/@virus404beats`). Covers: `public/images/album-1..3.avif`.

## 4. Beats list (`beats[]`)

| Title | Meta | Year | Link |
|---|---|---|---|
| ANTISOCIAL | Single · UNFILTERED AKASH, MISHI B & Virus404 | 2026 | **[TODO]** |
| NO CAP | Dead V feat. M Zee Cubist & Virus404 | 2024 | **[TODO]** |
| REAL DEAL | YxvngSha_dre & Virus404 | 2023 | **[TODO]** |
| 09:22 | YxvngSha_dre, Virus404 & tobehoyejak | 2023 | **[TODO]** |
| PAISA, NASHA, FAME | YxvngSha_dre feat. Virus404 | 2023 | **[TODO]** |
| BLOODINK tracks | Various — featuring Virus404 | 2022 | **[TODO]** |
| INFINITY | Mix & Master · SBVIEW & X Rhymer | 2024 | **[TODO]** |

## 5. Services (`services[]`) — verified

| Service | Price | Note | Includes |
|---|---|---|---|
| Beat Production | ₹999 – ₹1,999 | based on difficulty | Original composition · Type beats & custom beats · Stems + tagged/un-tagged mp3/wav · 48-hour turnaround |
| Mixing & Mastering | ₹499 – ₹799 | per track, based on difficulty | Vocal mixing · Full-track mastering · Reference matching · Revision passes |

Change prices here and they update site-wide. `services[].cta` opens WhatsApp.

## 6. Hero

| Question | Answer | Config field |
|---|---|---|
| Title line 1 / line 2 | `VIRUS` / `404` | `hero.title` |
| Kicker | `Music Producer / Beatmaker` | `hero.kicker` |
| Subtitle | *"Beats, production & mix/master for rap, trap, R&B, afrobeat and beyond. Original compositions from Kolkata — delivered in 48 hours."* | `hero.subtitle` |
| Primary CTA | `Book a beat` → WhatsApp | `hero.ctaPrimary` |
| Secondary CTA | `Listen on YouTube` | `hero.ctaSecondary` |
| Sound toggle demo | **[TODO]** your audio → `public/audio/track.mp3` (any mp3; used for the demo EQ/sound button) | `hero.sound.src` |

## 7. Genres marquee (`genres[]`) — verified

`Hip-Hop · Trap · R&B / Soul · Afrobeat · Reggaeton · EDM · Chill`

## 8. About

| Question | Answer | Config field |
|---|---|---|
| Kicker | `The producer` | `about.kicker` |
| Title | `LIFE` / `WORKS` | `about.title` |
| Bio | *2 paragraphs — independent producer/beatmaker from Kolkata, rap/hip-hop/trap + R&B, afrobeat, reggaeton, EDM, chill; original compositions, custom drums, no default loops; 48-hour turnaround* | `about.bio` |
| Counters | 100+ Projects · 7 Genres · 48h Turnaround | `about.counters` |
| Facts | Original beatmaking · Mix & master engineer · Released collabs since 2022 · 100s of individual projects | `about.facts` |

## 9. Site metadata (`site`)

| Field | Value |
|---|---|
| Name / legal name | `virus404` / `Virus404` |
| Tagline | `Kolkata-based music producer, beatmaker & mix/master engineer` |
| Description (SEO) | `Rap, hip-hop & trap beats from Kolkata. Original compositions, type beats, experimental hip-hop, mixing and mastering. Book a beat in 48 hours.` |
| URL | `https://virus404beats.vercel.app` |

## 10. Sections on/off + per-section theme

| Section | Enabled | Theme |
|---|---|---|
| Hero | ✅ | default (`lime`) |
| Genres marquee | ✅ | default |
| Featured releases | ✅ | `lime` |
| Services | ✅ | default |
| Beats list | ✅ | `lime` |
| Gallery | ✅ | default |
| About | ✅ | default |
| Contact | ✅ | `amber` |

Themes available: `lime`, `amber`, `neon`, `blood` (see `.docs/theme-presets.md`). Set `enabled: false` to hide a section.

## 11. Navigation & footer

- Nav links: Beats `#featured` · Services `#services` · Recent `#beats` · Gallery `#gallery` · About `#about` · Contact `#contact` (`nav.links`)
- Footer blurb: `Beats, production & mix/master. Made in Kolkata.` + Links / Follow columns (`footer`)

---

**After editing `src/config/site.ts`, nothing else needs to change** — components render from config.