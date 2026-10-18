/* eslint-disable @next/next/no-img-element -- a static SVG wordmark; next/image adds nothing here */
import { cx } from "@/lib/cx";
import styles from "./Logo.module.css";

export function Logo({ href, label, small }: { href: string; label: string; small?: boolean }) {
  return (
    <a href={href} className={cx(styles.logo, small && styles.small)} aria-label={label}>
      <img src="/logo.svg" alt="" width={1458} height={324} />
    </a>
  );
}
