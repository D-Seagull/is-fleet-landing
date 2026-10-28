import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import { downloads } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import styles from "./Apps.module.css";
import { MonitorIcon, PhoneIcon, TruckIcon } from "./icons";
import { StoreButton } from "./StoreButton";

// The devices themselves are shown in the hero's scroll story; here the three apps are summed up,
// each with its download links.
const apps = [
  { id: "desktop", icon: MonitorIcon },
  { id: "manager", icon: PhoneIcon },
  { id: "driver", icon: TruckIcon },
] as const;

export function Apps({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <section className={styles.section} id="apps">
      {/* Old #download links keep working */}
      <span id="download" className={styles.anchor} />
      <div className={styles.head} data-reveal>
        <span className={cx(ui.eyebrow, ui.eyebrowOnDark)}>{t("apps.eyebrow")}</span>
        <h2 className={cx(ui.display, ui.h2)}>{t("apps.title")}</h2>
      </div>
      <div className={styles.grid} data-stagger>
        {apps.map(({ id, icon: AppIcon }) => (
          <article className={styles.card} key={id}>
            <AppIcon size={32} strokeWidth={1.8} stroke="#7fd8f5" />
            <span className={styles.label}>
              {t(`apps.items.${id}.label`)}
              {downloads[id].every((l) => !l.url) && <span className={styles.soon}>{t("apps.soon")}</span>}
            </span>
            <h3>{t(`apps.items.${id}.title`)}</h3>
            <p>{t(`apps.items.${id}.text`)}</p>
            <div className={styles.stores}>
              {downloads[id].map((l) => (
                <StoreButton key={l.store} store={l.store} url={l.url} small={t(`store.${l.store}`)} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
