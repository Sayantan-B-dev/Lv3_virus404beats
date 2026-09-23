import type { Service } from "@/types/content";

export default function ServiceBlock({ service }: { service: Service }) {
  return (
    <article className="service">
      <small>{service.position}</small>
      <h4>{service.title}</h4>
      <p>{service.description}</p>
    </article>
  );
}
