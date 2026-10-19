import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Compare.module.css";
import { CheckIcon, CloseIcon } from "./icons";

// Pain → fix, pair by pair: row N on the left is answered by row N on the right, and the rows are
// height-aligned across the two cards (CSS subgrid), so the columns mirror each other.
const oldWay = [
  "Trips scattered across chats, spreadsheets and notebooks.",
  "CMR photos buried in chats — never there when accounting asks.",
  "“Where’s the truck?” means another phone call.",
  "Changing a driver or vehicle means re-sending everything by hand.",
  "Your whole operation lives in one dispatcher’s head.",
];

const withFleet = [
  "Every trip in one system — stops, time windows, truck and driver.",
  "CMRs attached to the trip, found in seconds when accounting asks.",
  "See where every trip stands — without picking up the phone.",
  "Swap a truck or driver in one click — history and files follow.",
  "Every trip is in the system, not someone’s head.",
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
