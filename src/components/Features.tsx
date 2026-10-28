import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import styles from "./Features.module.css";
import { BellIcon, FileIcon, MessageIcon, RouteIcon, SwapIcon, TruckIcon } from "./icons";

// Chat auto-translation exists in the backend but isn't live — don't advertise it here.
// Ordered by value: the top row is what owners buy for, the bottom row is how it stays smooth.
const features = [
  { id: "trips", icon: RouteIcon },
  { id: "fleet", icon: TruckIcon },
  { id: "docs", icon: FileIcon },
  { id: "swap", icon: SwapIcon },
  { id: "notify", icon: BellIcon },
  { id: "context", icon: MessageIcon },
] as const;

export function Features({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <section className={styles.section} id="features">
      <div className={styles.head} data-reveal>
        <h2 className={cx(ui.display, ui.h2)}>{t("features.title")}</h2>
        <p className={ui.muted}>{t("features.sub")}</p>
      </div>
      <div className={styles.grid} data-stagger>
        {features.map(({ id, icon: FeatureIcon }) => (
          <article className={styles.card} key={id}>
            <span className={styles.icon}><FeatureIcon /></span>
            <h3>{t(`features.items.${id}.title`)}</h3>
            <p>{t(`features.items.${id}.text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
