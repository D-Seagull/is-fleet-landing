"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Page-wide motion, driven by data attributes so section components stay server-rendered:
 *  - [data-hero-item] / [data-hero-dash] / [data-mock-item] — hero intro on load
 *  - [data-pulse]   — endless ring pulse (the "Early access" badge dot)
 *  - [data-reveal]  — element fades up when it scrolls into view
 *  - [data-stagger] — its children fade up one after another
 *  - [data-story]   — the hero: pinned, scroll-scrubbed walk through the three apps on desktop,
 *                     a plain fade-up of the phones on smaller screens
 * Nothing runs for visitors who prefer reduced motion (the <head> script doesn't add `motion` either).
 */
export function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero-item]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 })
        .fromTo("[data-hero-dash]", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.55")
        .from("[data-mock-item]", { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, "-=0.45");

      gsap.fromTo(
        "[data-pulse]",
        { scale: 1, opacity: 0.55 },
        { scale: 3, opacity: 0, duration: 1.6, ease: "power2.out", repeat: -1, repeatDelay: 0.3 },
      );

      const reveal = { y: 28, autoAlpha: 0, duration: 0.7, ease: "power2.out" };

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { ...reveal, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          ...reveal,
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });
    });

    // Hero story, desktop: the hero stays pinned for a short stretch and the scroll position drives
    // the story (scrub) — the web app first, then IS Manager slides in, then IS Driver; scrolling back
    // runs it backwards. Kept short so a single swipe gets through it. Non-current steps are dimmed.
    // Very short windows (< 560px) don't pin: the hero would not fit, so it just scrolls.
    mm.add("(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)", () => {
      const story = document.querySelector<HTMLElement>("[data-story]");
      if (!story) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]", story);
      const phones = gsap.utils.toArray<HTMLElement>("[data-story-phone]", story);
      const desk = story.querySelector("[data-story-desk]");
      const dim = 0.3;
      // Every change in the story takes the same share of the scroll and moves at a constant
      // speed (linear ease), so the manager phone and the driver phone arrive at the same pace.
      const STEP = 1;
      // Rest after the last device lands, so the scrub has caught up and the story is fully still
      // before the pin lets go — without it the driver phone was still moving as the page took off.
      const HOLD = 0.4;
      const slideIn = (el: Element, at: string) =>
        tl.fromTo(el, { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: STEP }, at);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: story,
          // The hero starts at the very top (the fixed header floats over its padding-top),
          // so the pin engages at scroll 0 with nothing to jump.
          start: "top top",
          // 2 steps × 400px + a 160px rest at the end (see HOLD) — same 400px per step as before.
          end: "+=960",
          pin: true,
          // pinSpacing must be explicit: GSAP turns it off when the pinned element sits in a flex parent.
          pinSpacing: true,
          // Engage the pin a frame early — otherwise the first wheel tick scrolls the hero up and it
          // snaps back when position: fixed kicks in (a visible jerk right before the story starts).
          anticipatePin: 1,
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
        delete document.documentElement.dataset.storyEnd;
      };
    });

    // Hero story, smaller screens: no pinning — the phones under the window just fade up.
    mm.add("(max-width: 899px), (max-height: 559px)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-story-phone]").forEach((el) => {
        gsap.from(el, { y: 28, autoAlpha: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
    });

    return () => mm.revert();
  });

  return null;
}
