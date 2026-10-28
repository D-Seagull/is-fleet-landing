"use client";

import { createInstance } from "i18next";
import { useState, type ReactNode } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import type { Locale } from "./config";
import { i18nOptions, type LandingResource } from "./options";

/**
 * Gives client components (`useTranslation`) the page's language. The server passes in only that
 * language's strings, so the client bundle doesn't carry all six.
 */
export function I18nProvider({ lng, landing, children }: { lng: Locale; landing: LandingResource; children: ReactNode }) {
  const [i18n] = useState(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init(i18nOptions(lng, landing));
    return instance;
  });
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
