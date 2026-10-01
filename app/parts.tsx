/*
  Presentational components. This module has no "use client", so everything here
  renders on the server and ships no JavaScript. The interactive pieces — the
  route nav, the theme control, the reveal stagger and the copy button — live in
  ./components instead.
*/

import Link from "next/link";
import type { ReactNode } from "react";
import { CLAIM, CURRENT, DISCIPLINES, FIELD_REPORT, NAME, ROLE, SECTIONS } from "./content";
import { CompactNav, PixelCta, RailNav, ThemeToggle } from "./components";

function cls(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

/* ── Skip link ──
   The bar holds ten stops before any content. A keyboard visitor should not have
   to walk them on every page. */

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:border focus:border-signal focus:bg-panel focus:px-4 focus:py-3 focus:text-sm focus:text-ink"
    >
      Skip to content
    </a>
  );
}

/* ── The rail ──
   The page's composition. A sticky left column carrying the wordmark, every
   section as a route, the current readout and the theme control. It sits in the
   same flex row as the content, so its width and the content's width come from
   one place and cannot disagree.

   The middle section scrolls on its own, so a short window scrolls the nav rather
   than clipping the readout at the bottom. */

export function SiteRail() {
  return (
    /* No background: the body paints the ground and the field grid, and the rail has to
       let both through or the grid stops at the rail's edge and the composition looks
       painted on rather than drawn. Nothing scrolls under this rail, so transparency
       costs nothing here. The sticky bar below is the opposite case and keeps its own
       ground. */
    <div className="rail-wide pad-safe-top z-30 flex-col border-e border-line">
      <div className="gutter flex-none py-4">
        <Link
          href="/"
          className="press mono inline-flex min-h-11 items-center text-[11px] tracking-[0.24em] text-accent hover:text-ink-2 active:translate-y-px"
        >
          USMAN.SHAMIM
        </Link>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-2">
        <RailNav />
      </div>

      <div className="gutter flex-none border-t border-line py-4">
        <p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-ink-3">Current</p>
        <ul className="mb-4 space-y-2.5">
          {CURRENT.map((c) => (
            <li key={c.label} className="flex items-baseline justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span
                  className={cls("inline-block h-1.5 w-1.5 shrink-0", TONE_DOT[c.tone])}
                  aria-hidden="true"
                />
                <span className="mono text-[11px] text-ink-2">{c.label}</span>
              </span>
              <span className="mono text-[10px] text-ink-3">{c.status}</span>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </div>
  );
}

/* ── The narrow bar ──
   Below the breakpoint the rail becomes a sticky bar: the wordmark, a disclosure
   holding every route, and the theme control. No route is amputated. */

export function TopBar() {
  return (
    <div className="rail-narrow pad-safe-top sticky top-0 z-30 border-b border-line bg-ground">
      <div className="gutter flex items-center justify-between gap-3 py-2.5">
        <Link
          href="/"
          className="press mono inline-flex min-h-11 items-center text-[11px] tracking-[0.24em] text-accent hover:text-ink-2 active:translate-y-px"
        >
          USMAN.SHAMIM
        </Link>

        <div className="flex items-center gap-2">
          <CompactNav />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

/* ── Page header ──
   Every route opens the same way: the section index and label, the title, and a
   paragraph that says what the page is for. */

export function PageHeader({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="gutter border-b border-line pb-9 pt-9 md:pt-12">
      <p className="console-chunk mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
        <span className="text-ink-2">{index}</span>
        <span className="px-2 text-line-strong" aria-hidden="true">/</span>
        {label}
      </p>
      <h1 className="console-chunk mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
        {title}
      </h1>
      <p className="console-chunk body-text measure mt-4 text-ink-2">{lede}</p>
    </header>
  );
}

/* ── Field report ──
   The home hero's proof object. A compact readout of the real systems, each with
   its honest state and the outcome in the client's terms, so a visitor deciding
   whether to read on meets the work before any explanation of it. Rows, not
   cards, in the same ledger vocabulary the rest of the console speaks. */
export function FieldReport() {
  return (
    <section aria-labelledby="field-report" className="console-chunk bg-panel p-5 pixel-cut md:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="field-report" className="mono text-[11px] uppercase tracking-[0.12em] text-accent">
          Field report
        </h2>
        <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
          {FIELD_REPORT.length} systems
        </span>
      </div>
      <ul className="mt-5 space-y-5">
        {FIELD_REPORT.map((s) => (
          <li key={s.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold text-ink">{s.name}</h3>
              <StatusMark tone={s.tone}>{s.state}</StatusMark>
            </div>
            <p className="body-text mt-1.5 text-ink-2">{s.outcome}</p>
          </li>
        ))}
      </ul>
      <Link
        href="/work"
        className="press group mono mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink active:translate-y-px"
      >
        See all the work
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </section>
  );
}

export function HomeHeader() {
  return (
    <header className="gutter grid gap-10 pb-10 pt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:pb-12 md:pt-16">
      <div>
        <p className="console-chunk mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
          {ROLE}
          <span className="px-2 text-line-strong" aria-hidden="true">/</span>
          {DISCIPLINES}
        </p>

        <h1 className="console-chunk mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-accent md:text-4xl">
          {NAME}
        </h1>

        <p className="console-chunk body-text measure mt-5 text-ink-2">{CLAIM}</p>

        <div className="console-chunk mt-6 flex flex-col gap-2.5 sm:flex-row">
          <PixelCta href="/work" variant="primary">
            See the shipped work
          </PixelCta>
          <PixelCta href="/services" variant="secondary">
            See what I take on
          </PixelCta>
        </div>
      </div>

      <FieldReport />
    </header>
  );
}

/* ── Section index ──
   The map the old single page got for free by being one scroll. Every section is
   a row, and the row is the link. */

export function SectionIndex() {
  return (
    <nav aria-label="All sections" className="band gutter py-10 md:py-12">
      <div className="band-head mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2.5">
        <h2 className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2">What is here</h2>
        <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
          {SECTIONS.length} sections
        </span>
      </div>
      <ul className="space-y-1">
        {SECTIONS.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="press group grid gap-x-8 gap-y-1 px-1 py-3.5 active:translate-y-px md:grid-cols-[7rem_minmax(0,1fr)_auto] md:items-baseline"
            >
              <span className="mono text-[11px] text-ink-3">{s.index}</span>
              <span>
                <span className="block text-lg font-semibold text-ink decoration-line-strong underline-offset-4 group-hover:text-ink-2 group-hover:underline">
                  {s.label}
                </span>
                <span className="body-text measure mt-1 block text-ink-2">{s.blurb}</span>
              </span>
              <span
                aria-hidden="true"
                className="mono hidden text-[11px] text-ink-3 transition-transform duration-150 group-hover:translate-x-0.5 md:block"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Group ──
   A labelled block inside a page, on its own hairline. */

export function Group({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="band gutter py-10 md:py-12">
      <div className="band-head mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2.5">
        <h2 className="mono text-[11px] uppercase tracking-[0.12em] text-ink-2">{label}</h2>
        {meta && (
          <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{meta}</span>
        )}
      </div>
      {children}
    </section>
  );
}

/* ── Status ──
   A dot plus a written label. Colour never carries the meaning on its own:
   green reads as running, amber as attention, and half the sentence is words. */

export type Tone = "running" | "signal" | "alert";

const TONE_DOT: Record<Tone, string> = {
  running: "bg-running",
  signal: "bg-signal",
  alert: "bg-alert",
};

export function StatusMark({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-3">
      <span className={cls("inline-block h-1.5 w-1.5 shrink-0", TONE_DOT[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}

/* ── Keywords ──
   Index terms for a row, separated rather than boxed. Chips were a UI reflex. */

export function Keywords({ items }: { items: readonly string[] }) {
  return (
    <p className="mono mt-2.5 text-[11px] leading-[1.8] tracking-[0.04em] text-ink-3">
      {items.join(" · ")}
    </p>
  );
}

/* ── Ledger and rows ──
   Rows, not cards. Dense enough to scan a set in one pass, which is the whole
   job of a console. */

export function Ledger({ children, className }: { children: ReactNode; className?: string }) {
  /* A real list, so a screen reader announces the set and how many are in it. */
  return <ul className={cls("space-y-6", className)}>{children}</ul>;
}

export function Row({
  title,
  meta,
  detail,
  tags,
  status,
  href,
}: {
  title: string;
  meta?: string;
  detail?: string;
  tags?: readonly string[];
  status?: { tone: Tone; label: string };
  href?: string;
}) {
  /* Only a link that leaves the site opens a new tab, and only that kind gets the
     new-tab hint. Deriving it from the href means a future internal Row cannot
     silently start opening tabs or claiming to. */
  const external = href ? /^https?:/i.test(href) : false;

  const titleNode = href ? (
    /* The link is the title, not the row. Wrapping the whole row put the title,
       the metadata, the detail and the keyword list into one accessible name,
       which ran past 80 characters and told a screen-reader user nothing until it
       finished. The stretched ::after keeps the whole row clickable.

       The underline is at rest, not hover-only. It was `hover:underline`, which meant
       a ledger row carried no cue at all until a pointer arrived: on touch the title
       read as bold static text, and the row's only other signal was the hover
       background. Every other linked element on the site already shows what it is
       before you touch it — buttons carry a border, the section index and the trail
       carry an arrow, the footer and work links carry an underline — so this row was
       the one place the affordance lived behind hover. It now matches the site's
       existing underlined-link treatment exactly: `decoration-line-strong` at rest,
       `decoration-ink` on hover.

       `py-3` on the link is there for the measured target, not for the look. This
       is an inline box, so vertical padding grows its border box to about 45px
       without taking part in line-height: the row's layout and rhythm are
       untouched. Without it the box measures 21px and a bounding-box audit reports
       an undersized target, even though the ::after already makes the whole row
       hit-testable. */
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="press py-3 underline decoration-line-strong underline-offset-4 after:absolute after:inset-0 hover:decoration-ink"
    >
      {title}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  ) : (
    title
  );

  const body = (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="text-lg font-semibold text-ink">{titleNode}</h3>
        {meta && <span className="mono shrink-0 text-[11px] text-ink-3">{meta}</span>}
      </div>
      {detail && <p className="body-text measure mt-1.5 text-ink-2">{detail}</p>}
      {status && (
        <div className="mt-2.5">
          <StatusMark tone={status.tone}>{status.label}</StatusMark>
        </div>
      )}
      {tags && tags.length > 0 && <Keywords items={tags} />}
    </>
  );

  return (
    <li className={cls("relative", href && "group")}>
      <div className={cls("px-1", href && "press group-active:translate-y-px")}>
        {body}
      </div>
    </li>
  );
}

/* ── Numbered index ──
   The form the Services page uses, applied to capabilities.

   It replaces a three-column grid of equal-weight cells. On a decide surface an
   equal grid gives the visitor nothing to rank, and that same grid contradicted
   the sibling page, which presents this kind of list as an index. A numbered `ol`
   is the honest element: it announces itself as a list and how long it is, and the
   index column makes every row asymmetric, so the rows cannot read as
   interchangeable tiles. */

export function NumberedIndex({
  items,
}: {
  items: readonly { term: string; detail: string }[];
}) {
  return (
    <ol className="space-y-6">
      {items.map((item, i) => (
        <li
          key={item.term}
          className="grid gap-x-8 gap-y-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <div className="flex items-baseline gap-3">
            <span className="mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-semibold text-ink">{item.term}</h3>
          </div>
          <p className="body-text measure text-ink-2">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Stack map ──
   Grouped by layer rather than inventoried per technology. A twenty-row vendor
   list buries the shape of the system. */

export function StackMap({
  layers,
}: {
  layers: readonly { layer: string; items: readonly { name: string; planned?: boolean }[] }[];
}) {
  return (
    <dl className="space-y-6">
      {layers.map((l) => (
        <div
          key={l.layer}
          className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[7rem_1fr]"
        >
          <dt className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{l.layer}</dt>
          <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
            {l.items.map((i) => (
              <span key={i.name} className="inline-flex items-baseline gap-1.5 text-sm text-ink-2">
                {i.name}
                {i.planned && (
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                    planned
                  </span>
                )}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Contact actions ── */

export function ContactAction({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="press inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line-strong bg-panel px-4 text-sm text-ink-2 hover:border-ink-3 hover:text-ink active:translate-y-px sm:w-auto sm:justify-start"
    >
      {icon}
      {label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function EmailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

export function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ── Trail ──
   On a single page the sidebar showed where you were. Across nine routes the
   footer carries that instead: the sections either side, always in the same
   place, so the set stays walkable in order. */

export function SectionTrail({ slug }: { slug: string }) {
  const i = SECTIONS.findIndex((s) => s.slug === slug);
  const prev = i > 0 ? SECTIONS[i - 1] : null;
  const next = i >= 0 && i < SECTIONS.length - 1 ? SECTIONS[i + 1] : null;

  return (
    <nav aria-label="Section trail" className="band gutter py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link href={`/${prev.slug}`} className="press group inline-flex min-h-11 items-center gap-3 active:translate-y-px">
            <span aria-hidden="true" className="mono text-[11px] text-ink-3">←</span>
            <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{prev.index}</span>
            <span className="text-sm text-ink-2 group-hover:text-ink">{prev.label}</span>
          </Link>
        ) : (
          <Link href="/" className="press group inline-flex min-h-11 items-center gap-3 active:translate-y-px">
            <span aria-hidden="true" className="mono text-[11px] text-ink-3">←</span>
            <span className="text-sm text-ink-2 group-hover:text-ink">Home</span>
          </Link>
        )}
        {next ? (
          <Link
            href={`/${next.slug}`}
            className="press group inline-flex min-h-11 items-center gap-3 active:translate-y-px sm:justify-end"
          >
            <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{next.index}</span>
            <span className="text-sm text-ink-2 group-hover:text-ink">{next.label}</span>
            <span aria-hidden="true" className="mono text-[11px] text-ink-3">→</span>
          </Link>
        ) : (
          <Link
            href="/contact"
            className="press group inline-flex min-h-11 items-center gap-3 active:translate-y-px sm:justify-end"
          >
            <span className="text-sm text-ink-2 group-hover:text-ink">Get in touch</span>
            <span aria-hidden="true" className="mono text-[11px] text-ink-3">→</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
