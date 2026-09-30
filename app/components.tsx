"use client";

/*
  The interactive pieces, and only those. Everything static lives in ./parts and
  renders on the server, so a page ships JavaScript for the nav, the theme
  control, the reveal stagger and the copy button — nothing else.
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { SECTIONS, type Section } from "./content";

function cls(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

const isActive = (pathname: string, slug: string) => pathname === `/${slug}`;

/* ── Theme ──
   The inline script in the layout has already set `data-theme` before paint, so
   this only reads it. State starts null so the server and the first client render
   agree; the effect fills it in. */

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

    read();
    /* Two toggles exist, one for the rail and one for the narrow bar, and only
       one is visible at a time. Crossing the breakpoint swaps which one is on
       screen, so re-read the applied theme rather than trusting stale state. */
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const toggle = () => {
    /* Read the live attribute, never the state, so the switch is right even if
       this instance has not been the one in view. */
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Private mode, or storage disabled. The choice still applies to this page. */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="press inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong text-ink-2 hover:border-ink-3 hover:text-ink active:translate-y-px"
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch colour theme"}
    >
      {/* Both glyphs stay mounted and CSS decides which is painted, so the
          markup is identical on the server and in the browser. */}
      <span className="icon-swap h-4 w-4" aria-hidden="true">
        <SunIcon className="theme-icon theme-icon-sun absolute inset-0 h-4 w-4" />
        <MoonIcon className="theme-icon theme-icon-moon absolute inset-0 h-4 w-4" />
      </span>
    </button>
  );
}

function SunIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />
    </svg>
  );
}

function ChevronDown({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ── Rail navigation ──
   Every section is a route, and each link carries the same index and label as the
   section itself, read from one source, so a page cannot disagree with its own
   entry in the rail. Rows are 44px, the minimum this project sets for a control. */

export function RailNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Sections" className="gutter">
      <ul>
        {SECTIONS.map((s: Section) => {
          const active = isActive(pathname, s.slug);
          return (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                aria-current={active ? "page" : undefined}
                className={cls(
                  "press flex min-h-11 items-center gap-3 border-s-2 ps-2.5 pe-2 text-sm",
                  active
                    ? "border-signal text-ink"
                    : "border-transparent text-ink-3 hover:border-line-strong hover:text-ink-2"
                )}
              >
                <span className="mono text-[11px] text-ink-3">{s.index}</span>
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ── Compact navigation ──
   Below the breakpoint eight labels cannot fit across a row, so the bar carries a
   disclosure. Rows are 48px, the comfortable target on a phone. */

export function CompactNav() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const menuPanelRef = useRef<HTMLUListElement>(null);

  /* A disclosure does not close on Escape natively, so a keyboard visitor who
     opened it has no way out but tabbing to the end of the list. */
  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLDetailsElement>) => {
    if (event.key !== "Escape" || !menuRef.current?.open) return;
    event.preventDefault();
    closeAnimated();
    menuRef.current.querySelector("summary")?.focus();
  };

  const closeIfOpen = () => menuRef.current?.removeAttribute("open");

  /* The panel had an entrance and no exit. Dismissing it plays a short
     accelerating fade, then closes. The closing rule is authored outside the
     no-preference query, so reduced motion shortens it to 0.01ms rather than
     removing it, and `animationend` still fires. */
  const closeAnimated = () => {
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
    // Safety net, in case the event never arrives and the panel hangs open.
    window.setTimeout(finish, 400);
  };

  /* Only the close is intercepted; opening stays native and instant. */
  const onSummaryClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (!menuRef.current?.open) return;
    event.preventDefault();
    closeAnimated();
  };

  return (
    /* The disclosure is itself the landmark. If it sat outside a nav element the
       page would expose no navigation landmark at all below the breakpoint,
       which is where most of the traffic is. */
    <nav aria-label="Sections" className="relative">
      <details ref={menuRef} onKeyDown={onMenuKeyDown} className="group">
        <summary
          onClick={onSummaryClick}
          className="mono press inline-flex min-h-11 cursor-pointer list-none items-center gap-2 border border-line-strong px-3 text-[11px] uppercase tracking-[0.12em] text-ink-2 active:translate-y-px active:bg-panel [&::-webkit-details-marker]:hidden"
        >
          Sections
          <ChevronDown className="h-3 w-3 transition-transform duration-150 group-open:rotate-180" />
        </summary>
        <ul
          ref={menuPanelRef}
          className="absolute end-0 top-full mt-1.5 max-h-[70svh] w-72 overflow-y-auto border border-line bg-panel py-1"
        >
          {SECTIONS.map((s: Section) => {
            const active = isActive(pathname, s.slug);
            return (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  onClick={closeIfOpen}
                  aria-current={active ? "page" : undefined}
                  className={cls(
                    "press flex min-h-12 items-center gap-3 px-3 hover:bg-raise",
                    active ? "text-ink" : "text-ink-2 hover:text-ink"
                  )}
                >
                  <span className="mono text-[11px] text-ink-3">{s.index}</span>
                  <span className="text-sm">{s.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </details>
    </nav>
  );
}

/* ── Services ──
   An index rather than a grid of equal cards. The number and name carry the
   weight on the left, the terms sit on the right, rules do the separating. */

export function ServicesList({
  items,
}: {
  items: readonly { name: string; detail: string; forWho: string }[];
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <ul ref={ref} className={cls("stagger border-t border-line", shown && "is-shown")}>
      {items.map((s, i) => (
        <li
          key={s.name}
          className="grid gap-x-8 gap-y-3 border-b border-line py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <div className="flex items-baseline gap-3">
            <span className="mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-medium text-ink">{s.name}</h3>
          </div>
          <div>
            <p className="body-text measure text-ink-2">{s.detail}</p>
            <p className="mt-2 text-sm text-ink-3">For {s.forWho}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Copy address ──
   A mailto link does nothing on a machine with no mail client configured, and it
   is the only conversion path this page has. This is the second route, and it has
   a state to fail in: if the clipboard is unavailable the address is shown in
   plain text so it can still be selected. */

type CopyState = "idle" | "copied" | "failed";

function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M5 15V5a1 1 0 0 1 1-1h9" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

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

  /* A failed action names the failure in the control, rather than repeating the
     verb that just failed and inviting a second click that will also fail. */
  const label = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy address";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cls(
          "press inline-flex min-h-11 w-full items-center justify-center gap-2 border px-4 text-sm sm:w-auto sm:justify-start",
          state === "failed"
            ? "border-alert bg-panel text-alert"
            : "border-line-strong bg-panel text-ink-2 hover:border-ink-3 hover:text-ink active:translate-y-px"
        )}
      >
        {/* Both glyphs stay mounted and cross-fade, so the change reads as one
            icon becoming another rather than a swap. */}
        <span className="icon-swap h-4 w-4" aria-hidden="true">
          <CopyIcon className={cls("absolute inset-0 h-4 w-4", state === "copied" && "is-off")} />
          <CheckIcon className={cls("absolute inset-0 h-4 w-4", state !== "copied" && "is-off")} />
        </span>
        {label}
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
        <span className="mono self-center break-all text-[11px] text-ink-3">{address}</span>
      )}
    </>
  );
}
