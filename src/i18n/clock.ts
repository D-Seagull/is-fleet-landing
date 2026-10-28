import type { Locale } from "./config";

/** A mockup's message time: "03:55 PM" on the English page, "15:55" everywhere else. */
export function clock(lng: Locale, hhmm: string): string {
  if (lng !== "en") return hhmm;
  const [h, m] = hhmm.split(":").map(Number);
  return `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
