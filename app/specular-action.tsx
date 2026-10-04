"use client";

/*
  The contact actions, wrapped so the SpecularButton gets what it actually needs.
  ogl's Color.set() parses hex / rgb / hsl but not a CSS custom property, so
  `var(--accent)` became NaN and took the whole canvas with it: no base edge
  stroke at rest and no shine on hover. The rim colours are therefore resolved
  hex per theme here, while the surface tint and text colour stay CSS variables
  (those are set as inline custom properties and never touch the shader).
*/

import { useEffect, useState, type ReactNode } from "react";
import { SpecularButton } from "./specular";

const LINE: Record<string, string> = { dark: "#ffb058", light: "#8c4400" };
const BASE: Record<string, string> = { dark: "#4c473f", light: "#bcb6af" };
const ALERT: Record<string, string> = { dark: "#ee5744", light: "#7a0b03" };

export function SpecularAction({
  href,
  external,
  onClick,
  tone = "normal",
  children,
}: {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  tone?: "normal" | "alert";
  children: ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.dataset.theme === "light" ? "light" : "dark");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const alert = tone === "alert";

  return (
    <SpecularButton
      href={href}
      external={external}
      onClick={onClick}
      className="contact-action"
      size="sm"
      radius={8}
      tint="var(--panel)"
      tintOpacity={1}
      textColor={alert ? "var(--alert)" : "var(--ink-2)"}
      lineColor={alert ? ALERT[theme] : LINE[theme]}
      baseColor={BASE[theme]}
    >
      {children}
    </SpecularButton>
  );
}
