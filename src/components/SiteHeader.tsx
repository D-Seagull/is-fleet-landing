"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { navLinks, site } from "@/lib/site";
import ui from "@/styles/ui.module.css";
import { CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        <a className={cx(ui.btn, ui.primary, styles.cta)} href="#demo">Start Free Trial</a>
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
          <a className={cx(ui.btn, ui.primary, styles.mobileCta)} href="#demo" onClick={closeMenu}>Start Free Trial</a>
        </nav>
      </div>
    </header>
  );
}
