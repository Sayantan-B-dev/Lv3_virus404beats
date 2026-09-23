"use client";

import { useEffect, useState } from "react";
import { ChevLeftIcon, ChevRightIcon } from "../icons";
import MiniPlayer from "./MiniPlayer";
import NavState from "./NavState";

export default function SiteRail() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("rail-collapsed", collapsed);
    return () => {
      document.documentElement.classList.remove("rail-collapsed");
    };
  }, [collapsed]);

  return (
    <aside className="rail">
      <div className="brand">
        <h1>
          VIRUS<span>404</span>
        </h1>
        <small>B E A T S</small>
        <span className="brand-mark" aria-hidden="true">
          V<span>4</span>
        </span>
        <button
          type="button"
          className="rail-toggle cursor-target"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevRightIcon /> : <ChevLeftIcon />}
        </button>
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
