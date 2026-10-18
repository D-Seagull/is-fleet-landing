import { cx } from "@/lib/cx";
import { site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={cx(ui.wrap, styles.inner)}>
        <Logo href="#top" label="IS Fleet — back to top" small />
        <span className={styles.copy}>© {new Date().getFullYear()} IS Fleet</span>
        <nav className={styles.links} aria-label="Footer">
          <a href={site.privacyUrl}>Privacy policy</a>
          <a href={site.termsUrl}>Terms</a>
          <a href={site.loginUrl}>Log in</a>
        </nav>
      </div>
    </footer>
  );
}
