import { ImageResponse } from "next/og";

export const alt = "PragnyX EduOS — The AI Operating System for Modern Educational Institutions";
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
          background: "linear-gradient(135deg, #f7f7fc 0%, #eeeefb 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4640d6",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "linear-gradient(120deg, #4640d6, #7b7ff2)",
            }}
          />
          PragnyX EduOS
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 54, fontWeight: 700, lineHeight: 1.15, maxWidth: 960, color: "#15152b" }}>
          The AI Operating System for Modern Institutions
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 22, color: "#5c5c7a", maxWidth: 760 }}>
          Admissions to alumni — one platform, every department.
        </div>
      </div>
    ),
    { ...size }
  );
}
