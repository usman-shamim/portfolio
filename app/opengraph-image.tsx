import { ImageResponse } from "next/og";

/* Generated rather than uploaded, so the card can never drift from the page.
   Kept to the page's own palette and to the subset Satori renders reliably:
   explicit flex on every container, no gap, uppercase written out literally. */

export const alt = "M. Usman Shamim, forward deployed engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0e11",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8f98a3" }}>
          <span style={{ color: "#f2a93b" }}>FORWARD DEPLOYED ENGINEER</span>
          <span style={{ margin: "0 26px", color: "#4b535e" }}>/</span>
          <span>CHEMICAL TECHNOLOGY + AGENTIC AI</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, color: "#e9ecef", letterSpacing: -2 }}>
            M. Usman Shamim
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 940,
              fontSize: 32,
              lineHeight: 1.4,
              color: "#bcc4cd",
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
            borderTop: "1px solid #262c34",
            paddingTop: 26,
            fontSize: 22,
            color: "#8f98a3",
          }}
        >
          <span>AgriAgent · Shop Desk · Student ops desk</span>
          <span style={{ color: "#f2a93b" }}>github.com/usman-shamim</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
