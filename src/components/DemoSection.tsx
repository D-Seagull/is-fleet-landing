import { site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { DemoForm } from "./DemoForm";
import styles from "./DemoSection.module.css";
import { MailIcon } from "./icons";

export function DemoSection() {
  return (
    <section className={styles.section} id="demo" data-reveal>
      <div className={styles.copy}>
        <h2 className={ui.display}>Be one of the first fleets on IS Fleet.</h2>
        <p>
          Tell us about your fleet. Early-access teams get hands-on onboarding, a demo on their real routes and a
          direct line to the people building it.
        </p>
        <div className={styles.contacts}>
          <a href={`mailto:${site.contactEmail}`}>
            <MailIcon size={20} stroke="#7fd8f5" />
            {site.contactEmail}
          </a>
        </div>
      </div>
      <DemoForm />
    </section>
  );
}
