interface SectionHeadProps {
  lead: string;
  accent: string;
  note: string;
}

export default function SectionHead({ lead, accent, note }: SectionHeadProps) {
  return (
    <div className="section-head">
      <h3>
        {lead} <span>{accent}</span>
      </h3>
      <small>{note}</small>
    </div>
  );
}
