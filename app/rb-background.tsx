"use client";

/*
  The page ground, from React Bits' PixelBlast (github.com/DavidHDev/react-bits).
  It replaces the hand-written PixelField: the same idea (a dithered field drawn
  in pixel cells) with the shader doing the noise, the dither and the pixels. The
  colours are the site's own warm tones, one per theme, read from the live
  `data-theme` so a toggle repaints it. Decorative only: `aria-hidden`, no pointer
  events, and it renders a single frame then stops under prefers-reduced-motion.
*/

import { useEffect, useState } from "react";
import PixelBlast from "./rb/PixelBlast";

const COLOR: Record<string, string> = {
  dark: "#4a3c22",
  light: "#dbccab",
};

export function RbBackground() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.dataset.theme === "light" ? "light" : "dark");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="rb-blast" aria-hidden="true">
      <PixelBlast
        className=""
        style={undefined}
        variant="diamond"
        pixelSize={4}
        color={COLOR[theme]}
        patternScale={1.5}
        patternDensity={1.15}
        rippleThickness={0.13}
        speed={0.9}
        edgeFade={0.35}
        transparent
        enableRipples={false}
      />
    </div>
  );
}
