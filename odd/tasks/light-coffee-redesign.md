# Feature: light-coffee-redesign

## Objective
Redesign the portfolio home from a dark espresso theme to a light "café con leche" theme that puts the projects front and center, following the approved mockup.

## Problem / Why
The current site is too dark and shows projects as text only. Clients need to see the work (real screenshots) and a more eye-catching, but still coffee-branded, page. References: rayyan.pe, samu-webart.com.

## Design source
Approved mockup (Design canvas): https://claude.ai/artifact/MdDtay3UNNq6LztuM8VFJL
Local copy of the markup: scratchpad `canvas/project/Main.dc.html` and `canvas/project/Visor.dc.html`.

## Scope (authorized)
- Light theme tokens; espresso reserved for accent blocks (nav pill, hero band, alternate project card, cup stage, closing CTA).
- Home order: Hero → La barra (projects) → La carta (services bento) → Cómo trabajo ("La preparación") → El origen → El molido → FAQs → Hablemos (closing CTA).
- Project screenshots (`public/projects/*.png`) in browser + phone frames, and a project viewer dialog with desktop/mobile toggle.
- /comanda page must stay readable under the new tokens.

## Constraints
- Next.js 16.3 (read `node_modules/next/dist/docs/` before using APIs), Tailwind v4 tokens in `src/app/globals.css`.
- All copy lives in `src/content/site.ts`; components stay dumb.
- Copy in neutral Spanish (tú); code, comments and identifiers in English.
- Motion: transform/opacity/clip-path only; respect `prefers-reduced-motion`; no gradients as decoration.
- Text contrast ≥ 4.5:1 on its actual ground.
- Planning heuristic ~400 authored lines per task (advisory only).

## TDD
Mode: off. Source: no test runner configured in package.json. Checks: `npm run lint`, `npm run build`.

## Delivery
Strategy: ask-on-risk (default). Work-unit commits on `feat/light-coffee-redesign`; push/PR are the user's decision. Forecast: ~1500–2000 authored lines (exceeds 400 → chain strategy to be asked before opening PRs).

## Tasks
- [x] T1 — Light theme tokens, Caveat font, floating pill header, footer restyle. Route: delegated (writer). 
- [x] T2 — Hero: headline + amber underline, sticker portrait, espresso band (lede + CTAs, amber "preparando" card with ScrambleText, "El código es tuyo" card); TechMarquee restyled. Route: delegated.
- [x] T3 — La barra: project screenshots in `site.ts`, alternating light/dark cards with browser + phone frames, "El próximo puede ser el tuyo" slot, ProjectViewer dialog (desktop/mobile toggle, project switch). Route: delegated.
- [x] T4 — La carta: bento of 4 grouped service cards + amber Auditoría exprés strip; "Cotizar" links to /comanda. Route: delegated.
- [x] T5 — La preparación: scroll-driven sticky cup (beans → ticket → pour + reviews → served + steam + stamp), steps list, reduced-motion static fallback, mobile layout. Route: delegated.
- [x] T7 — User feedback: hero brew words that overflowed the amber card removed; /comanda framed in an inset dark card (pill no longer merges into a full-bleed dark page); Café Nosé added as N.º 03 (concept from the "webs para emprendimientos de mi ciudad" series, Astro). Route: inline.
- [x] T6 — FAQs Samu-style (huge title, big questions with ↗, accordion), Origen/Molido restyle, closing "Hablemos." CTA band, /comanda readability. Route: delegated.

## Acceptance criteria
- Home matches the mockup's structure and look at desktop and phone widths, no horizontal scroll.
- `npm run lint` and `npm run build` pass.
- Keyboard: viewer dialog and accordions operable; focus visible.

## Progress / evidence
(updated per task with commit hashes and check results)

Pre-existing, not caused by this work: `next build` warns that `metadataBase` is not set for OG images (also present on base).

Design decisions:
- Light tokens added (`ground, card, line, line-dashed, tape, ink, ink-2, ink-3, copper`); the old dark names (`espresso, tostado, poso, crema, leche, vapor, ambar, cobre`) keep their meaning as the "inside a dark block" palette.
- /comanda is written against the dark palette, so its page sits on a `surface-dark bg-espresso` wrapper instead of being re-themed. `.surface-dark` also flips the focus ring to amber (amber is 1.9:1 on milk-coffee).
- Button gains `ink` / `outlineInk` variants for the light ground; `solid` / `outline` stay for dark.
- Between T1 and T6 the home sections not yet restyled still use dark-block tokens on the light ground; each is replaced by its own task.
- T1: lint OK, build OK (only the pre-existing metadataBase warning). Commit: 5c11c08
- T2: Hero (new sections/Hero.tsx, sticker portrait via next/image preload, amber underline, espresso band with ScrambleText card and code card), TechMarquee restyled, TechIcon falls back to currentColor for near-black brands. lint OK, build OK. Commit: 829f5de
- T3: La barra: Project data gains images/kind/summary/shortName, alternating cards with browser+phone frames, next-project slot, native <dialog> ProjectViewer; SectionHeader restyled (title+tape+lead); home reordered to final order; sections data reshaped. public/projects/webnose-* are untracked and unused (not committed). lint OK, build OK. Commit: 981b117
- T4: La carta: menu regrouped as data (menuGroups + auditOffer in site.ts), CartaBento component, MenuRow deleted (unused). /comanda has no product URL param, so Cotizar links to /comanda plainly. lint OK, build OK. Commit: b2a1865
- T5: La preparación: client Preparation.tsx (scroll-progress sticky stage on md+, IntersectionObserver on mobile, reduced-motion static finished cup, keyframes in globals.css, shared useReducedMotion hook); process data gained stage/tag (existing body copy kept, icon field dropped), processVisual added; ProcessAccordion deleted. Manually verified in browser at 1440px (steps 1 and 3, viewer Esc/focus return). Also tuned Hero band flex so the ScrambleText card does not clip. lint OK, build OK. Commit: 2e47ac9
- T6: FAQs Samu-style (FaqAccordion rewritten, single-open, button+aria-expanded+region, two questions shortened), Origen text-only, StackGrid light, closing Hablemos band (id=comanda), page.tsx rewritten in final order, Accordion.tsx deleted, opengraph-image on light palette. Checked in browser: no horizontal overflow at 390px on / and /comanda; /comanda readable on dark wrapper; header CTA no longer wraps on mobile. lint OK, build OK. Commit: 02c91ce

- T7: lint OK, build OK, /comanda checked in headless Chrome at 1440px. Commits: 79dd7b0, a195a07

## Next step
Done; awaiting user review / delivery decision (push/PR not done).
