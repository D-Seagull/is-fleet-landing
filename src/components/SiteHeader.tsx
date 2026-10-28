"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cx } from "@/lib/cx";
import { PRIMARY_CTA, navLinks, site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { CloseIcon, MenuIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

/** Extra scroll (px) after the hero story before the header shrinks. */
const SHRINK_DELAY = 200;

export function SiteHeader() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Shrink once scrolled — but on desktop not before the hero's pinned story is over
    // (Motion.tsx publishes where it ends as data-story-end on <html>), plus a short beat after it.
    const onScroll = () => {
      const storyEnd = Number(document.documentElement.dataset.storyEnd ?? 0);
      setScrolled(window.scrollY > (storyEnd ? storyEnd + SHRINK_DELAY : 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <div className={cx(ui.wrap, styles.nav)}>
        <Logo href="#top" label={t("nav.home")} />
        <nav className={styles.links} aria-label={t("nav.main")}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{t(l.key)}</a>
          ))}
        </nav>
        <span className={styles.spacer} />
        <div className={styles.lang}>
          <LanguageSwitcher variant="dropdown" />
        </div>
        <a className={styles.login} href={site.loginUrl}>{t("nav.login")}</a>
        <a className={cx(ui.btn, ui.primary, styles.cta)} href={PRIMARY_CTA.href}>{t(PRIMARY_CTA.labelKey)}</a>
        <button
          className={styles.menuBtn}
          type="button"
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      <div className={cx(styles.mobileMenu, menuOpen && styles.open)} id="mobile-menu">
        <nav aria-label={t("nav.mobile")}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>{t(l.key)}</a>
          ))}
          <LanguageSwitcher variant="list" />
          <a className={cx(ui.btn, ui.primary, styles.mobileCta)} href={PRIMARY_CTA.href} onClick={closeMenu}>{t(PRIMARY_CTA.labelKey)}</a>
        </nav>
      </div>
    </header>
  );
}
