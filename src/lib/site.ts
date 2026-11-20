// Every outbound link and contact the landing uses, in one place.

// Addresses come only from the environment (.env.local locally, Vercel project settings in
// production; see .env.example). NEXT_PUBLIC_* values are baked in at build time, so a missing
// one fails the build instead of shipping a page that points nowhere.
function requireUrl(name: string, value: string | undefined): string {
  if (!value) throw new Error(`${name} is not set — see .env.example`);
  return value.replace(/\/+$/, "");
}

/** Where the landing itself is published — absolute URLs for hreflang / canonical / Open Graph. */
export const SITE_URL = requireUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL);
/** The web app: Log in, privacy, terms. */
export const APP_URL = requireUrl("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL);
/** Backend the public forms post to (POST /public/trial-signup, /public/demo-request). */
export const API_URL = requireUrl("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);
/** Self-serve trial is closed while the app is in testing: the CTAs book a demo and the form
 *  shows the trial as "soon". Flip to true to open sign-ups (the backend side is live). */
export const TRIAL_OPEN = false;
/** Where the main call to action points; `labelKey` is a translation key. */
export const PRIMARY_CTA = TRIAL_OPEN
  ? { href: "#trial", labelKey: "cta.trial" as const }
  : { href: "#demo", labelKey: "cta.demo" as const };

export const site = {
  name: "IS Fleet",
  contactEmail: "info@isfleet.eu",
  /** Shown as written; `contactPhoneHref` is the same number for tel: links. */
  contactPhone: "+48 794 467 804",
  contactPhoneHref: "+48794467804",
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

/** An optional link from the environment: unset or empty → null ("Coming soon"). */
const optionalUrl = (value: string | undefined) => value?.trim() || null;

/**
 * Store / download links, shown on the app cards in the Apps section. Each one comes from its own
 * env var (see .env.example); a missing one renders a "Coming soon" placeholder instead of a link,
 * so a listing goes live by setting the variable in Vercel — no code change.
 */
export const downloads: Record<"desktop" | "manager" | "driver", Array<{ store: Store; url: string | null }>> = {
  desktop: [
    { store: "windows", url: optionalUrl(process.env.NEXT_PUBLIC_DESKTOP_WINDOWS_URL) },
    { store: "macos", url: optionalUrl(process.env.NEXT_PUBLIC_DESKTOP_MACOS_URL) },
  ],
  manager: [
    { store: "appStore", url: optionalUrl(process.env.NEXT_PUBLIC_MANAGER_APPSTORE_URL) },
    { store: "googlePlay", url: optionalUrl(process.env.NEXT_PUBLIC_MANAGER_PLAY_URL) },
  ],
  driver: [
    { store: "appStore", url: optionalUrl(process.env.NEXT_PUBLIC_DRIVER_APPSTORE_URL) },
    { store: "googlePlay", url: optionalUrl(process.env.NEXT_PUBLIC_DRIVER_PLAY_URL) },
  ],
};
