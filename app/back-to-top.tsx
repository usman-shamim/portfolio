"use client";

/*
  React Bits' SlingButton (github.com/DavidHDev/react-bits) as the back-to-top
  control. Its puck fires on a tap or a drag-and-release; here both scroll the
  window home. It appears once the visitor is a screen down, sits in the thumb
  zone bottom-end, and its own up-arrow is the default icon.
*/

import { useEffect, useState } from "react";
import SlingButton from "./rb/SlingButton";

export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`back-to-top${shown ? " is-shown" : ""}`}>
      <SlingButton
        ariaLabel="Back to top"
        hint="Press Enter to go back to the top, or drag away and release."
        size={46}
        padColor="var(--raise)"
        iconColor="var(--ink-2)"
        accentColor="var(--accent)"
        wellColor="var(--panel)"
        bandColor="var(--line-strong)"
        tapSends
        onSend={toTop}
      />
    </div>
  );
}
