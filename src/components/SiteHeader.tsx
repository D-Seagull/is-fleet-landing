"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { PRIMARY_CTA, navLinks, site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

/** Extra scroll (px) after the hero story before the header shrinks. */
const SHRINK_DELAY = 200;

export function SiteHeader() {
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
        <Logo href="#top" label="IS Fleet home" />
        <nav className={styles.links} aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <span className={styles.spacer} />
        <a className={styles.login} href={site.loginUrl}>Log in</a>
        <a className={cx(ui.btn, ui.primary, styles.cta)} href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</a>
        <button
          className={styles.menuBtn}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      <div className={cx(styles.mobileMenu, menuOpen && styles.open)} id="mobile-menu">
        <nav aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
          ))}
          <a className={cx(ui.btn, ui.primary, styles.mobileCta)} href={PRIMARY_CTA.href} onClick={closeMenu}>{PRIMARY_CTA.label}</a>
        </nav>
      </div>
    </header>
  );
}
