import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const url = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

// /sitemap.xml — one entry per language, each listing all the others (same as the pages' hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((l) => [l, url(localePath(l))])),
    "x-default": url("/"),
  };
  return locales.map((l) => ({
    url: url(localePath(l)),
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.8,
    alternates: { languages },
  }));
}
