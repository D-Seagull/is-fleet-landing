import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import ui from "@/styles/ui.module.css";
import features from "./Features.module.css";
import { GlobeIcon, LanguagesIcon, TruckIcon, UsersIcon } from "./icons";
import styles from "./Who.module.css";

// By fleet type, not by role — the roles are already covered by the three-apps section.
// Cards reuse the features section's card styles so the two blocks read as one system.
// "Mixed-language teams" must not promise chat translation — it isn't live.
const fleets = [
  { id: "size", icon: TruckIcon },
  { id: "intl", icon: GlobeIcon },
  { id: "mixed", icon: UsersIcon },
  { id: "lang", icon: LanguagesIcon },
] as const;

export function Who({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <section className={cx(features.section, styles.section)} id="who">
      <div className={features.head} data-reveal>
        <h2 className={cx(ui.display, ui.h2)}>{t("who.title")}</h2>
        <p className={ui.muted}>{t("who.sub")}</p>
      </div>
      <div className={styles.grid} data-stagger>
        {fleets.map(({ id, icon: FleetIcon }) => (
          <article className={features.card} key={id}>
            <span className={features.icon}><FleetIcon /></span>
            <h3>{t(`who.items.${id}.title`)}</h3>
            <p>{t(`who.items.${id}.text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
