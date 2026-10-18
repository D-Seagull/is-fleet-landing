# IS Fleet — landing

Marketing site for IS Fleet. Next.js 16 (App Router), React 19, CSS Modules, GSAP. Fully static — every page is prerendered at build time.

## Run

```bash
npm install
npm run dev      # http://localhost:3100
npm run build    # production build
npm run lint
```

## Where things live

- `src/lib/site.ts` — every outbound link and contact: app URL, login / privacy / terms, contact email, and the store download links (`url: null` shows a "Coming soon" button).
- `src/components/` — one component per section, each with its own `*.module.css`. Shared primitives (container, headings, buttons) are in `src/styles/ui.module.css`; `src/app/globals.css` holds only design tokens and element defaults.
- `src/components/Motion.tsx` — all animation (GSAP + ScrollTrigger), driven by `data-*` attributes so the sections stay server components. The hero's scroll story is pinned on desktop; everything is skipped for visitors who prefer reduced motion.
- `DashboardMockup` / `PhoneMockups` — static HTML copies of the web app, IS Manager and IS Driver screens. Names, trucks and the trip are made up.

## Deploy

Vercel, framework preset Next.js, no environment variables needed.
