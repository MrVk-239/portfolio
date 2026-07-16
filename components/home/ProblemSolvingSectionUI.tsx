"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Trophy, ExternalLink } from "lucide-react";
import type { ProblemSolvingData } from "@/types";

/* ── Animation ────────────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Sub-components ───────────────────────────────────────────────── */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-bold tracking-tight text-foreground sm:text-[2.5rem]">
        {value}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        {label}
      </span>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export function ProblemSolvingSectionUI({ data }: { data: ProblemSolvingData }) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const { overview, platforms, awards, iicpc } = data;
  const featuredPlatforms = platforms.filter((p) => p.featured);
  const highlights = awards.filter((a) => a.highlight);
  const topIICPC = iicpc[0];

  return (
    <section
      ref={ref}
      id="problem-solving"
      aria-label="Competitive Programming"
      className="relative scroll-mt-20 border-t border-border/60 py-20 sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--background-secondary) 0%, var(--background) 60%)",
      }}
    >
      <motion.div
        variants={!shouldReduce ? containerVariants : undefined}
        initial={!shouldReduce ? "hidden" : false}
        animate={!shouldReduce ? (inView ? "show" : "hidden") : undefined}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* ── Header ── */}
        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          className="mb-14 flex items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              Competitive Programming
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ratings &amp; Achievements
            </h2>
          </div>
          <Link
            href="/problem-solving"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Full profile
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          className="mb-12 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4"
        >
          <Stat
            value={`${overview.totalProblemsSolved.toLocaleString()}+`}
            label="Problems Solved"
          />
          <Stat value={`${featuredPlatforms.length}`} label="Platforms" />
          <Stat value={`${overview.contestsParticipated}+`} label="Contests" />
          {topIICPC?.rank != null && topIICPC.totalParticipants != null && (
            <Stat
              value={`${topIICPC.rank} / ${Math.floor(topIICPC.totalParticipants / 1000)}k+`}
              label="IICPC™ Rank"
            />
          )}
        </motion.div>

        {/* ── Hairline divider ── */}
        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          className="mb-12 h-px bg-border/60"
        />

        {/* ── Platform list + Highlights ── */}
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">

          {/* Platform ranking rows */}
          <motion.div variants={!shouldReduce ? itemVariants : undefined}>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Platform Rankings
            </p>

            <div className="divide-y divide-border/50">
              {featuredPlatforms.map((p) => (
                <div
                  key={p.id}
                  className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: p.brandColor }}
                    aria-hidden="true"
                  />

                  <span className="w-[100px] shrink-0 text-sm font-semibold text-foreground">
                    {p.platform}
                  </span>

                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: `${p.brandColor}1a`,
                      color: p.brandColor,
                    }}
                  >
                    {p.rank}
                  </span>

                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    {p.maxRating?.toLocaleString()}
                  </span>

                  {p.note && (
                    <span className="hidden text-xs text-muted-foreground/60 sm:inline">
                      · {p.note}
                    </span>
                  )}

                  <a
                    href={p.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.platform} profile`}
                    className="ml-auto text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/70"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlighted achievements */}
          <motion.div variants={!shouldReduce ? itemVariants : undefined}>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Highlights
            </p>

            <div className="space-y-5">
              {highlights.map((award) => (
                <div key={award.id} className="flex items-start gap-3">
                  <Trophy
                    size={14}
                    className="mt-[3px] shrink-0 text-primary/50"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {award.title}
                    </p>
                    {award.event && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{award.event}</p>
                    )}
                    {award.rank && (
                      <p className="mt-0.5 font-mono text-xs font-medium text-primary/80">
                        {award.rank}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
