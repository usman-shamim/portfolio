"use client";

/*
  A small Hugeicons mark at the label size, in this site's line style. Hugeicons
  is already a dependency (the back-to-top SlingButton uses it). It is a client
  boundary so the server-rendered rows and stack map can pass an icon through
  without becoming client components themselves.
*/

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export function IconMark({
  icon,
  className = "h-4 w-4",
}: {
  icon: IconSvgElement;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={16}
      strokeWidth={1.6}
      aria-hidden="true"
      className={className}
    />
  );
}
