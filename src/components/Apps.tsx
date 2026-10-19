import { cx } from "@/lib/cx";
import { downloads } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import styles from "./Apps.module.css";
import { MonitorIcon, PhoneIcon, TruckIcon } from "./icons";
import { StoreButton } from "./StoreButton";

// The devices themselves are shown in the hero's scroll story; here the three apps are summed up,
// each with its download links.
const apps = [
  {
    id: "desktop" as const,
    icon: MonitorIcon,
    label: "FOR DISPATCHERS",
    title: "Web dashboard",
    text: "Plan the trip at the desk — stops, time windows, truck and driver. In the browser or as a Windows app that updates itself.",
  },
  {
    id: "manager" as const,
    icon: PhoneIcon,
    label: "FOR MANAGERS ON THE MOVE",
    title: "IS Manager",
    text: "Your trucks, trips and drivers in your pocket on iOS and Android, with a push when something changes.",
  },
  {
    id: "driver" as const,
    icon: TruckIcon,
    label: "FOR DRIVERS",
    title: "IS Driver",
    text: "The trip lands in the cab: addresses, documents and the trip chat. Sign in with a phone number and an SMS code.",
  },
];

export function Apps() {
  return (
    <section className={styles.section} id="apps">
      {/* Old #download links keep working */}
      <span id="download" className={styles.anchor} />
      <div className={styles.head} data-reveal>
        <span className={cx(ui.eyebrow, ui.eyebrowOnDark)}>Three apps, one account</span>
        <h2 className={cx(ui.display, ui.h2)}>At the desk, on the phone, in the cab.</h2>
      </div>
      <div className={styles.grid} data-stagger>
        {apps.map(({ id, icon: AppIcon, label, title, text }) => (
          <article className={styles.card} key={title}>
            <AppIcon size={32} strokeWidth={1.8} stroke="#7fd8f5" />
            <span className={styles.label}>
              {label}
              {downloads[id].every((l) => !l.url) && <span className={styles.soon}>Coming soon</span>}
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className={styles.stores}>
              {downloads[id].map((l) => (
                <StoreButton key={l.store} store={l.store} url={l.url} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
