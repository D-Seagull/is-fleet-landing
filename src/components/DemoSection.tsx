import { site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { DemoForm } from "./DemoForm";
import styles from "./DemoSection.module.css";
import { MailIcon, PlugIcon } from "./icons";

// Final call to action over the night-road photo (public/bg-truck-map.webp).
export function DemoSection() {
  return (
    <section className={styles.section} id="demo" data-reveal>
      {/* #trial lands here too and opens the trial tab when TRIAL_OPEN (see DemoForm) */}
      <span id="trial" className={styles.anchor} />
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Get in touch</span>
        <p className={styles.integrations}>
          <PlugIcon size={15} />
          Open to integrations — tell us your stack
        </p>
        <h2 className={ui.display}>
          Be one of the first fleets on <span className={styles.accent}>IS Fleet.</span>
        </h2>
        <p>
          Tell us about your fleet. Early-access teams get hands-on onboarding, a demo on their real routes and a
          direct line to the people building it.
        </p>
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
