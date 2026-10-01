import { ImageResponse } from "next/og";
import { FACE_SANS, faceSansSemibold } from "./og-fonts";

/*
  The browser tab mark.

  create-next-app ships app/favicon.ico containing Vercel's triangle, so this
  portfolio was showing the framework's logo in the tab instead of the person's
  own mark. Replaced with a generated monogram, so it cannot drift from the
  palette or the type: the same ink ground, the same light ink, and the site's own
  semibold sans rather than the renderer's default face.

  No accent colour. The brief gives the one accent exactly three jobs — the name,
  the wordmark and the field-report header — and keeps `signal` for state; a logo
  is neither, and a fourth use would make the accent decorative everywhere else.

  A monogram rather than a second shape, because this is seen at 16px in a tab
  strip, where one bold letterform survives and anything finer turns to mush.
*/
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fonts = [await faceSansSemibold()];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15120f",
          color: "#eae7e3",
          fontSize: 52,
          fontWeight: 600,
          fontFamily: FACE_SANS,
          lineHeight: 1,
        }}
      >
        U
      </div>
    ),
    { ...size, fonts }
  );
}
