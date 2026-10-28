import { createInstance, type TFunction } from "i18next";
import type { Locale } from "./config";
import { i18nOptions } from "./options";
import { resources } from "./resources";

const cache = new Map<Locale, TFunction>();

/** `t` for server components. One i18next instance per language, created on first use. */
export function getT(lng: Locale): TFunction {
  let t = cache.get(lng);
  if (!t) {
    const i18n = createInstance();
    i18n.init(i18nOptions(lng, resources[lng]));
    t = i18n.t;
    cache.set(lng, t);
  }
  return t;
}
