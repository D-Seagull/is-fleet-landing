import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Who.module.css";

const audiences = [
  { title: "Logistics companies", text: "One source of truth for trips, trucks and paperwork across the business." },
  { title: "Dispatchers", text: "Plan, assign and track from one screen instead of five apps." },
  { title: "Team leads", text: "See your team's trips and step in without asking around." },
  { title: "Drivers", text: "A simple phone app: current trip, stops, documents. Sign in by SMS code." },
];

export function Who() {
  return (
    <section className={styles.section} id="who">
      <h2 className={cx(ui.display, styles.title)} data-reveal>Who it&apos;s for</h2>
      <div className={styles.grid} data-stagger>
        {audiences.map((a) => (
          <div className={styles.item} key={a.title}>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
