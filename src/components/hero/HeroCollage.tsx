import { TRUSTED_PLATFORMS } from "@/data/content";
import GenreNote from "./GenreNote";
import HeroDrag from "./HeroDrag";
import HeroHeadline from "./HeroHeadline";
import HeroPortrait from "./HeroPortrait";
import Scribble from "./Scribble";
import TechnicalMarks from "./TechnicalMarks";

export default function HeroCollage() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" aria-hidden="true" />

      <div className="rip r1" aria-hidden="true" />
      <div className="rip r2" aria-hidden="true" />
      <div className="rip r3" aria-hidden="true" />

      <div className="tape">VIRUS404BEATS</div>
      <span className="micro-wave" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} />
        ))}
      </span>

      <HeroHeadline />
      <HeroPortrait />

      <HeroDrag>
        <div className="note craft" data-drag="craft" data-depth="14">
          CRAFTING
          <br />
          SONIC
          <br />
          EXPERIENCES
        </div>

        <GenreNote />

        <div className="paper sheet1" data-drag="sheet1" data-depth="12" aria-hidden="true">
          <h4>LIVE // RAW</h4>
          <p>
            NO POLISH.
            <br />
            NO SAFE MODE.
            <br />
            JUST SOUND.
          </p>
        </div>

        <div className="paper sheet2" data-drag="sheet2" data-depth="12" aria-hidden="true">
          <b>PRODUCTION / MIXING / MASTERING</b>
          <small>404 SIGNAL / ALWAYS ACTIVE</small>
        </div>

        <div className="paper sheet3" data-drag="sheet3" data-depth="12" aria-hidden="true">
          404
        </div>

        <Scribble />
        <TechnicalMarks />

        <div className="sticker s1" data-drag="sticker1" data-depth="16" aria-hidden="true">
          RAW AUDIO
        </div>
        <div className="sticker s2" data-drag="sticker2" data-depth="16" aria-hidden="true">
          EST. 404
        </div>
        <div className="sticker s3" data-drag="sticker3" data-depth="16" aria-hidden="true">
          REAL IMPACT
        </div>
        <div className="sticker s4" data-drag="sticker4" data-depth="16" aria-hidden="true">
          PARENTAL ADVISORY
        </div>
      </HeroDrag>

      <div className="trusted">
        <span>TRUSTED BY</span>
        {TRUSTED_PLATFORMS.map((name) => (
          <b key={name}>{name}</b>
        ))}
      </div>
    </section>
  );
}
