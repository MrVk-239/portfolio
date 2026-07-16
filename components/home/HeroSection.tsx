"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteConfig } from "@/data/site";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { SocialIcon } from "@/components/shared/social-icons";
import { Button } from "@/components/ui/Button";

/* ── Animation variants ─────────────────────────────────────────── */

/*
  staggerChildren: 0.10s means each text element enters 100ms after the
  previous one. The sequence is:
    Badge (0.05s) → Name (0.15s) → Headline (0.25s) →
    Bio (0.35s) → Buttons (0.45s) → Social (0.55s) → Photo (0.65s)
  Each element fades+rises over 0.45s, so transitions overlap slightly
  which keeps the animation fluid rather than rigid.
*/
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
};

// Photo is intentionally delayed past the last text element (social links
// start at ~0.55s) so the eye settles on the content before the image arrives.
const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.65, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ── Component ──────────────────────────────────────────────────── */

export function HeroSection() {
  const [imgError, setImgError] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden py-16 sm:py-20"
      aria-label="Introduction"
    >
      {/* Dot grid — adapts to both themes via color-mix on --foreground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--foreground) 12%, transparent) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft primary glow — sits behind the text column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 65% 65% at 12% 55%, var(--primary-glow), transparent 75%)`,
        }}
      />

      {/* ── Page content ─────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/*
          Layout:
            mobile  → single column, photo below text
            md 768+ → two columns (text | 260 px photo)
            lg 1024+ → two columns (text | 360 px photo)
        */}
        <div className="flex flex-col gap-14 md:grid md:grid-cols-[1fr_260px] md:items-center md:gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">

          {/* ── Left: all text content ────────────────────────────── */}
          <motion.div
            variants={!shouldReduce ? containerVariants : undefined}
            initial={!shouldReduce ? "hidden" : false}
            animate={!shouldReduce ? "show" : undefined}
            className="flex flex-col"
          >
            {/* 1 — Availability badge */}
            <motion.div variants={!shouldReduce ? fadeUp : undefined}>
              <AvailabilityBadge />
            </motion.div>

            {/* 2 — Name */}
            <motion.h1
              variants={!shouldReduce ? fadeUp : undefined}
              className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl"
            >
              {siteConfig.name}
            </motion.h1>

            {/* 3 — Professional headline */}
            <motion.div
              variants={!shouldReduce ? fadeUp : undefined}
              className="mt-4 space-y-1"
            >
              <p className="text-xl font-medium sm:text-2xl">
                <span className="text-primary">Competitive Programmer</span>
                <span className="text-muted-foreground"> • </span>
                <span className="text-primary">Software Developer</span>
              </p>
              <p className="text-base text-muted-foreground sm:text-lg">
                Computer Science Undergraduate at{" "}
                <span className="font-medium text-primary">NIT Jamshedpur</span>
              </p>
            </motion.div>

            {/* 4 — Bio */}
            <motion.p
              variants={!shouldReduce ? fadeUp : undefined}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              {siteConfig.bio}
            </motion.p>

            {/* 5 — Primary CTAs */}
            <motion.div
              variants={!shouldReduce ? fadeUp : undefined}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/projects" size="lg" variant="primary">
                View Projects
              </Button>
              <Button href={siteConfig.resumeUrl} size="lg" variant="secondary" external>
                Resume
              </Button>
            </motion.div>

            {/* 6 — Social icon links */}
            <motion.div
              variants={!shouldReduce ? fadeUp : undefined}
              className="mt-5 flex items-center gap-2"
            >
              {siteConfig.social.map((link) => {
                const isExternal = link.url.startsWith("http");
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={link.name}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    style={{ transitionDuration: "var(--duration-fast)" }}
                  >
                    <SocialIcon name={link.icon} size={16} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Right: profile photo ──────────────────────────────── */}
          {/*
            7 — Photo animates last (delay 0.65s), after social links,
            so the reader's attention settles on the content first.
            Text column is always the dominant visual element.
          */}
          <motion.div
            variants={!shouldReduce ? photoVariants : undefined}
            initial={!shouldReduce ? "hidden" : false}
            animate={!shouldReduce ? "show" : undefined}
            className="flex justify-center"
          >
            <div
              data-cursor-expand
              className="relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-2xl border border-border/60 shadow-lg ring-4 ring-primary/10 md:h-[260px] md:w-[260px] lg:h-[360px] lg:w-[360px]"
            >
              {imgError ? (
                /* Development placeholder — replaced automatically when
                   /public/profile.jpg is added. No code change required. */
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                  <span className="font-mono text-4xl font-bold tracking-tight text-primary/40">
                    VK
                  </span>
                </div>
              ) : (
                <Image
                  src="/profile.jpg"
                  alt="V Krishnan"
                  fill
                  className="object-cover object-center"
                  priority
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
