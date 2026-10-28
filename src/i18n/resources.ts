// Every translation is bundled at build time — nothing is fetched at runtime. Server-only in
// practice: client components get their page's strings through I18nProvider.
import de from "@/locales/de/landing.json";
import en from "@/locales/en/landing.json";
import lt from "@/locales/lt/landing.json";
import pl from "@/locales/pl/landing.json";
import ru from "@/locales/ru/landing.json";
import uk from "@/locales/uk/landing.json";
import type { Locale } from "./config";
import type { LandingResource } from "./options";

export const resources: Record<Locale, LandingResource> = { en, uk, pl, lt, de, ru };
