import { media } from "@/lib/media";
import SectionHead from "../layout/SectionHead";
import StatGrid from "./StatGrid";

export default function ArtistDossier() {
  return (
    <section className="section" id="about">
      <SectionHead lead="THE" accent="VIRUS" note="WEST BENGAL - INDIA - REMOTE" />
      <div className="about">
        <div className="about-copy">
          <h4>
            MADE
            <br />
            FOR <span>SOUND.</span>
          </h4>
          <p>
            Virus404beats is the producer identity of Sayantan Bharati, a
            multigenre music producer, beatmaker and audio engineer.
            Professional freelance work spans production, editing, mixing,
            composition and artist-focused audio services.
          </p>
          <StatGrid />
        </div>
        <div className="about-pic">
          <img src={media.aboutPortrait} alt="Virus404beats studio portrait" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
