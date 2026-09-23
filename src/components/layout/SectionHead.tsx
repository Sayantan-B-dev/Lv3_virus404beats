"use client";

import SplitText from "../react-bits-component/SplitText";

interface SectionHeadProps {
  lead: string;
  accent: string;
  note: string;
}

export default function SectionHead({ lead, accent, note }: SectionHeadProps) {
  return (
    <div className="section-head">
      <h3>
        <SplitText
          tag="span"
          text={lead}
          className="split-inline"
          textAlign="left"
          splitType="words"
          delay={120}
          duration={0.7}
        />{" "}
        <SplitText
          tag="span"
          text={accent}
          className="split-inline accent"
          textAlign="left"
          splitType="words"
          delay={120}
          duration={0.7}
        />
      </h3>
      <small>{note}</small>
    </div>
  );
}
