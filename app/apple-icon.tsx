import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontWeight: 800,
          fontSize: 72,
          color: "#ffffff",
          letterSpacing: "-2px",
        }}
      >
        VK
      </div>
    ),
    { ...size }
  );
}
