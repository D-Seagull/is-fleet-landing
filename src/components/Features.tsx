import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Features.module.css";
import { BellIcon, FileIcon, MessageIcon, RouteIcon, SwapIcon, TruckIcon } from "./icons";

// Chat auto-translation exists in the backend but isn't live — don't advertise it here.
// Ordered by value: the top row is what owners buy for, the bottom row is how it stays smooth.
const features = [
  {
    icon: RouteIcon,
    title: "Trip Management",
    text: "Loading, unloading and waypoints with dates and time windows. Watch a trip go from planned to delivered — without chasing updates.",
  },
  {
    icon: TruckIcon,
    title: "Fleet Visibility",
    text: "See every truck, the trip it’s on and who’s driving — at a glance, without a single call. Drivers show as online, busy or resting.",
  },
  {
    icon: FileIcon,
    title: "Documents per Trip",
    text: "CMRs, delivery notes and photos filed under the trip they belong to. Found in seconds by trip number, date or postcode — there when accounting asks.",
  },
  {
    icon: SwapIcon,
    title: "One-Click Driver/Vehicle Swap",
    text: "Move a trip to another truck or driver. Its history and documents move with it — nothing re-sent, nothing re-typed.",
  },
  {
    icon: BellIcon,
    title: "Real-Time Notifications",
    text: "New trips, changes and documents reach the right phone the moment they happen — and stay quiet while a driver rests.",
  },
  {
    icon: MessageIcon,
    title: "Communication in Context",
    text: "Messages live on the trip they’re about, next to its stops and documents — so you ask less and everyone sees the same thing. Archived when the trip closes.",
  },
];

export function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.head} data-reveal>
        <h2 className={cx(ui.display, ui.h2)}>Everything a trip needs, in one place.</h2>
        <p className={ui.muted}>
          Built around the trip — the unit your business actually runs on. Less chasing, fewer calls,
          nothing lost between apps.
        </p>
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
