import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "M. Usman Shamim, forward deployed engineer",
  description:
    "Forward deployed engineer combining chemical-technology engineering with AI-agent architecture. I build agents, workflow automation and voice systems for process plants and service businesses.",
  openGraph: {
    title: "M. Usman Shamim, forward deployed engineer",
    description:
      "Agents, workflow automation and voice systems for process plants and service businesses.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ground text-ink">
        {/* The reveal is gated on JavaScript. Without this, a visitor with
            scripting off would see the sections stay at opacity 0. */}
        <noscript>
          <style>{`.reveal,.stagger>*{opacity:1}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
