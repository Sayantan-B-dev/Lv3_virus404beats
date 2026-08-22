import { Metadata } from "next";
import { site } from "@/config/site";
import { getPageData, REVALIDATE_SECONDS } from "@/lib/data";
import { WorksCard } from "@/components/ui/WorksCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Works — ${site.name}`,
  description: "Music portfolio: YouTube videos, collaborations, mixes, and uploaded productions from Kolkata-based producer virus404.",
  openGraph: {
    title: `Works — ${site.name}`,
    description: "Rap, hip-hop, trap productions and collaborations since 2022.",
    type: "website",
  },
};

export default async function WorksPage() {
  const { works, hero } = await getPageData("works");

  const youtubeWorks = works.filter((w) => w.kind === "youtube");
  const uploadedWorks = works.filter((w) => w.kind === "uploaded");

  return (
    <>
      <Nav />
      <main>
        {/* Hero section for works page */}
        <section className="works-hero" data-section-theme>
          <div className="container">
            <SectionHeading kicker="Portfolio" title="LIFE WORKS" />
            <p className="hero-subtitle">
              Collaborations, releases, mixes & masters. Two columns: YouTube videos + uploaded audio.
            </p>
          </div>
        </section>

        {/* Two-column grid: YouTube left, Uploaded right */}
        <section className="works-columns" data-section-theme>
          <div className="container">
            <div className="columns-grid">
              {/* YouTube Column */}
              <div className="column youtube-column">
                <h2 className="column-title">YouTube Videos</h2>
                <div className="works-list youtube-list">
                  {youtubeWorks.map((work) => (
                    <WorksCard key={work.id} work={work} />
                  ))}
                  {youtubeWorks.length === 0 && (
                    <div className="empty-column">No YouTube works published yet.</div>
                  )}
                </div>
              </div>

              {/* Uploaded Audio Column */}
              <div className="column uploaded-column">
                <h2 className="column-title">Uploaded Audio</h2>
                <div className="works-list uploaded-list">
                  {uploadedWorks.map((work) => (
                    <WorksCard key={work.id} work={work} />
                  ))}
                  {uploadedWorks.length === 0 && (
                    <div className="empty-column">No uploaded audio published yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}