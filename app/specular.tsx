"use client";

/*
  React Bits' SpecularButton (github.com/DavidHDev/react-bits), the WebGL rim
  light that follows the cursor. The vendored component ships as .jsx, so its
  props are inferred; this casts it once to the shape this site passes.
*/

import type { ReactElement } from "react";
import SpecularButtonRaw from "./rb/SpecularButton";

export const SpecularButton = SpecularButtonRaw as unknown as (
  props: Record<string, unknown>
) => ReactElement;
