import { media } from "@/lib/media";
import GlitchText from "../react-bits-component/GlitchText";

export default function HeroPortrait() {
  return (
    <div className="hero-photo">
      <img src={media.heroPortrait} alt="Artist portrait placeholder" />
      <div className="photo-brand">
        VIRUS404
        <br />
        <small>&#12499;&#12540;&#12488;</small>
      </div>
      <div className="photo-label">EST. 404 - MIXX</div>
      <div className="photo-stamp" aria-hidden="true">
        <GlitchText speed={0.6} enableOnHover={false} className="stamp-glitch">
          404
        </GlitchText>
      </div>
    </div>
  );
}
