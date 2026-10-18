// Every outbound link and contact the landing uses, in one place.

export const APP_URL = "https://is-fleet-frontend.vercel.app";

export const site = {
  name: "IS Fleet",
  title: "IS Fleet — From chaos to control",
  description:
    "The connected workspace for modern fleet teams. Plan every trip, see every vehicle, move freight with confidence.",
  contactEmail: "isfleet.eu@gmail.com",
  loginUrl: `${APP_URL}/login`,
  privacyUrl: `${APP_URL}/privacy`,
  termsUrl: `${APP_URL}/terms`,
};

export const navLinks = [
  { href: "#compare", label: "Why IS Fleet" },
  { href: "#features", label: "Features" },
  { href: "#apps", label: "Apps" },
  { href: "#who", label: "Who it's for" },
];

export type Store = "appStore" | "googlePlay" | "windows";

/**
 * Store / download links, shown on the app cards in the Apps section. `url: null` renders a
 * "Coming soon" placeholder instead of a link — fill the URL in once the listing is public.
 */
export const downloads: Record<"desktop" | "manager" | "driver", Array<{ store: Store; url: string | null }>> = {
  desktop: [{ store: "windows", url: null }],
  manager: [
    { store: "appStore", url: null },
    { store: "googlePlay", url: null },
  ],
  driver: [
    { store: "appStore", url: null },
    { store: "googlePlay", url: null },
  ],
};
