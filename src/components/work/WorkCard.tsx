import type { Project } from "@/types/content";
import ScrollFloat from "../react-bits-component/ScrollFloat";

// Rotation values come from content, presentation stays in work.css.
const ROTATION_CLASS: Record<string, string> = {
  "-.35deg": "rot-neg-xs",
  ".55deg": "rot-pos-sm",
  "-.7deg": "rot-neg-sm",
  ".4deg": "rot-pos-xs",
  "-.5deg": "rot-neg-xxs",
};

export default function WorkCard({ project }: { project: Project }) {
  const rotation = ROTATION_CLASS[project.rotation] ?? "";
  const cardClass = project.featured
    ? `workcard big ${rotation}`
    : `workcard ${rotation}`;
  return (
    <a className={`cursor-target ${cardClass.trim()}`} href={`#${project.slug}`}>
      <img src={project.coverUrl} alt={`Cover art for ${project.title}`} loading="lazy" />
      <span className="corner">{project.index}</span>
      <div className="work-caption">
        <small>{project.category}</small>
        <ScrollFloat tag="h4" stagger={0.02} scrollStart="top bottom+=10%" scrollEnd="center center">
          {project.title}
        </ScrollFloat>
        <p>{project.detail}</p>
      </div>
    </a>
  );
}
