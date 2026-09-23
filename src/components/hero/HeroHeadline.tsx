"use client";

import Magnet from "../react-bits-component/Magnet";
import ScrambledText from "../react-bits-component/ScrambledText";
import SplitText from "../react-bits-component/SplitText";
import TextType from "../react-bits-component/TextType";

const TYPE_WORDS = [
  "TRAP",
  "DRILL",
  "HIP HOP",
  "JERSEY",
  "LO-FI",
  "AMBIENT",
  "BOOM BAP",
  "EXPERIMENTAL",
];

export default function HeroHeadline() {
  return (
    <div className="hero-copy">
      <h2>
        <SplitText
          tag="span"
          text="SOUND"
          className="split-line"
          textAlign="left"
          splitType="chars"
          delay={45}
          duration={0.9}
        />
        <SplitText
          tag="span"
          text="WITHOUT"
          className="split-line red"
          textAlign="left"
          splitType="chars"
          delay={45}
          duration={0.9}
        />
        <span className="limits-row">
          <SplitText
            tag="span"
            text="LIMITS"
            className="split-inline"
            textAlign="left"
            splitType="chars"
            delay={45}
            duration={0.9}
          />{" "}
          <span className="tag404">404</span>
        </span>
      </h2>
      <ScrambledText radius={90} duration={0.9} speed={0.6} scrambleChars=".:/#">
        I craft immersive soundscapes, hard-hitting beats and industry-ready
        music for artists and brands worldwide. Every sound is designed to
        leave a mark.
      </ScrambledText>
      <div className="hero-buttons">
        <Magnet magnetStrength={3}>
          <a className="btn primary cursor-target" href="#work">
            EXPLORE WORK &rarr;
          </a>
        </Magnet>
        <Magnet magnetStrength={3}>
          <a className="btn cursor-target" href="#contact">
            CONTACT ME &rarr;
          </a>
        </Magnet>
      </div>
      <div className="hero-type" aria-hidden="true">
        <span className="hero-type-label">NOW COOKING</span>
        <TextType
          text={TYPE_WORDS}
          typingSpeed={70}
          deletingSpeed={32}
          pauseDuration={1400}
          startOnVisible
          cursorCharacter="_"
        />
      </div>
    </div>
  );
}
