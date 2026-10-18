import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Sans, Manrope } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

// The web app's own font — used only inside the hero's app mockup.
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1f33",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below adds `motion` to <html> before React hydrates.
    <html lang="en" className={`${manrope.variable} ${plex.variable} ${geist.variable}`} suppressHydrationWarning>
      <body>
        {/* Hide the hero pieces before first paint so GSAP can fade them in without a flash (see globals.css). */}
        <Script id="motion-flag" strategy="beforeInteractive">
          {"if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')"}
        </Script>
        {children}
      </body>
    </html>
  );
}
