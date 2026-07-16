import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0b1120",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "monospace",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: 48,
            height: 4,
            background: "#6366f1",
            borderRadius: 9999,
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          {siteConfig.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            fontWeight: 400,
            maxWidth: 860,
            lineHeight: 1.4,
            marginBottom: 56,
          }}
        >
          {siteConfig.tagline}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "#4f46e5",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            VK
          </div>
          <span style={{ fontSize: 18, color: "#64748b" }}>
            Computer Science · NIT Jamshedpur
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
