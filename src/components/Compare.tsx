import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Compare.module.css";
import { CheckIcon, CloseIcon } from "./icons";

// Pain → fix, pair by pair: row N on the left is answered by row N on the right, and the rows are
// height-aligned across the two cards (CSS subgrid), so the columns mirror each other.
const rows = ["trips", "cmr", "where", "swap", "head"] as const;

export function Compare({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <section className={styles.section} id="compare">
      <div className={styles.head} data-reveal>
        <span className={ui.eyebrow}>{t("compare.eyebrow")}</span>
        <h2 className={cx(ui.display, ui.h2)}>{t("compare.title")}</h2>
      </div>
      <div className={styles.grid} data-stagger>
        <div className={cx(styles.card, styles.old)}>
          <h3>{t("compare.oldTitle")}</h3>
          <ul className={styles.list}>
            {rows.map((id) => (
              <li key={id}><CloseIcon size={22} stroke="#8a9bb0" />{t(`compare.rows.${id}.old`)}</li>
            ))}
          </ul>
        </div>
        <div className={cx(styles.card, styles.new)}>
          <h3>{t("compare.newTitle")}</h3>
          <ul className={styles.list}>
            {rows.map((id) => (
              <li key={id}><CheckIcon size={22} stroke="#7fd8f5" strokeWidth={2.2} />{t(`compare.rows.${id}.new`)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
