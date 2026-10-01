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
  type ReactNode,
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
                  "press flex min-h-11 items-center gap-3 border-s-2 ps-2.5 pe-2 text-sm active:translate-y-px",
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

  /* A disclosure opened on a phone otherwise hangs over the page until it is
     dismissed from its own trigger. Tapping the page or scrolling it both read as
     "I am done with this", so both dismiss it.

     The captured listener runs before the tap reaches anything under it, so a tap
     on a page link closes the panel and still follows the link. The scroll close is
     immediate rather than animated: the page is already moving, and a 160ms fade
     over moving content reads as jank.

     The callbacks below close over the first render's function values. That is safe
     because every one of them reads only refs. */
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menu.open) return;
      if (event.target instanceof Node && menu.contains(event.target)) return;
      closeAnimated();
    };
    const onScroll = () => {
      if (menu.open) menu.removeAttribute("open");
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
          className="absolute end-0 top-full mt-1.5 max-h-[70svh] w-72 max-w-[calc(100vw-2.5rem)] overflow-y-auto border border-line bg-panel py-1"
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
                    "press flex min-h-12 items-center gap-3 px-3 hover:bg-raise active:translate-y-px",
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
   weight on the left, the terms sit on the right, spacing does the separating. */

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
    <ul ref={ref} className={cls("stagger space-y-6", shown && "is-shown")}>
      {items.map((s, i) => (
        <li
          key={s.name}
          className="grid gap-x-8 gap-y-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <div className="flex items-baseline gap-3">
            <span className="mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-semibold text-ink">{s.name}</h3>
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

/* ── The field ──

   The background this replaces was a grid of straight lines: it marked the rail's
   module, but it also made the whole page feel boxed and ruled. This is the opposite
   instrument — a soft, curved glow drawn in visible square cells.

   The technique is ordered dithering. A smooth radial falloff is quantised against an
   8x8 Bayer matrix, which turns one continuous shape into a field of discrete cells
   whose density carries the shape. That is the site's own discipline made visible in
   the background: the same low-contrast restraint as the rules, but round instead of
   straight, and it drifts by one cell every couple of seconds so the page breathes
   without any element moving.

   The palette is hardcoded from painted-pixel measurements of the live tokens, not
   read from the CSS variables, because a canvas needs an RGB string and the engine
   reports the OKLCH tokens back as lab(). The brightest tone is capped well under the
   ink, so any text that lands over the field keeps the contrast it is measured
   against elsewhere.

   It is one canvas, painted at cell resolution and upscaled with
   `image-rendering: pixelated`, so the cells are crisp squares rather than a blur.
   Nothing here animates per frame: a single interval moves the blob a few cells at a
   time, which is what makes the drift read as 8-bit rather than as a video. Under
   `prefers-reduced-motion` the interval never starts and the field holds still. Under
   `prefers-contrast: more` it is removed entirely, because texture can only work
   against legibility there. */

const FIELD_CELL = 8;

/*
  Measured from the painted surfaces, not copied from the token file, so they are
  what the browser actually produced. Dark ground is rgb(21,18,15) and the light
  ground is rgb(249,246,243); the four tones step upward from each, and the top tone
  stays far enough from the ink that text keeps its measured contrast on top of the
  field.
*/
const FIELD_PALETTES = {
  dark: {
    ground: "#15120f",
    tones: ["#1a1611", "#221d17", "#2d261d", "#3b3126"],
  },
  light: {
    ground: "#f9f6f3",
    tones: ["#f2efea", "#e9e4dc", "#dcd5cb", "#c9c0b3"],
  },
};

/* The canonical 8x8 Bayer matrix. Each cell's threshold decides whether it lifts to
   the next tone at that brightness, which is what turns a gradient into ordered
   pixels instead of banding. */
const BAYER8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

const smoothstep = (v: number) => v * v * (3 - 2 * v);

function paintField(canvas: HTMLCanvasElement, theme: "dark" | "light", phase: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = Math.max(1, Math.ceil(window.innerWidth / FIELD_CELL));
  const h = Math.max(1, Math.ceil(window.innerHeight / FIELD_CELL));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;

  const pal = FIELD_PALETTES[theme];
  const tones = pal.tones;
  const S = tones.length;

  ctx.fillStyle = pal.ground;
  ctx.fillRect(0, 0, w, h);

  /* Two blobs rather than one, so the glow has a pull across the page instead of
     sitting dead centre. The dominant one sits up and to the right of the hero; a
     dimmer counterweight hangs low on the rail side. */
  const t = phase * 0.55;
  const blobs = [
    { x: 0.74 + 0.030 * Math.cos(t), y: 0.24 + 0.024 * Math.sin(t * 1.3), r: 0.62, k: 1 },
    { x: 0.12 + 0.020 * Math.cos(t * 0.7 + 2.1), y: 0.84 + 0.026 * Math.sin(t * 0.9 + 0.6), r: 0.4, k: 0.55 },
  ];
  const aspect = w / h;

  for (let y = 0; y < h; y++) {
    const ny = (y + 0.5) / h;
    for (let x = 0; x < w; x++) {
      const nx = (x + 0.5) / w;
      let v = 0;
      for (const b of blobs) {
        const d = Math.hypot((nx - b.x) * aspect, ny - b.y);
        const u = 1 - Math.min(1, d / b.r);
        if (u > 0) v += smoothstep(u) * b.k;
      }
      if (v <= 0.004) continue;
      if (v > 1) v = 1;
      const th = (BAYER8[(y & 7) * 8 + (x & 7)] + 0.5) / 64;
      const lit = Math.floor(v * S + th);
      if (lit <= 0) continue;
      ctx.fillStyle = tones[Math.min(lit - 1, S - 1)];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

export function PixelField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const theme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let phase = 0;
    const draw = () => paintField(canvas, theme(), phase);
    draw();

    let timer: number | undefined;
    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };
    const start = () => {
      if (reduce.matches || timer !== undefined) return;
      timer = window.setInterval(() => {
        if (document.hidden) return;
        phase += 1;
        draw();
      }, 2200);
    };
    start();

    const onMotion = () => (reduce.matches ? stop() : start());
    reduce.addEventListener("change", onMotion);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(draw, 200);
    };
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      stop();
      reduce.removeEventListener("change", onMotion);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="pixel-field" aria-hidden="true" />;
}

/* ── Pixel CTA ──
   The hero buttons, built on React Bits' PixelCard
   (github.com/DavidHDev/react-bits). Kept is the mechanic: a canvas grid of
   tiny pixels that dissolve in from the centre on hover or focus and twinkle
   out on leave. Dropped is the card around it — the 25px radius, the fixed
   size, the border and the radial-glow ::before are every one of them a thing
   this site refuses. The speckle is a neutral tone from the palette, never the
   brand accent and never a state colour, and the effect is gated on
   prefers-reduced-motion: no-preference, so reduced motion keeps the plain
   lightness step and nothing moves. */

/* Canvas fillStyle needs an sRGB string, and the engine reports the OKLCH
   tokens back as lab(). These are the resolved ground and ink values per theme,
   the same reason the field hardcodes its tones. */
const PIXEL_TONES: Record<string, { ground: string; ink: string }> = {
  dark: { ground: "#15120f", ink: "#eae7e3" },
  light: { ground: "#f9f6f3", ink: "#16130f" },
};

/* Vendored from React Bits PixelCard, unchanged apart from the sizes the button
   needs. One speck of the dissolve. */
class Pixel {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.rand(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const off = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + off, this.y + off, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer();
    else this.size += this.sizeStep;
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

const CTA_CLASS: Record<"primary" | "secondary", string> = {
  primary: "border-ink bg-ink text-ground hover:border-ink-2 hover:bg-ink-2",
  secondary: "border-line-strong text-ink-2 hover:border-ink-3 hover:text-ink",
};

export function PixelCta({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const reduceRef = useRef(false);

  const init = () => {
    const el = ref.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const rect = el.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const tone = PIXEL_TONES[theme];
    const color = variant === "primary" ? tone.ground : tone.ink;
    const pxs: Pixel[] = [];
    for (let x = 0; x < w; x += 7) {
      for (let y = 0; y < h; y += 7) {
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = Math.sqrt(dx * dx + dy * dy);
        pxs.push(new Pixel(canvas, ctx, x, y, color, 0.035, delay));
      }
    }
    pixelsRef.current = pxs;
  };

  const animate = (fn: "appear" | "disappear") => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const step = () => {
      rafRef.current = requestAnimationFrame(step);
      const now = performance.now();
      const passed = now - lastRef.current;
      const interval = 1000 / 60;
      if (passed < interval) return;
      lastRef.current = now - (passed % interval);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allIdle = true;
      for (const p of pixelsRef.current) {
        p[fn]();
        if (!p.isIdle) allIdle = false;
      }
      if (allIdle && rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const enter = () => {
    if (reduceRef.current) return;
    init();
    animate("appear");
  };
  const leave = () => {
    if (reduceRef.current) return;
    animate("disappear");
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const onMotion = () => {
      reduceRef.current = mq.matches;
    };
    mq.addEventListener("change", onMotion);
    init();
    const ro = new ResizeObserver(() => init());
    if (ref.current) ro.observe(ref.current);
    return () => {
      mq.removeEventListener("change", onMotion);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      className={cls(
        "press relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden border px-4 text-sm font-medium active:translate-y-px sm:w-auto",
        CTA_CLASS[variant]
      )}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <span className="relative">{children}</span>
    </Link>
  );
}
