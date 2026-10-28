"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Page-wide motion, driven by data attributes so section components stay server-rendered:
 *  - [data-hero-item] / [data-hero-dash] / [data-mock-item] — hero intro on load (app mockups not on tablets)
 *  - [data-pulse]   — endless ring pulse (the "Early access" badge dot)
 *  - [data-reveal]  — element fades up when it scrolls into view
 *  - [data-stagger] — its children fade up one after another
 *  - [data-story]   — the hero: sticky, scroll-scrubbed walk through the three apps on desktop,
 *                     a plain fade-up of the phones on smaller screens
 * Nothing runs for visitors who prefer reduced motion (the <head> script doesn't add `motion` either).
 */
/** Where the app mockups (web window + phones) move: the desktop layout, but not an upright touch
 *  tablet (a big iPad gets the desktop layout; in landscape it keeps the story). Everywhere else —
 *  phones (mockups behind a toggle, see AppPreview), tablets — they are shown as they are.
 *  Keep in sync with globals.css (pre-hide) and Hero.module.css (sticky track). */
const DESKTOP_MOTION = "(min-width: 900px) and (pointer: fine), (min-width: 900px) and (orientation: landscape)";

export function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The pieces start at opacity 0 in CSS (globals.css, under html.motion) and every tween below
      // fades them *to* 1 — so nothing is painted, hidden and shown again. motionReady stops the
      // <head> fallback that would otherwise drop `motion` when this bundle is slow (layout.tsx).
      const root = document.documentElement;
      root.dataset.motionReady = "";
      root.classList.add("motion");

      const intro = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero-item]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 });
      if (window.matchMedia(DESKTOP_MOTION).matches) {
        intro
          .fromTo("[data-hero-dash]", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.55")
          .from("[data-mock-item]", { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, "-=0.45");
      }

      gsap.fromTo(
        "[data-pulse]",
        { scale: 1, opacity: 0.55 },
        { scale: 3, opacity: 0, duration: 1.6, ease: "power2.out", repeat: -1, repeatDelay: 0.3 },
      );

      const hidden = { y: 28, autoAlpha: 0 };
      const shown = { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out" };

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, hidden, { ...shown, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(group.children, hidden, {
          ...shown,
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });
    });

    // Hero story, desktop: the hero stays put for a short stretch and the scroll position drives
    // the story (scrub) — the web app first, then IS Manager slides in, then IS Driver; scrolling back
    // runs it backwards. Kept short so a single swipe gets through it. Non-current steps are dimmed.
    // The hold itself is CSS (position: sticky in Hero.module.css, same media query); this only
    // scrubs the timeline over that stretch. Very short windows (< 560px) don't hold: the hero
    // would not fit, so it just scrolls.
    mm.add({ desktop: DESKTOP_MOTION, tall: "(min-height: 560px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { desktop, tall, motion } = ctx.conditions ?? {};
      if (!desktop || !tall || !motion) return;
      const story = document.querySelector<HTMLElement>("[data-story]");
      if (!story) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", story);
      const phones = gsap.utils.toArray<HTMLElement>("[data-story-phone]", story);
      const desk = story.querySelector("[data-story-desk]");
      const hero = story.firstElementChild as HTMLElement;
      // Where the sticky hero rests: at the top, or — when it is taller than the window (a small
      // laptop, browser zoom) — with its bottom edge on screen, so the phones that slide in are seen.
      const stickAt = () => {
        const top = Math.min(0, window.innerHeight - hero.offsetHeight);
        hero.style.top = `${top}px`;
        return top;
      };
      const dim = 0.3;
      // Every change in the story takes the same share of the scroll and moves at a constant
      // speed (linear ease), so the manager phone and the driver phone arrive at the same pace.
      const STEP = 1;
      // Rest after the last device lands, so the scrub has caught up and the story is fully still
      // before the page moves on — without it the driver phone was still moving as the page took off.
      const HOLD = 0.4;
      // 2 steps × 400px + a 160px rest at the end (HOLD) — the sticky track in Hero.module.css.
      const STORY_SCROLL = 960;
      const slideIn = (el: Element, at: string) =>
        tl.fromTo(el, { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: STEP }, at);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: story,
          // The story starts as the hero comes to rest (scroll 0 when it fits the window).
          start: () => `top ${stickAt()}px`,
          end: `+=${STORY_SCROLL}`,
          scrub: 0.6,
          // Tell the header where the story ends: it stays full-size while the story plays and
          // only shrinks once the page scrolls on past it (see SiteHeader).
          onRefresh: (self) => {
            document.documentElement.dataset.storyEnd = String(Math.round(self.end));
          },
        },
      });
      tl.addLabel("manager", 0).addLabel("driver", STEP);
      tl.fromTo(steps.slice(1), { opacity: dim }, { opacity: dim, duration: 0 }, 0);
      tl.to(steps[0], { opacity: dim, duration: STEP }, "manager")
        .to(steps[1], { opacity: 1, duration: STEP }, "manager")
        .fromTo(desk, { scale: 1 }, { scale: 0.96, duration: STEP }, "manager");
      slideIn(phones[0], "manager");
      tl.to(steps[1], { opacity: dim, duration: STEP }, "driver").to(steps[2], { opacity: 1, duration: STEP }, "driver");
      slideIn(phones[1], "driver");
      tl.to({}, { duration: HOLD });

      return () => {
        hero.style.top = "";
        delete document.documentElement.dataset.storyEnd;
      };
    });

    // Hero story, desktops too short to hold the hero: the phones under the window just fade up.
    mm.add({ desktop: DESKTOP_MOTION, short: "(max-height: 559px)" }, (ctx) => {
      const { desktop, short } = ctx.conditions ?? {};
      if (!desktop || !short) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-story-phone]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });
    });

    return () => mm.revert();
  });

  return null;
}
