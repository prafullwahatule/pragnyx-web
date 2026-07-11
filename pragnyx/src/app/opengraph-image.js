import { ImageResponse } from "next/og";

export const alt = "PragnyX — Wisdom for the Next Frontier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #07070b 0%, #0d0d18 55%, #160f22 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8888a6",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "linear-gradient(120deg, #2e8fff, #b23bff)",
            }}
          />
          PragnyX
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 940, color: "#f2f2f7" }}>
          Wisdom for the Next Frontier
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 24, color: "#8888a6", maxWidth: 760 }}>
          The future is not predicted — it is engineered.
        </div>
      </div>
    ),
    { ...size }
  );
}
