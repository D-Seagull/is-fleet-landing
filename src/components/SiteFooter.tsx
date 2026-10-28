import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/server";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ lng }: { lng: Locale }) {
  const t = getT(lng);
  return (
    <footer className={styles.footer}>
      <div className={cx(ui.wrap, styles.inner)}>
        <Logo href="#top" label={t("footer.backToTop")} small />
        <span className={styles.copy}>© {new Date().getFullYear()} IS Fleet</span>
        <nav className={styles.links} aria-label={t("footer.label")}>
          <a href={site.privacyUrl}>{t("footer.privacy")}</a>
          <a href={site.termsUrl}>{t("footer.terms")}</a>
          <a href={site.loginUrl}>{t("nav.login")}</a>
        </nav>
      </div>
    </footer>
  );
}
