import { getPublishedServices } from "@/data/content";
import SectionHead from "../layout/SectionHead";
import ServiceBlock from "./ServiceBlock";

export default function ServiceGrid() {
  const services = getPublishedServices();
  return (
    <section className="section" id="services">
      <SectionHead lead="WHAT I" accent="DO" note="PROFESSIONAL AUDIO SERVICES" />
      <div className="services">
        {services.map((service) => (
          <ServiceBlock key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
