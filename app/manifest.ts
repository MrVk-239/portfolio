import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "V Krishnan — Software Engineer",
    short_name: "V Krishnan",
    description:
      "Portfolio of V Krishnan — competitive programmer, backend engineer, and cryptography researcher at NIT Jamshedpur.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1120",
    theme_color: "#6366f1",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
