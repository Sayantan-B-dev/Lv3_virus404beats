import ArtistDossier from "@/components/about/ArtistDossier";
import ContactBlock from "@/components/contact/ContactBlock";
import HeroCollage from "@/components/hero/HeroCollage";
import Footer from "@/components/layout/Footer";
import Marquee from "@/components/layout/Marquee";
import SiteRail from "@/components/layout/SiteRail";
import Topbar from "@/components/layout/Topbar";
import ReleaseCard from "@/components/music/ReleaseCard";
import ServiceGrid from "@/components/services/ServiceGrid";
import WorkGrid from "@/components/work/WorkGrid";

export default function Home() {
  return (
    <div className="page">
      <SiteRail />
      <main>
        <Topbar />
        <HeroCollage />
        <Marquee />
        <ReleaseCard />
        <WorkGrid />
        <ServiceGrid />
        <ArtistDossier />
        <ContactBlock />
        <Footer />
      </main>
    </div>
  );
}
