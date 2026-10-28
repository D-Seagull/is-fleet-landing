import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Sans, Manrope } from "next/font/google";
import Script from "next/script";
import { defaultLocale, localePath, locales, ogLocales } from "@/i18n/config";
import { I18nProvider } from "@/i18n/I18nProvider";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { resources } from "@/i18n/resources";
import { getT } from "@/i18n/server";
import { SITE_URL, site } from "@/lib/site";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

// The web app's own font — used only inside the hero's app mockup.
const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});

type Params = LocaleParams;

// English at `/`, the other languages at `/uk`, `/pl`, … — all prerendered; anything else is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lng) => ({ lng: lng === defaultLocale ? [] : [lng] }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lng = await resolveLocale(params);
  const t = getT(lng);
  const title = t("meta.title");
  const description = t("meta.description");
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: localePath(lng),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l)])),
        "x-default": localePath(defaultLocale),
      },
    },
    openGraph: {
      title,
      description,
      siteName: site.name,
      type: "website",
      url: localePath(lng),
      locale: ogLocales[lng],
      alternateLocale: locales.filter((l) => l !== lng).map((l) => ogLocales[l]),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b1f33",
};

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Params }>) {
  const lng = await resolveLocale(params);
  return (
    // suppressHydrationWarning: the inline script below adds `motion` to <html> before React hydrates.
    <html lang={lng} className={`${manrope.variable} ${plex.variable} ${geist.variable}`} suppressHydrationWarning>
      <body>
        {/* Hide the animated pieces before first paint so GSAP can fade them in without a flash (see
            globals.css). If Motion.tsx hasn't started after 3s (slow or blocked bundle), show everything. */}
        <Script id="motion-flag" strategy="beforeInteractive">
          {"(function(d){if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('motion');setTimeout(function(){if(!('motionReady' in d.dataset))d.classList.remove('motion')},3000)})(document.documentElement)"}
        </Script>
        <I18nProvider lng={lng} landing={resources[lng]}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
