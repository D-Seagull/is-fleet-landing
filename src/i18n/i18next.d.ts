// Typed keys: `t("hero.title")` is checked against the English file at compile time.
import "i18next";
import type en from "@/locales/en/landing.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "landing";
    resources: { landing: typeof en };
  }
}
