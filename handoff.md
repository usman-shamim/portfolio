# Portfolio Development Handoff

## Current state

A **nine-route** Next.js 16 portfolio for **M. Usman Shamim**, a forward deployed
engineer working across chemical process systems and agentic AI. It is positioned
for two audiences at once: clients who need agents, automation or a web presence,
and employers hiring for agentic AI work.

`app/content.ts` is the source of truth for what the site claims. Every section is
one `SECTIONS` entry, and the nav, the page headers and the footer trail all read
from that list, so a route cannot disagree with its own label. Read it before
editing copy. The routes are `/` plus `services`, `capabilities`, `experience`,
`credentials`, `stack`, `work`, `private` and `contact`; all are statically
prerendered.

Two supporting documents are deliberately kept off the site:

- `docs/backlog.md` — planned work, none of it built.
- `docs/scenarios.md` — worked illustrations, explicitly not delivered engagements.

`app/globals.css` owns the design tokens and the motion system. The current
direction is a **dense operator console**: border-led, a fixed left rail carrying
position and current state, compact mono data, and hue reserved strictly for status
(green running, amber attention, red fault). It shipped in **two themes**, dark by
default and light on request, sharing one set of semantic token names. It replaced
a paper specification sheet, which replaced an amber/graphite instrument panel,
which replaced the original cyan AI-tool look. `app/opengraph-image.tsx` generates
the share card from the dark palette, since a social card does not follow the
reader's theme.

The full design constitution is `.commandcode/design/brief.md`. Read it before
changing anything visual; it carries both token tables, the type roles, the
component rules, the theme rules and the claims that must not drift.

## Deliberate decisions — do not "correct" these

Four visual languages have come and gone since these decisions were made (cyan,
amber instrument panel, paper specification sheet, and now the console). **The
decisions below were unaffected by all of them, and still stand:**

- No industrial-automation course was taken. PLC programming, HMI design and
  instrumentation are not claimed skills; OPC UA and PLC appear only as planned
  integration in the stack and backlog.
- PIAIC AI Architect and SMIT Agentic AI Engineer are **in progress**, never
  "certified". DAE Chemical Technology is in progress; Aptech ADSE is paused;
  CPISM stays completed.
- Archived or third-party work is excluded (sentinal-memory, odysseus, PSX,
  autoclip, PRIMM-AI+, saleor).
- Private repositories are described as projects, marked private, with no source
  link.
- Client work is framed as objective and target market, never as a delivered
  engagement, because no client deployment can be verified.
- The voice receptionist appears as a service and as two projects: field service
  and HVAC, and general inbound for businesses that live on the phone.

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the absolute base for metadata and the share card; it
falls back to `http://localhost:3000`. Set it on the deploy target.

## Environment

Next.js 16.3.0 (Turbopack), Tailwind CSS v4, TypeScript. `npm run lint` runs
ESLint; `npx tsc --noEmit` type-checks.
