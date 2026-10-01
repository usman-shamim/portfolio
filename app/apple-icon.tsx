import { ImageResponse } from "next/og";
import { FACE_SANS, faceSansSemibold } from "./og-fonts";

/*
  The home-screen mark.

  iOS does not read `app/icon.tsx` for a bookmark added to the home screen. It asks
  for `/apple-icon` and, with no route there, falls back to a screenshot of the page.
  So the tab had the person's own monogram while a saved bookmark on a phone got a
  picture of the site, which is exactly the kind of half-dressed asset a pre-ship pass
  is for.

  Same mark, same reasoning as `icon.tsx`: the site's own semibold sans, the ink ground
  and the light ink, and no accent, because the brief limits the accent to the name, the
  wordmark and the field-report header and keeps `signal` for state.

  180px is the size iOS actually renders a home-screen icon at. The letter is set at the
  same ratio to the tile as in the 64px tab mark, so the two read as one mark rather
  than two sizes of a guess. Opaque, because iOS composites an alpha channel over black
  and a transparent icon would come out on a black square.
*/
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 146,
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
