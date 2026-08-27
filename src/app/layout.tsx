import type { Metadata } from "next";
import { DM_Mono, Fraunces, Instrument_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/content/site";
import "./globals.css";

/**
 * Fraunces carries the brand voice: a variable serif with optical sizing and a
 * soft axis — warm enough for a coffee bar, sharp enough for a dev portfolio.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Only opsz is requested. SOFT and WONK ship extra font files, and nothing in
  // the stylesheet varies them — downloading axes you never set is pure weight,
  // and it is what triggers the "preloaded but not used" console warnings.
  axes: ["opsz"],
  display: "swap",
});

/** Body copy. Chosen for its warmth, and for not being Inter. */
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

/** Mono is reserved for the ticket voice: section numbers, stack, prices. */
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  // 400 only. Nothing in the page renders mono at a heavier weight, and every
  // extra weight is a separate file the browser downloads and preloads.
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.subheadline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${instrument.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="bg-espresso text-crema flex min-h-full flex-col">
        <SmoothScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
