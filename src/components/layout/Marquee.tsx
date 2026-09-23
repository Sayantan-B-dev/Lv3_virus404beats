export default function Marquee() {
  const line = "RAW SOUND - REAL IMPACT - VIRUS404BEATS - ".repeat(3);
  return (
    <div className="marquee" aria-hidden="true">
      <span>{line}</span>
    </div>
  );
}
