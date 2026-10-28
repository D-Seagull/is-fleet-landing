import { Apps } from "@/components/Apps";
import { Compare } from "@/components/Compare";
import { DemoSection } from "@/components/DemoSection";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { LanguageSuggest, type Suggestions } from "@/components/LanguageSuggest";
import { Motion } from "@/components/Motion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Who } from "@/components/Who";
import { defaultLocale, locales } from "@/i18n/config";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { resources } from "@/i18n/resources";
import ui from "@/styles/ui.module.css";

export default async function Home({ params }: { params: LocaleParams }) {
  const lng = await resolveLocale(params);
  // The English page may offer the visitor's own language — in that language.
  const suggestions =
    lng === defaultLocale
      ? (Object.fromEntries(locales.filter((l) => l !== defaultLocale).map((l) => [l, resources[l].lang])) as Suggestions)
      : null;

  return (
    <>
      <SiteHeader />
      <main>
        <Hero lng={lng} />
        <div className={ui.wrap}>
          <Compare lng={lng} />
          <Features lng={lng} />
          <Apps lng={lng} />
          <Who lng={lng} />
          <DemoSection lng={lng} />
        </div>
      </main>
      <SiteFooter lng={lng} />
      {suggestions && <LanguageSuggest suggestions={suggestions} />}
      <Motion />
    </>
  );
}
