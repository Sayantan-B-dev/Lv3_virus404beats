import { getPublishedProjects } from "@/data/content";
import SectionHead from "../layout/SectionHead";
import WorkCard from "./WorkCard";

export default function WorkGrid() {
  const projects = getPublishedProjects();
  return (
    <section className="section" id="work">
      <SectionHead lead="SELECTED" accent="WORK" note="EXPLORE ARCHIVE &rarr;" />
      <div className="workgrid">
        {projects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
