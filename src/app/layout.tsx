import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Permanent_Marker } from "next/font/google";
import TargetCursor from "@/components/react-bits-component/TargetCursor";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const scribble = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-scribble",
});

export const metadata: Metadata = {
  title: "VIRUS404BEATS - Sound Without Limits",
  description:
    "VIRUS404BEATS is the producer identity of Sayantan Bharati. Music producer, beatmaker and audio engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${scribble.variable}`}
    >
      <body>
        <TargetCursor targetSelector=".cursor-target" />
        {children}
      </body>
    </html>
  );
}
