import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Store } from "@/lib/site";
import { AppleGlyph, PlayGlyph, WindowsGlyph } from "./icons";
import styles from "./StoreButton.module.css";

const storeMeta: Record<Store, { name: string; glyph: ReactNode }> = {
  appStore: { name: "App Store", glyph: <AppleGlyph /> },
  googlePlay: { name: "Google Play", glyph: <PlayGlyph /> },
  windows: { name: "Windows", glyph: <WindowsGlyph /> },
  macos: { name: "macOS", glyph: <AppleGlyph /> },
};

/** Store badge-style button for dark sections. `url: null` renders a dimmed, non-clickable placeholder
 * (the card shows one "Coming soon" badge for all of its links). `small` is the translated caption
 * above the store name ("Download on the", "Get it on", …). */
export function StoreButton({ store, url, small }: { store: Store; url: string | null; small: string }) {
  const m = storeMeta[store];
  const inner = (
    <>
      {m.glyph}
      <span className={styles.text}>
        <span className={styles.small}>{small}</span>
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
