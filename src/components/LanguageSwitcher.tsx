"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { LOCALE_STORAGE_KEY, localeNames, localePath, locales, type Locale } from "@/i18n/config";
import { cx } from "@/lib/cx";
import { ChevronDownIcon } from "./icons";
import { Flag } from "./Flag";
import styles from "./LanguageSwitcher.module.css";

/** Saves the visitor's pick (see LanguageSuggest). Storage can be off — then it just isn't remembered. */
export function rememberLocale(lng: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lng);
  } catch {}
}

/** Goes to the same spot (#section) of the page in another language. */
function onPick(lng: Locale) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    rememberLocale(lng);
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.location.assign(localePath(lng) + window.location.hash);
  };
}

function Options({ current, onChoose }: { current: Locale; onChoose?: () => void }) {
  return locales.map((l) => (
    <a
      key={l}
      href={localePath(l)}
      hrefLang={l}
      lang={l}
      className={cx(styles.option, l === current && styles.current)}
      aria-current={l === current ? "true" : undefined}
      onClick={(e) => {
        onChoose?.();
        onPick(l)(e);
      }}
    >
      <Flag lng={l} />
      {localeNames[l]}
    </a>
  ));
}

/** Header language picker: the current flag (+ code on wide screens), opening the list. */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.language as Locale;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.dropdown} ref={root}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={`${t("lang.label")}: ${localeNames[current]}`}
        aria-expanded={open}
        aria-controls="lang-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <Flag lng={current} />
        {/* Russian's "flag" already is the RU badge */}
        {current !== "ru" && <span className={styles.code}>{current.toUpperCase()}</span>}
        <ChevronDownIcon size={14} />
      </button>
      <nav id="lang-menu" className={cx(styles.menu, open && styles.menuOpen)} aria-label={t("lang.label")}>
        <Options current={current} onChoose={() => setOpen(false)} />
      </nav>
    </div>
  );
}
