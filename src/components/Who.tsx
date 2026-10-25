import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import features from "./Features.module.css";
import { GlobeIcon, LanguagesIcon, TruckIcon, UsersIcon } from "./icons";
import styles from "./Who.module.css";

// By fleet type, not by role — the roles are already covered by the three-apps section.
// Cards reuse the features section's card styles so the two blocks read as one system.
const fleets = [
  {
    icon: TruckIcon,
    title: "Fleets of any size",
    text: "From a handful of trucks to hundreds — get organized without a heavy TMS. Up and running in days.",
  },
  {
    icon: GlobeIcon,
    title: "International hauliers",
    text: "Every trip, CMR and document in one place across borders. Nothing lost between countries.",
  },
  {
    icon: UsersIcon,
    title: "Subcontractors & mixed fleets",
    text: "Owned trucks and hired drivers on one board. Everyone sees the same trips.",
  },
  {
    icon: LanguagesIcon,
    title: "Mixed-language teams",
    text: "Built for fleets where managers and drivers don’t share a language — so addresses and instructions don’t get lost in translation.",
  },
];

export function Who() {
  return (
    <section className={cx(features.section, styles.section)} id="who">
      <div className={features.head} data-reveal>
        <h2 className={cx(ui.display, ui.h2)}>Who it&apos;s for</h2>
        <p className={ui.muted}>Built for road freight — any fleet size, domestic or cross-border.</p>
      </div>
      <div className={styles.grid} data-stagger>
        {fleets.map(({ icon: FleetIcon, title, text }) => (
          <article className={features.card} key={title}>
            <span className={features.icon}><FleetIcon /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
