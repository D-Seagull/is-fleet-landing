import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Features.module.css";
import { BellIcon, FileIcon, MessageIcon, RouteIcon, SwapIcon, TruckIcon } from "./icons";

// Chat auto-translation exists in the backend but isn't live — don't advertise it here.
const features = [
  {
    icon: RouteIcon,
    title: "Trip Management",
    text: "Loading, unloading and waypoints with dates and time windows. Status from planned to delivered.",
  },
  {
    icon: FileIcon,
    title: "Documents per Trip",
    text: "CMRs, delivery notes and photos filed under the trip. Search by trip number, date or postcode.",
  },
  {
    icon: TruckIcon,
    title: "Fleet Visibility",
    text: "Every truck, the trip it's on and who is driving. Drivers' availability — online, busy or resting — at a glance.",
  },
  {
    icon: SwapIcon,
    title: "One-Click Driver/Vehicle Swap",
    text: "Move a trip to another truck or driver. Its history and documents move with it — nothing re-sent.",
  },
  {
    icon: MessageIcon,
    title: "In-Context Communication",
    text: "Messages live on the trip they're about, next to its stops and documents. Archived when the trip closes.",
  },
  {
    icon: BellIcon,
    title: "Real-Time Notifications",
    text: "New trips, changes and documents reach the right phone instantly — and stay quiet while a driver rests.",
  },
];

export function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.head} data-reveal>
        <h2 className={cx(ui.display, ui.h2)}>One system for the whole operation.</h2>
        <p className={ui.muted}>Built around the trip — the unit your business actually runs on.</p>
      </div>
      <div className={styles.grid} data-stagger>
        {features.map(({ icon: FeatureIcon, title, text }) => (
          <article className={styles.card} key={title}>
            <span className={styles.icon}><FeatureIcon /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
