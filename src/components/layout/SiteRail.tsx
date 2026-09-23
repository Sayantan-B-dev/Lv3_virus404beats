import MiniPlayer from "./MiniPlayer";
import NavState from "./NavState";

export default function SiteRail() {
  return (
    <aside className="rail">
      <div className="brand">
        <h1>
          VIRUS<span>404</span>
        </h1>
        <small>B E A T S</small>
        <div className="ring" aria-hidden="true">
          &#10033;
        </div>
      </div>

      <div className="nav-wrap">
        <div className="nav-label">INDEX / 404</div>
        <NavState />
        <div className="rail-meta">
          PRODUCER / BEATMAKER / AUDIO ENGINEER
          <br />
          WEST BENGAL - INDIA
          <br />
          REMOTE WORK / GLOBAL SOUND
        </div>
      </div>

      <MiniPlayer />
    </aside>
  );
}
