"use client";

/*
  React Bits' TechText (github.com/DavidHDev/react-bits) draws the name on a
  canvas with its own technical treatment, replacing the Shuffle effect. It is
  decorative: the <h1> that wraps it carries the text for assistive tech and this
  canvas layer is aria-hidden. A canvas needs a resolved hex colour and a real
  family string, so the theme is read live here and the family is passed in from
  the server, which owns the font.
*/

import { useEffect, useState } from "react";
import TechText from "./rb/TechText";

const COLOR: Record<string, string> = {
  dark: "#ffb058",
  light: "#8c4400",
};

export function TechName({ text, family }: { text: string; family: string }) {
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
    <TechText
      className=""
      style={undefined}
      text={text}
      fontFamily={family}
      fontWeight={600}
      fontSize={84}
      letterSpacing={-0.03}
      color={COLOR[theme]}
      accentColor={COLOR[theme]}
      labels={false}
    />
  );
}
