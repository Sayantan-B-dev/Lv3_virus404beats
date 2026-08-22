import { Metadata } from "next";
import { site, contact } from "@/config/site";
import { getPageData } from "@/lib/data";
import { getPreviewUrl } from "@/lib/cloudinary";
import { BeatCard } from "@/components/ui/BeatCard";
import { Top10Strip } from "@/components/ui/Top10Strip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Beats Store — ${site.name}`,
  description: "Browse and buy original beats, type beats, and custom productions. Tagged previews, manual buy flow via Email/WhatsApp.",
  openGraph: {
    title: `Beats Store — ${site.name}`,
    description: "Original beats from Kolkata — rap, trap, hip-hop, R&B, afrobeat.",
    type: "website",
  },
};

export default async function BeatsPage() {
  const { beats, topBeats, services, hero } = await getPageData("beats");
  const topBeatsWithPreview = topBeats.map((b) => ({
    ...b,
    previewUrl: b.cloudinaryPublicId ? getPreviewUrl(b.cloudinaryPublicId) : "",
  }));

  return (
    <>
      <Nav />
      <main>
        {/* Hero section for beats page */}
        <section className="beats-hero" data-section-theme="lime">
          <div className="container">
            <SectionHeading kicker="Store" title="BEATS FOR SALE" />
            <p className="hero-subtitle">
              Original compositions, type beats & experimental hip-hop.
              Tagged previews stream instantly — buy via Email or WhatsApp.
            </p>
          </div>
        </section>

        {/* Top 10 Quick Play Strip */}
        {topBeatsWithPreview.length > 0 && <Top10Strip beats={topBeatsWithPreview} />}

        {/* Full Beats Catalog */}
        <section className="beats-catalog" data-section-theme="lime">
          <div className="container">
            <SectionHeading kicker="Catalog" title="ALL BEATS" />
            <div className="beats-grid">
              {beats.map((beat) => (
                <BeatCard key={beat.id} beat={beat} previewUrl={beat.cloudinaryPublicId ? getPreviewUrl(beat.cloudinaryPublicId) : ""} />
              ))}
              {beats.length === 0 && (
                <div className="empty-state">
                  <p>No beats published yet. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Services CTA */}
        <section className="services-cta" data-section-theme>
          <div className="container">
            <SectionHeading kicker="Need Custom?" title="CUSTOM PRODUCTION" />
            <p className="cta-text">
              {services[0]?.description ?? "Original compositions, type beats & experimental hip-hop. Custom drums, no default loops unless you ask for them."}
            </p>
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi virus404! I want a custom beat.")}`}
              className="cta-link"
              target="_blank"
              rel="noreferrer"
            >
              Book a Custom Beat →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}