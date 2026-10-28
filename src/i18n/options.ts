// Kept apart from resources.ts so the client provider doesn't pull every language into its bundle.
import type en from "@/locales/en/landing.json";
import type { Locale } from "./config";

export const NS = "landing";
export type LandingResource = typeof en;

/** Shared i18next options for the server helper and the client provider. */
export const i18nOptions = (lng: Locale, landing: LandingResource) => ({
  lng,
  fallbackLng: false as const,
  ns: [NS],
  defaultNS: NS,
  resources: { [lng]: { [NS]: landing } },
  // React escapes the output itself.
  interpolation: { escapeValue: false },
  initAsync: false,
  showSupportNotice: false,
});
