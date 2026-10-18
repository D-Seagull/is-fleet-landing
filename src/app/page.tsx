import { Apps } from "@/components/Apps";
import { Compare } from "@/components/Compare";
import { DemoSection } from "@/components/DemoSection";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Motion } from "@/components/Motion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Who } from "@/components/Who";
import ui from "@/styles/ui.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <div className={ui.wrap}>
          <Compare />
          <Features />
          <Apps />
          <Who />
          <DemoSection />
        </div>
      </main>
      <SiteFooter />
      <Motion />
    </>
  );
}
