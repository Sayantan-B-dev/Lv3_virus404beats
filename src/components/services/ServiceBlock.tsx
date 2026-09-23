"use client";

import type { Service } from "@/types/content";
import ScrollFloat from "../react-bits-component/ScrollFloat";

export default function ServiceBlock({ service }: { service: Service }) {
  return (
    <article className="service">
      <small>{service.position}</small>
      <ScrollFloat tag="h4" stagger={0.04} scrollStart="top bottom+=20%" scrollEnd="center center">
        {service.title}
      </ScrollFloat>
      <p>{service.description}</p>
    </article>
  );
}
