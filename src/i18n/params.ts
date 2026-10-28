import { notFound } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./config";

/** Route params of `app/[[...lng]]`: none for English, one language code otherwise. */
export type LocaleParams = Promise<{ lng?: string[] }>;

/** The page's language from the optional `[[...lng]]` segment; `/en` and unknown codes are a 404. */
export async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { lng } = await params;
  if (!lng?.length) return defaultLocale;
  if (lng.length === 1 && lng[0] !== defaultLocale && isLocale(lng[0])) return lng[0];
  notFound();
}
