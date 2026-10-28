"use client";

import { useEffect, useState } from "react";
import { LOCALE_STORAGE_KEY, defaultLocale, isLocale, localePath, type Locale } from "@/i18n/config";
import type { LandingResource } from "@/i18n/options";
import { CloseIcon } from "./icons";
import { Flag } from "./Flag";
import { rememberLocale } from "./LanguageSwitcher";
import styles from "./LanguageSuggest.module.css";

export type Suggestions = Record<Exclude<Locale, "en">, LandingResource["lang"]>;

/** The language to offer: the one picked earlier in the switcher, else the browser's first supported one. */
function pickSuggestion(): Locale | null {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {}
  if (isLocale(stored)) return stored;
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/**
 * On the English page only: offers the visitor's own language in a small card, written in that
 * language. Never redirects by itself. "No, thanks" remembers English, so it isn't offered again.
 */
export function LanguageSuggest({ suggestions }: { suggestions: Suggestions }) {
  const [lng, setLng] = useState<Exclude<Locale, "en"> | null>(null);

  useEffect(() => {
    const pick = pickSuggestion();
    // Reading the browser's settings has to wait until after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pick && pick !== defaultLocale) setLng(pick);
  }, []);

  if (!lng) return null;
  const s = suggestions[lng];

  return (
    <aside className={styles.card} lang={lng} aria-label={s.label}>
      <Flag lng={lng} />
      <p className={styles.text}>{s.suggest}</p>
      <a className={styles.go} href={localePath(lng)} hrefLang={lng} onClick={() => rememberLocale(lng)}>
        {s.switch}
      </a>
      <button
        type="button"
        className={styles.close}
        aria-label={s.dismiss}
        onClick={() => {
          rememberLocale(defaultLocale);
          setLng(null);
        }}
      >
        <CloseIcon size={16} />
      </button>
    </aside>
  );
}
