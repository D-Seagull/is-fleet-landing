// Every outbound link and contact the landing uses, in one place.

/** Where the landing itself is published — absolute URLs for hreflang / canonical / Open Graph. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://isfleet.eu";
export const APP_URL = "https://app.isfleet.eu";
/** Backend the public forms post to (POST /public/trial-signup, /public/demo-request). */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.isfleet.eu";
/** Self-serve trial is closed while the app is in testing: the CTAs book a demo and the form
 *  shows the trial as "soon". Flip to true to open sign-ups (the backend side is live). */
export const TRIAL_OPEN = false;
/** Where the main call to action points; `labelKey` is a translation key. */
export const PRIMARY_CTA = TRIAL_OPEN
  ? { href: "#trial", labelKey: "cta.trial" as const }
  : { href: "#demo", labelKey: "cta.demo" as const };

export const site = {
  name: "IS Fleet",
  contactEmail: "isfleet.eu@gmail.com",
  loginUrl: `${APP_URL}/login`,
  privacyUrl: `${APP_URL}/privacy`,
  termsUrl: `${APP_URL}/terms`,
};

/** Header anchors; `key` is the translation key under `nav`. */
export const navLinks = [
  { href: "#compare", key: "nav.compare" },
  { href: "#features", key: "nav.features" },
  { href: "#apps", key: "nav.apps" },
  { href: "#who", key: "nav.who" },
] as const;

export type Store = "appStore" | "googlePlay" | "windows" | "macos";

/**
 * Store / download links, shown on the app cards in the Apps section. `url: null` renders a
 * "Coming soon" placeholder instead of a link — fill the URL in once the listing is public.
 */
export const downloads: Record<"desktop" | "manager" | "driver", Array<{ store: Store; url: string | null }>> = {
  desktop: [
    { store: "windows", url: null },
    { store: "macos", url: null },
  ],
  manager: [
    { store: "appStore", url: null },
    { store: "googlePlay", url: null },
  ],
  driver: [
    { store: "appStore", url: null },
    { store: "googlePlay", url: null },
  ],
};
