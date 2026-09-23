const STATS = [
  { value: "900+", label: "CLIENT TRACKS / PROJECTS - SELF-REPORTED" },
  { value: "2021", label: "PROFESSIONAL FREELANCE SINCE" },
  { value: "09", label: "CORE HIP-HOP PRODUCTION STYLES" },
  { value: "404", label: "THE SIGNAL NEVER ENDS" },
] as const;

export default function StatGrid() {
  return (
    <div className="stats">
      {STATS.map((stat) => (
        <div className="stat" key={stat.label}>
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
