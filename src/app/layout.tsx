import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { LenisProvider } from "@/lib/lenis";
import { ThemeInit } from "@/components/ui/ThemeInit";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  keywords: ["virus404", "beats", "hip hop producer", "trap beats", "mixing mastering", "Kolkata"],
  openGraph: {
    title: `${site.name} — Beats & Production`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${space.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-fg">
        <ThemeInit />
        <LenisProvider>
          <NoiseOverlay />
          <ScrollProgress />
          <CustomCursor />
          {children}
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: site.legalName,
              description: site.description,
              url: site.url,
              genre: site.genre,
              member: { "@type": "Person", name: site.legalName },
            }),
          }}
        />
      </body>
    </html>
  );
}