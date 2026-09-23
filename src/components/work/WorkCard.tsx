import type { CSSProperties } from "react";
import type { Project } from "@/types/content";

export default function WorkCard({ project }: { project: Project }) {
  return (
    <a
      className={project.featured ? "workcard big" : "workcard"}
      style={{ "--rot": project.rotation } as CSSProperties}
      href={`#${project.slug}`}
    >
      <img src={project.coverUrl} alt={`Cover art for ${project.title}`} loading="lazy" />
      <span className="corner">{project.index}</span>
      <div className="work-caption">
        <small>{project.category}</small>
        <h4>{project.title}</h4>
        <p>{project.detail}</p>
      </div>
    </a>
  );
}
