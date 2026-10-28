// Languages the landing is published in. English lives at `/`, every other language at `/<code>`.

export const locales = ["en", "uk", "pl", "lt", "de", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en" satisfies Locale;

export const isLocale = (v: unknown): v is Locale => locales.includes(v as Locale);

/** Home page of a language: `/` for English, `/uk`, `/pl`, … for the rest. */
export const localePath = (lng: Locale) => (lng === defaultLocale ? "/" : `/${lng}`);

/** Native names for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  pl: "Polski",
  lt: "Lietuvių",
  de: "Deutsch",
  ru: "Русский",
};

/** og:locale values. */
export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  uk: "uk_UA",
  pl: "pl_PL",
  lt: "lt_LT",
  de: "de_DE",
  ru: "ru_RU",
};

/** localStorage key holding the language the visitor picked in the switcher. */
export const LOCALE_STORAGE_KEY = "isfleet-lang";
