import { ImageResponse } from "next/og";
import { FACE_MONO, FACE_SANS, faceMonoRegular, faceSansRegular, faceSansSemibold } from "./og-fonts";

/*
  Generated rather than uploaded, so the card can never drift from the page.

  It now carries the site's own two faces as well as its palette: IBM Plex Mono for
  the labels, IBM Plex Sans for the name and the sentence under it. Before this it
  fell back to Satori's bundled default sans, which made the share card the one
  surface on the site that did not look like the site. See ./og-fonts for how the
  fonts get here.

  Satori's constraints shape the markup: explicit flex everywhere, no `gap`, and the
  uppercase written out literally rather than with text-transform.
*/

export const alt = "M. Usman Shamim, forward deployed engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = await Promise.all([faceSansRegular(), faceSansSemibold(), faceMonoRegular()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15120f",
          padding: "72px",
          fontFamily: FACE_SANS,
          fontWeight: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: FACE_MONO,
            fontSize: 21,
            letterSpacing: 3,
            color: "#8d877d",
          }}
        >
          <span style={{ color: "#fec766" }}>FORWARD DEPLOYED ENGINEER</span>
          <span style={{ margin: "0 24px", color: "#4c473f" }}>/</span>
          <span>CHEMICAL TECHNOLOGY + AGENTIC AI</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, color: "#eae7e3", letterSpacing: -2 }}>
            M. Usman Shamim
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 960,
              fontSize: 32,
              lineHeight: 1.4,
              color: "#b7b2a9",
            }}
          >
            Agents, workflow automation and voice systems for process plants and service
            businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #34302a",
            paddingTop: 26,
            fontFamily: FACE_MONO,
            fontSize: 21,
            color: "#8d877d",
          }}
        >
          <span>AgriAgent · Shop Desk · Student ops desk</span>
          <span style={{ color: "#fec766" }}>github.com/usman-shamim</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
