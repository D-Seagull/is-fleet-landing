import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { rich } from "@/i18n/rich";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import { PRIMARY_CTA, TRIAL_OPEN } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { DashboardMockup } from "./DashboardMockup";
import styles from "./Hero.module.css";
import { DriverPhone, ManagerPhone } from "./PhoneMockups";
import { titleLineEm } from "./titleFit";

// The first screen tells one trip through the three apps. On desktop it is pinned and
// scroll-driven (Motion.tsx, [data-story]): the web app first, then IS Manager, then IS Driver,
// with the matching step lit up under the buttons. Without JS / with reduced motion all of it
// is shown at once.
const steps = ["desk", "manager", "driver"] as const;

export function Hero({ lng }: { lng: Locale }) {
  const t = getT(lng);
  const title = t("hero.title");
  // The headline is sized from the copy column so each line fits on one row; its widest line
  // (in em) sets the size, so "до контролю" gets a smaller font than "to control".
  const titleEm = Math.max(...title.split(/<br\s*\/?>/).map((line) => titleLineEm(line.replace(/<[^>]+>/g, "").trim())));

  return (
    <div className={styles.track} data-story>
      <div className={styles.bg} id="top">
        <section className={cx(ui.wrap, styles.hero)}>
          <div className={styles.copy}>
            <span className={styles.badge} data-hero-item>
              <span className={styles.badgeDot}><span className={styles.badgePulse} data-pulse /></span>{t("hero.badge")}
            </span>
            <h1 className={styles.title} style={{ "--title-em": titleEm.toFixed(3) } as CSSProperties} data-hero-item>
              {rich(title, { accent: (c) => <span className={styles.accent}>{c}</span> })}
            </h1>
            <p className={styles.sub} data-hero-item>
              {rich(t("hero.sub"), { lead: (c) => <strong className={styles.subLead}>{c}</strong> })}
            </p>
            <div className={styles.ctas} data-hero-item>
              <a className={cx(ui.btn, ui.primary, ui.lg)} href={PRIMARY_CTA.href}>{t(PRIMARY_CTA.labelKey)}</a>
              {TRIAL_OPEN ? (
                <a className={cx(ui.btn, ui.ghost, ui.lg)} href="#demo">{t("cta.demo")}</a>
              ) : (
                <span className={styles.soon}>{t("hero.trialSoon")}</span>
              )}
            </div>
            <ol className={styles.steps} data-hero-item>
              {steps.map((id, i) => (
                <li key={id} className={styles.step} data-story-step>
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <b>{t(`hero.steps.${id}.title`)}</b> {t(`hero.steps.${id}.text`)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.stage}>
            {/* Tilt lives on a wrapper: GSAP animates the mockup's own transform */}
            <div className={styles.tilt}>
              <div data-story-desk>
                <DashboardMockup lng={lng} intro />
              </div>
            </div>
            <div className={styles.phones}>
              <ManagerPhone lng={lng} />
              <DriverPhone lng={lng} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
