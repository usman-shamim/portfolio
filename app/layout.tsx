import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SiteRail, SkipLink, TopBar } from "./parts";
import { DISCIPLINES, NAME, ROLE } from "./content";
import { PixelField } from "./components";

/*
  The pair, and why these two.

  The object this site imitates is a plant instrument panel and the datasheet that
  ships with it: a face you read the labels in, and a face you scan the numbers
  off. IBM Plex was commissioned as an engineering type system, and the mono was
  drawn alongside the sans so the two share structure and figures rather than
  merely coexisting. That split, a label face and a readout face, is the panel.

  What this replaced: Geist, which is the create-next-app default. It was never
  chosen, every other Next.js project ships it, and the smell report recorded
  exactly that as its one open suspicion. Nothing else about the type was wrong,
  which is why the scale, the measure and the role split are unchanged here.
*/
const plexSans = IBM_Plex_Sans({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/* An absolute base so the social card resolves off-domain. Set
   NEXT_PUBLIC_SITE_URL at deploy; localhost is the fallback. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "M. Usman Shamim, forward deployed engineer",
    template: "%s · M. Usman Shamim",
  },
  description:
    "Forward deployed engineer combining chemical-technology engineering with AI-agent architecture. I build agents, workflow automation and voice systems for process plants and service businesses.",
  openGraph: {
    title: "M. Usman Shamim, forward deployed engineer",
    description:
      "Agents, workflow automation and voice systems for process plants and service businesses.",
    type: "website",
    siteName: "M. Usman Shamim",
  },
  twitter: { card: "summary_large_image" },
};

/* Both themes declare their own colour so the browser chrome and the mobile
   address bar match whichever one is painted. */
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#15120f" },
    { media: "(prefers-color-scheme: light)", color: "#f9f6f3" },
  ],
};

/* Runs before first paint, so the stored choice is applied with no flash of the
   wrong theme. Kept inline and dependency-free on purpose: a module would be a
   second round trip, and a round trip is exactly the flash. */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");if(s!=="light"&&s!=="dark"){s=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=s;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      /* The theme script sets data-theme on this element before React arrives,
         so the attribute on the client differs from the server's markup. That
         difference is the whole mechanism, and it is not an error. */
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <PixelField />

        {/* The reveals are gated on JavaScript. Without this, a visitor with
            scripting off would see the staggered lists stay at opacity 0. */}
        <noscript>
          <style>{`.stagger>*{opacity:1}`}</style>
        </noscript>

        <SkipLink />

        {/* One panel, centred and capped in width. The rail and the content column
            are siblings in a flex row, so neither can drift out of step with the
            other and the pair composes itself on any screen width. */}
        <div className="panel">
          <SiteRail />

          <div className="column">
            <TopBar />

            <main id="main" tabIndex={-1} className="flex-1">
              {children}
            </main>

            <footer className="band pad-safe-bottom gutter mt-16 py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                  {NAME} © 2026
                </span>
                <span className="mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                  {ROLE} · {DISCIPLINES}
                </span>
              </div>
              <p className="mono mt-2 text-[11px] uppercase tracking-[0.12em] text-ink-3">
                <Link
                  href="/contact"
                  className="press inline-flex min-h-11 items-center underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink active:translate-y-px"
                >
                  Start a conversation
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
