import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.displayName} — developer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#F3F3EE",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C8FF00",
          }}
        >
          <span>{site.brand}</span>
          <span>{site.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 600,
              maxWidth: 920,
            }}
          >
            {site.headline}
          </div>
          <div style={{ fontSize: 24, color: "#8D8D86", maxWidth: 760 }}>
            {site.fullName}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
