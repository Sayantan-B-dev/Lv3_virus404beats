import { TRUSTED_PLATFORMS } from "@/data/content";
import CollageJitter from "./CollageJitter";
import GenreNote from "./GenreNote";
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

      <CollageJitter>
        <div className="note craft">
          CRAFTING
          <br />
          SONIC
          <br />
          EXPERIENCES
        </div>

        <GenreNote />

        <div className="paper sheet1" aria-hidden="true">
          <h4>LIVE // RAW</h4>
          <p>
            NO POLISH.
            <br />
            NO SAFE MODE.
            <br />
            JUST SOUND.
          </p>
        </div>

        <div className="paper sheet2" aria-hidden="true">
          <b>PRODUCTION / MIXING / MASTERING</b>
          <small>404 SIGNAL / ALWAYS ACTIVE</small>
        </div>

        <div className="paper sheet3" aria-hidden="true">
          404
        </div>

        <Scribble />
        <TechnicalMarks />
      </CollageJitter>

      <div className="sticker s1" aria-hidden="true">
        RAW AUDIO
      </div>
      <div className="sticker s2" aria-hidden="true">
        EST. 404
      </div>
      <div className="sticker s3" aria-hidden="true">
        REAL IMPACT
      </div>
      <div className="sticker s4" aria-hidden="true">
        PARENTAL ADVISORY
      </div>

      <div className="trusted">
        <span>TRUSTED BY</span>
        {TRUSTED_PLATFORMS.map((name) => (
          <b key={name}>{name}</b>
        ))}
      </div>
    </section>
  );
}
