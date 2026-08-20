import { sections } from "@/config/site";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { GenreMarquee } from "@/components/sections/GenreMarquee";
import { ParallaxBreak } from "@/components/sections/ParallaxBreak";
import { FeaturedReleases } from "@/components/sections/FeaturedReleases";
import { Services } from "@/components/sections/Services";
import { BeatsList } from "@/components/sections/BeatsList";
import { GalleryStack } from "@/components/sections/GalleryStack";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const sectionMap = {
  hero: Hero,
  genres: GenreMarquee,
  featured: FeaturedReleases,
  services: Services,
  beats: BeatsList,
  gallery: GalleryStack,
  about: About,
  contact: Contact,
} as const;

export default function Home() {
  const active = sections.filter((s) => s.enabled);

  const render = (key: (typeof active)[number]["key"]) => {
    const def = active.find((s) => s.key === key);
    if (!def) return null;
    const Section = sectionMap[key];
    return (
      <div key={key} data-section-theme={def.theme ?? undefined}>
        <Section />
      </div>
    );
  };

  return (
    <main>
      <Nav />
      {render("hero")}
      {render("genres")}
      <ParallaxBreak src="break-1.avif" alt="Studio session" caption="Sessions" sub="In the studio" />
      {render("featured")}
      {render("services")}
      {render("beats")}
      <ParallaxBreak src="break-2.avif" alt="Live energy" caption="Made in Kolkata" sub="The city" />
      {render("gallery")}
      {render("about")}
      {render("contact")}
      <Footer />
    </main>
  );
}