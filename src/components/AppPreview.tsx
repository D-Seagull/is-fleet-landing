"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cx } from "@/lib/cx";
import styles from "./AppPreview.module.css";
import { ChevronDownIcon, MonitorIcon } from "./icons";

/**
 * The hero's app mockups (web window + phones). On phones they are tucked away behind a button so
 * the first screen stays short; from 640px up they are always shown and the button is hidden.
 */
export function AppPreview({ className, children }: { className: string; children: ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggled = useRef(false);

  // Opening or closing moves everything below: let scroll-triggered reveals re-measure.
  useEffect(() => {
    if (toggled.current) ScrollTrigger.refresh();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="app-preview"
        onClick={() => {
          toggled.current = true;
          setOpen((o) => !o);
        }}
      >
        <MonitorIcon size={18} />
        {open ? t("hero.hideApp") : t("hero.showApp")}
        <ChevronDownIcon size={16} className={cx(styles.chevron, open && styles.chevronUp)} />
      </button>
      <div id="app-preview" className={cx(className, styles.preview, open && styles.open)}>
        {children}
      </div>
    </>
  );
}
