"use client";

import Magnet from "../react-bits-component/Magnet";
import SplitText from "../react-bits-component/SplitText";

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
      <p>
        I craft immersive soundscapes, hard-hitting beats and industry-ready
        music for artists and brands worldwide. Every sound is designed to
        leave a mark.
      </p>
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
    </div>
  );
}
