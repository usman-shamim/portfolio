# Portfolio Development Handoff

## Current state

A single-page Next.js 16 portfolio for **M. Usman Shamim**, a forward deployed
engineer working across chemical process systems and agentic AI. It is positioned
for two audiences at once: clients who need agents, automation or a web presence,
and employers hiring for agentic AI work.

`app/page.tsx` is the source of truth for what the page claims. Its sections are
Services, Capabilities, Experience, Credentials, Stack, Work, Private and Contact;
read it before editing copy. Two supporting documents are deliberately kept off
the page:

- `docs/backlog.md` — planned work, none of it built.
- `docs/scenarios.md` — worked illustrations, explicitly not delivered engagements.

`app/globals.css` owns the design tokens and the motion system. The palette is an
annunciator amber/graphite set, not the earlier cyan AI-tool look.
`app/opengraph-image.tsx` generates the share card from the same palette.

## Deliberate decisions — do not "correct" these

The `207d467` redesign made these choices on purpose:

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
