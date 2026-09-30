"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

/* ── Shared utilities ── */

function cls(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, shown };
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return <div ref={ref} className={cls("reveal", shown && "is-shown", className)}>{children}</div>;
}

/* Staggered list. The cascade classes have to sit on the list itself for the
   per-item delays to reach the items, so the list is rendered here rather than
   handed in as children: cloning children that crossed the server/client
   boundary worked during SSR and then broke at hydration.

   An index rather than a grid of equal cards: the name carries the weight on the
   left, the terms sit on the right, and the rules do the separating. Four equal
   boxes gave the reader nothing to rank. */
export function ServicesList({
  items,
}: {
  items: { name: string; detail: string; forWho: string }[];
}) {
  const { ref, shown } = useInView<HTMLUListElement>();
  return (
    <ul ref={ref} className={cls("stagger border-t border-line", shown && "is-shown")}>
      {items.map((s, i) => (
        <li
          key={s.name}
          className="grid gap-x-10 gap-y-3 border-b border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
        >
          <div className="flex items-baseline gap-4">
            <span className="mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {s.name}
            </h3>
          </div>
          <div>
            <p className="body-text measure text-ink-2">{s.detail}</p>
            <p className="mono mt-3 text-[11px] uppercase tracking-[0.14em] text-ink-3">
              For {s.forWho}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Field ── */

export function Field() {
  return (
    <div className="field pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
  );
}

/* ── Skip link ──
   Ten nav stops sit between the top of the page and the first word of content.
   A keyboard visitor should not have to walk them on every visit. */

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

/* ── Reading progress ──
   The page is ten sections long, so "how much is left" is real information.
   Transform only, no layout, tracked 1:1 on scroll so it never lags the page.
   Decorative by design: the nav's aria-current already carries orientation. */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/* ── Section chrome ── */

export function SectionHeader({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-10 border-t border-line-strong pt-5">
      <div className="mono mb-4 flex items-baseline gap-3 text-[11px] tracking-[0.22em] text-ink-3">
        <span className="text-signal">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {lede && <p className="body-text measure mt-3 text-ink-2">{lede}</p>}
    </header>
  );
}

/* ── Status ── */

type Tone = "signal" | "running";

const TONE_DOT: Record<Tone, string> = {
  signal: "bg-signal",
  running: "bg-running",
};

export function StatusMark({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-3">
      <span className={cls("inline-block h-1.5 w-1.5 shrink-0", TONE_DOT[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}

/* ── Tag ── */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="mono inline-block border border-line px-2 py-0.5 text-[11px] text-ink-3">
      {children}
    </span>
  );
}

/* ── Ledger ──
   Rows, not cards. The page had five uniform card grids; the ledger gives each
   section a shared, scannable rhythm and lets the content set its own weight. */

export function Ledger({ children, className }: { children: ReactNode; className?: string }) {
  /* A real list, so a screen reader announces the set and how many are in it. */
  return <ul className={cls("border-b border-line", className)}>{children}</ul>;
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
  tags?: string[];
  status?: { tone: Tone; label: string };
  href?: string;
}) {
  const body = (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-medium text-ink transition-colors duration-150 group-hover:text-signal">
          {title}
        </h3>
        {meta && <span className="mono shrink-0 text-xs text-ink-3">{meta}</span>}
      </div>
      {detail && <p className="body-text measure mt-2 text-ink-2">{detail}</p>}
      {(status || tags) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {status && <StatusMark tone={status.tone}>{status.label}</StatusMark>}
          {tags?.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </>
  );

  return (
    <li className="border-t border-line">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="press group block px-1 py-5 hover:bg-raise active:bg-line"
        >
          {body}
        </a>
      ) : (
        <div className="px-1 py-5">{body}</div>
      )}
    </li>
  );
}

/* ── Definition list ── */

export function DefList({ items }: { items: { term: string; detail: string }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {items.map((i) => (
        <div key={i.term}>
          <dt className="body-text font-medium text-ink">{i.term}</dt>
          <dd className="body-text measure mt-1 text-ink-2">{i.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Service strip ── */

export function ServiceStrip() {
  const items: { label: string; where: string; tone: Tone; note: string }[] = [
    { label: "Backend AI Engineering Intern", where: "FlyRank AI", tone: "running", note: "in service" },
    { label: "Agentic AI Architect", where: "PIAIC", tone: "signal", note: "in progress" },
    { label: "Agentic AI Engineering", where: "SMIT 2026", tone: "signal", note: "still in progress" },
  ];
  return (
    <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.label} className="flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <p className="text-sm text-ink">{i.label}</p>
            <p className="mono mt-0.5 text-[11px] tracking-[0.1em] text-ink-3">{i.where}</p>
          </div>
          <StatusMark tone={i.tone}>{i.note}</StatusMark>
        </li>
      ))}
    </ul>
  );
}

/* ── Stack map ── */

export function StackMap() {
  /* Grouped by layer rather than inventoried per technology. A client needs to
     know what the system is made of, not the vendor list, and a twenty-row
     table buries that. Anything not yet running under a real system says so. */
  const layers: { layer: string; items: { name: string; planned?: boolean }[] }[] = [
    {
      layer: "Agents",
      items: [
        { name: "OpenAI Agents SDK" },
        { name: "MCP" },
        { name: "handoffs and cloned specialists" },
        { name: "output guardrails" },
        { name: "typed structured outputs" },
      ],
    },
    {
      layer: "Models",
      items: [
        { name: "gpt-5-nano" },
        { name: "gpt-5-mini" },
        { name: "Gemini" },
        { name: "provider switched by config" },
      ],
    },
    {
      layer: "Retrieval",
      items: [{ name: "cited retrieval over a governed document set" }, { name: "Pinecone", planned: true }],
    },
    {
      layer: "Plant data",
      items: [
        { name: "MQTT" },
        { name: "SCADA-style dashboards" },
        { name: "threshold and alarm logic" },
        { name: "ESP32 and relay actuation" },
        { name: "OPC UA", planned: true },
      ],
    },
    {
      layer: "Delivery",
      items: [
        { name: "Python" },
        { name: "Chainlit" },
        { name: "FastAPI" },
        { name: "offline test suites" },
        { name: "Docker", planned: true },
      ],
    },
  ];
  return (
    <dl className="border-t border-line">
      {layers.map((l) => (
        <div
          key={l.layer}
          className="grid gap-x-6 gap-y-2 border-b border-line py-4 sm:grid-cols-[8rem_1fr]"
        >
          <dt className="mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{l.layer}</dt>
          <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            {l.items.map((i) => (
              <span key={i.name} className="inline-flex items-baseline gap-1.5 text-sm text-ink-2">
                {i.name}
                {i.planned && (
                  <span className="mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
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

/* ── Contact ── */

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
      className="press inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-line-strong bg-panel px-5 text-sm text-ink-2 hover:border-signal hover:text-ink active:scale-[0.98] active:bg-raise sm:w-auto sm:justify-start"
    >
      {icon}
      {label}
    </a>
  );
}

export function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M5 15V5a1 1 0 0 1 1-1h9" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

/* ── Copy address ──
   A mailto link does nothing on a machine with no mail client configured, and
   it is the only conversion path this page has. This gives the address a second
   route that always works, and a state to fail in: if the clipboard is
   unavailable the address is shown in plain text so it can still be selected. */

type CopyState = "idle" | "copied" | "failed";

export function CopyEmail({ address }: { address: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2600);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(address);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cls(
          "press inline-flex min-h-12 w-full items-center justify-center gap-2.5 border px-5 text-sm sm:w-auto sm:justify-start",
          state === "failed"
            ? "border-alert text-alert"
            : "border-line-strong bg-panel text-ink-2 hover:border-signal hover:text-ink active:scale-[0.98] active:bg-raise"
        )}
      >
        {/* Both glyphs stay mounted and cross-fade, so the change reads as one
            icon becoming another rather than a swap. */}
        <span className="icon-swap h-4 w-4" aria-hidden="true">
          <CopyIcon className={cls("absolute inset-0 h-4 w-4", state === "copied" && "is-off")} />
          <CheckIcon className={cls("absolute inset-0 h-4 w-4", state !== "copied" && "is-off")} />
        </span>
        {state === "copied" ? "Copied" : "Copy address"}
      </button>

      {/* Present from first paint so the change is announced, not missed. */}
      <span aria-live="polite" className="sr-only">
        {state === "copied"
          ? `Copied ${address} to the clipboard.`
          : state === "failed"
            ? `Could not copy. The address is ${address}.`
            : ""}
      </span>

      {state === "failed" && (
        <span className="mono self-center text-xs text-ink-3">{address}</span>
      )}
    </>
  );
}

/* ── Nav ── */

const SECTIONS = [
  "services",
  "capabilities",
  "experience",
  "credentials",
  "stack",
  "work",
  "private",
  "contact",
] as const;

type Section = (typeof SECTIONS)[number];

const LABELS: Record<Section, string> = {
  services: "Services",
  capabilities: "Capabilities",
  experience: "Experience",
  credentials: "Credentials",
  stack: "Stack",
  work: "Work",
  private: "Private",
  contact: "Contact",
};

export function ChevronDown({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Navbar() {
  const [active, setActive] = useState<Section | null>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const menuPanelRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Without this the panel stays open over the section it just scrolled to.
     Used when a link was activated: the destination is the point, so the panel
     gets out of the way immediately. */
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  /* The panel had an entrance and no exit. Dismissing it plays a short,
     accelerating fade so the eye can see it belongs to the trigger, then it
     actually closes. The closing rule is authored outside the no-preference
     query, so reduced motion shortens it to 0.01ms rather than removing it and
     `animationend` still fires. */
  const closeMenuAnimated = () => {
    const menu = menuRef.current;
    const panel = menuPanelRef.current;
    if (!menu?.open) return;
    if (!panel) {
      menu.open = false;
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      panel.removeEventListener("animationend", onEnd);
      panel.classList.remove("is-closing");
      menu.open = false;
    };
    const onEnd = (event: AnimationEvent) => {
      if (event.target === panel) finish();
    };

    panel.addEventListener("animationend", onEnd);
    panel.classList.add("is-closing");
    // Safety net, in case the event never arrives and the panel would hang open.
    window.setTimeout(finish, 400);
  };

  /* A disclosure does not close on Escape natively, so a keyboard visitor who
     opened the menu has no way out but tabbing to the end of the list. */
  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLDetailsElement>) => {
    const menu = menuRef.current;
    if (event.key !== "Escape" || !menu?.open) return;
    event.preventDefault();
    closeMenuAnimated();
    menu.querySelector("summary")?.focus();
  };

  /* Only the close is intercepted; opening stays native and instant. */
  const onSummaryClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (!menuRef.current?.open) return;
    event.preventDefault();
    closeMenuAnimated();
  };

  return (
    <nav
      className="pad-safe-top fixed inset-x-0 top-0 z-30 border-b border-line bg-ground"
      aria-label="Sections"
    >
      <div className="gutter">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 py-1.5">
          <a
            href="#top"
            className="mono press inline-flex min-h-11 items-center text-xs tracking-[0.24em] text-ink hover:text-signal"
          >
            USMAN.SHAMIM
          </a>

          {/* Eight labels plus the wordmark need about 810px, so the full nav
              holds off until 940px. Below that the disclosure is the honest
              control rather than a list with its last entries off-screen. */}
          <ul className="nav-full items-center">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  aria-current={active === s ? "true" : undefined}
                  className={cls(
                    "mono relative inline-flex min-h-11 items-center px-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors",
                    active === s ? "text-ink" : "text-ink-3 hover:text-ink-2"
                  )}
                >
                  {LABELS[s]}
                  {/* Selection is a transform, so the underline arrives instead of
                      appearing. The text colour changes with it, and aria-current
                      carries the meaning, so nothing is said by movement alone. */}
                  <span
                    aria-hidden="true"
                    className={cls(
                      "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal transition-transform duration-200 ease-out",
                      active === s ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile: the section list is restored, not amputated. Native
              details/summary, so the keyboard model and expanded state come free. */}
          <details ref={menuRef} onKeyDown={onMenuKeyDown} className="nav-compact group relative">
            <summary
              onClick={onSummaryClick}
              className="mono press inline-flex min-h-11 cursor-pointer list-none items-center gap-2 border border-line-strong px-3 text-[11px] uppercase tracking-[0.14em] text-ink-2 active:scale-[0.98] active:bg-raise [&::-webkit-details-marker]:hidden"
            >
              Sections
              <ChevronDown className="h-3 w-3 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <ul
              ref={menuPanelRef}
              className="absolute end-0 top-full mt-2 max-h-[70svh] w-52 overflow-y-auto border border-line bg-panel py-1"
            >
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    onClick={closeMenu}
                    aria-current={active === s ? "true" : undefined}
                    className={cls(
                      "mono press flex min-h-12 items-center px-4 text-[11px] uppercase tracking-[0.14em] hover:bg-raise active:bg-line",
                      active === s ? "text-signal" : "text-ink-2 hover:text-ink"
                    )}
                  >
                    {LABELS[s]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      <ScrollProgress />
    </nav>
  );
}

/* ── Icons: one definition each, currentColor so the parent sets the tone ── */

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
