import { useId } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./LanguageSwitcher.module.css";

// Inline SVG flags for the language switcher — emoji flags don't render on Windows.
// Russian deliberately gets no flag, only a neutral "RU" badge (product decision: a Russian flag
// would put off carriers from Ukraine, Poland and Lithuania).

function Stripes({ colors }: { colors: string[] }) {
  const h = 30 / colors.length;
  return (
    <>
      {colors.map((c, i) => (
        <rect key={c} y={i * h} width="45" height={h} fill={c} />
      ))}
    </>
  );
}

function UnionJack() {
  const id = useId();
  return (
    <>
      <clipPath id={`${id}t`}>
        <path d="M22.5 15h22.5v15zv15H0zH0V0zV0h22.5z" />
      </clipPath>
      <rect width="45" height="30" fill="#012169" />
      <path d="M0 0l45 30M45 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l45 30M45 0L0 30" stroke="#C8102E" strokeWidth="3" clipPath={`url(#${id}t)`} />
      <path d="M22.5 0v30M0 15h45" stroke="#fff" strokeWidth="10" />
      <path d="M22.5 0v30M0 15h45" stroke="#C8102E" strokeWidth="6" />
    </>
  );
}

const flags: Record<Exclude<Locale, "ru">, () => React.ReactNode> = {
  en: () => <UnionJack />,
  uk: () => <Stripes colors={["#0057B7", "#FFD700"]} />,
  pl: () => <Stripes colors={["#fff", "#DC143C"]} />,
  lt: () => <Stripes colors={["#FDB913", "#006A44", "#C1272D"]} />,
  de: () => <Stripes colors={["#000", "#DD0000", "#FFCE00"]} />,
};

/** The language's flag, or the "RU" badge for Russian. Decorative: the language name sits next to it. */
export function Flag({ lng }: { lng: Locale }) {
  if (lng === "ru") {
    return (
      <span className={styles.badge} aria-hidden="true">
        RU
      </span>
    );
  }
  const Draw = flags[lng];
  return (
    <svg className={styles.flag} viewBox="0 0 45 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Draw />
    </svg>
  );
}
