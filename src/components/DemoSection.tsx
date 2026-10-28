import type { Locale } from "@/i18n/config";
import { rich } from "@/i18n/rich";
import { getT } from "@/i18n/server";
import { site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { DemoForm } from "./DemoForm";
import styles from "./DemoSection.module.css";
import { MailIcon, PlugIcon } from "./icons";

// Final call to action over the night-road photo (public/bg-truck-map.webp).
export function DemoSection({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <section className={styles.section} id="demo" data-reveal>
      {/* #trial lands here too and opens the trial tab when TRIAL_OPEN (see DemoForm) */}
      <span id="trial" className={styles.anchor} />
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{t("demo.eyebrow")}</span>
        <p className={styles.integrations}>
          <PlugIcon size={15} />
          {t("demo.integrations")}
        </p>
        <h2 className={ui.display}>
          {rich(t("demo.title"), { accent: (c) => <span className={styles.accent}>{c}</span> })}
        </h2>
        <p>{t("demo.text")}</p>
        <div className={styles.contacts}>
          <a href={`mailto:${site.contactEmail}`}>
            <MailIcon size={22} stroke="#5ab4ff" />
            {site.contactEmail}
          </a>
        </div>
      </div>
      <DemoForm />
    </section>
  );
}
