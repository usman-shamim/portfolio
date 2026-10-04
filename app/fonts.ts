import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";

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
  which is why the scale, the measure and the role split were left alone.

  A third face was added later, at the captain's request, for the large headings
  only: Space Grotesk, a technical grotesque drawn from a mono, so it keeps the
  engineered proportions of the label face while carrying more presence at display
  size than Plex Sans does. Body and labels stay Plex.
*/

export const plexSans = IBM_Plex_Sans({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const display = Space_Grotesk({
  variable: "--font-display-stack",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/* The real family string, for canvas. TechText draws with `ctx.font`, which
   cannot read a CSS custom property, so the family has to be resolved here. */
export const displayFamily = display.style.fontFamily;
