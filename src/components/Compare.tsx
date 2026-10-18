import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Compare.module.css";
import { CheckIcon, CloseIcon } from "./icons";

const oldWay = [
  "Trips live in WhatsApp groups, Excel and someone's notebook.",
  "CMR photos get buried in chats and are never there when accounting asks.",
  "“Where is the truck?” means another phone call.",
  "Changing a driver or vehicle means re-sending everything by hand.",
  "When the dispatcher is off, nobody knows the full picture.",
];

const withFleet = [
  "Every trip in one system — stops, time windows, truck and driver.",
  "Documents attached to the trip they belong to, searchable in seconds.",
  "Trip status and driver availability visible to the whole team.",
  "Swap a truck or driver in one click — history and files follow.",
  "Anyone on the team can pick up where the last shift left off.",
];

export function Compare() {
  return (
    <section className={styles.section} id="compare">
      <div className={styles.head} data-reveal>
        <span className={ui.eyebrow}>Why IS Fleet</span>
        <h2 className={cx(ui.display, ui.h2)}>Your dispatcher shouldn&apos;t be the only system you have.</h2>
      </div>
      <div className={styles.grid} data-stagger>
        <div className={cx(styles.card, styles.old)}>
          <h3>The old way</h3>
          <ul className={styles.list}>
            {oldWay.map((t) => (
              <li key={t}><CloseIcon size={22} stroke="#8a9bb0" />{t}</li>
            ))}
          </ul>
        </div>
        <div className={cx(styles.card, styles.new)}>
          <h3>With IS Fleet</h3>
          <ul className={styles.list}>
            {withFleet.map((t) => (
              <li key={t}><CheckIcon size={22} stroke="#7fd8f5" strokeWidth={2.2} />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
