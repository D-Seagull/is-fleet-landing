import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Store } from "@/lib/site";
import { AppleGlyph, PlayGlyph, WindowsGlyph } from "./icons";
import styles from "./StoreButton.module.css";

const storeMeta: Record<Store, { small: string; name: string; glyph: ReactNode }> = {
  appStore: { small: "Download on the", name: "App Store", glyph: <AppleGlyph /> },
  googlePlay: { small: "Get it on", name: "Google Play", glyph: <PlayGlyph /> },
  windows: { small: "Download for", name: "Windows", glyph: <WindowsGlyph /> },
};

/** Store badge-style button for dark sections. `url: null` renders a dimmed, non-clickable placeholder
 * (the card shows one "Coming soon" badge for all of its links). */
export function StoreButton({ store, url }: { store: Store; url: string | null }) {
  const m = storeMeta[store];
  const inner = (
    <>
      {m.glyph}
      <span className={styles.text}>
        <span className={styles.small}>{m.small}</span>
        <span className={styles.name}>{m.name}</span>
      </span>
    </>
  );

  if (!url) {
    return (
      <span className={cx(styles.store, styles.soon)} aria-disabled="true">
        {inner}
      </span>
    );
  }
  return (
    <a className={styles.store} href={url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}
