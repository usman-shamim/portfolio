import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SiteRail, SkipLink, TopBar } from "./parts";
import { DISCIPLINES, NAME, ROLE } from "./content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    { media: "(prefers-color-scheme: dark)", color: "#0d1013" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f8" },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-ground text-ink">
        {/* The reveals are gated on JavaScript. Without this, a visitor with
            scripting off would see the staggered lists stay at opacity 0. */}
        <noscript>
          <style>{`.stagger>*{opacity:1}`}</style>
        </noscript>

        <SkipLink />
        <SiteRail />
        <TopBar />

        {/* The content column clears the rail through --rail-w, so the two can
            never collide. Below the breakpoint the offset is zero and the sticky
            bar sits above the flow instead. */}
        <div className="rail-offset flex flex-1 flex-col">
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
                className="press inline-flex min-h-11 items-center underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink"
              >
                Start a conversation
              </Link>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
