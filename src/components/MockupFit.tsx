"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Width the app window is laid out at — wide enough for every part of the real screen
 *  (truck list, all tabs, trip actions; see the @container rules in DashboardMockup.module.css). */
const DESIGN_WIDTH = 760;

/**
 * Shows the app window as one picture: always laid out at full size, then zoomed to the width it
 * gets, so a phone or tablet sees the same screen as a desktop, just smaller. Until this runs
 * (no JS yet) the window falls back to its own responsive layout.
 */
export function MockupFit({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      // 0 while hidden (the phone toggle) — keep the last value
      if (width > 0) setZoom(width / DESIGN_WIDTH);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The window's height changes with it: let the scroll story re-measure.
  const fitted = zoom !== null;
  useEffect(() => {
    if (fitted) ScrollTrigger.refresh();
  }, [fitted]);

  return (
    <div ref={outer}>
      <div style={zoom === null ? undefined : { width: DESIGN_WIDTH, zoom }}>{children}</div>
    </div>
  );
}
