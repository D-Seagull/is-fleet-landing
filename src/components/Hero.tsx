import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import { DashboardMockup } from "./DashboardMockup";
import styles from "./Hero.module.css";
import { DriverPhone, ManagerPhone } from "./PhoneMockups";

// The first screen tells one trip through the three apps. On desktop it is pinned and
// scroll-driven (Motion.tsx, [data-story]): the web app first, then IS Manager, then IS Driver,
// with the matching step lit up under the buttons. Without JS / with reduced motion all of it
// is shown at once.
const steps = [
  { title: "Web dashboard", text: "The dispatcher plans the trip at the desk." },
  { title: "IS Manager", text: "The manager follows it from the phone." },
  { title: "IS Driver", text: "The driver gets it in the cab." },
];

export function Hero() {
  return (
    <div className={styles.bg} id="top" data-story>
      <section className={cx(ui.wrap, styles.hero)}>
        <div className={styles.copy}>
          <span className={styles.badge} data-hero-item>
            <span className={styles.badgeDot}><span className={styles.badgePulse} data-pulse /></span>Early access — join the first fleets
          </span>
          <h1 className={styles.title} data-hero-item>
            From chaos <br />
            to <span className={styles.accent}>control</span>
          </h1>
          <p className={styles.sub} data-hero-item>
            <strong className={styles.subLead}>One system for the whole fleet.</strong> Trips, trucks, CMRs and the whole
            team — dispatchers, managers and drivers — on the same page.
          </p>
          <div className={styles.ctas} data-hero-item>
            <a className={cx(ui.btn, ui.primary, ui.lg)} href="#demo">Start Free Trial</a>
            <a className={cx(ui.btn, ui.ghost, ui.lg)} href="#demo">Book a Demo</a>
          </div>
          <ol className={styles.steps} data-hero-item>
            {steps.map((s, i) => (
              <li key={s.title} className={styles.step} data-story-step>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <b>{s.title}</b> {s.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.stage}>
          {/* Tilt lives on a wrapper: GSAP animates the mockup's own transform */}
          <div className={styles.tilt}>
            <div data-story-desk>
              <DashboardMockup intro />
            </div>
          </div>
          <div className={styles.phones}>
            <ManagerPhone />
            <DriverPhone />
          </div>
        </div>
      </section>
    </div>
  );
}
