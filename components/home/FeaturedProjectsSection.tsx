"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, ExternalLink, Circle, Calendar } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { GithubIcon } from "@/components/shared/social-icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/* ── Constants ────────────────────────────────────────────────────── */

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  active: {
    label: "Ongoing",
    className: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  archived: {
    label: "Archived",
    className: "text-muted-foreground bg-muted/60 border-border/60",
  },
} satisfies Record<Project["status"], { label: string; className: string }>;

function formatTimeline(date: string, endDate?: string | "Present"): string {
  const fmt = (d: string) =>
    new Date(`${d}-01`).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  if (!endDate) return fmt(date);
  return `${fmt(date)} – ${endDate === "Present" ? "Present" : fmt(endDate)}`;
}

/* ── Animation variants ───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Hero card ────────────────────────────────────────────────────── */
/*
  Intentionally larger and more editorial than the secondary ProjectCards.
  Shows the full metric set, all CTAs, and a typographic index watermark.
  No stretched-link: with multiple prominent CTAs, explicit clicks are better UX.
*/

function FeaturedProjectHero({ project: p, index }: { project: Project; index: number }) {
  const status = STATUS_CONFIG[p.status];
  const orderLabel = String(index + 1).padStart(2, "0");
  const timeline = formatTimeline(p.date, p.endDate);
  const MAX_STACK = 8;
  const overflow = p.techStack.length - MAX_STACK;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60",
        "bg-card/70 backdrop-blur-sm",
        "transition-all duration-300 hover:border-border hover:shadow-2xl hover:shadow-black/8",
      )}
    >
      {/* Typographic watermark — purely decorative */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-7 top-5 select-none font-mono text-[88px] font-bold leading-none tracking-tighter text-foreground/[0.04] transition-all duration-500 group-hover:text-foreground/[0.07]"
      >
        {orderLabel}
      </span>

      <div className="relative p-7 sm:p-9 lg:p-11">

        {/* ── Row 1: status + tags + timeline ── */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
              status.className,
            )}
          >
            <Circle size={5} className="fill-current" aria-hidden="true" />
            {status.label}
          </span>

          {p.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}

          <span className="ml-auto flex items-center gap-1.5 text-[11px] tabular-nums text-muted-foreground">
            <Calendar size={11} aria-hidden="true" />
            {timeline}
          </span>
        </div>

        {/* ── Row 2: title + tagline ── */}
        <h3 className="mb-2.5 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-2xl lg:text-[1.65rem]">
          <Link href={`/projects/${p.slug}`}>{p.title}</Link>
        </h3>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {p.tagline}
        </p>

        {/* ── Row 3: metrics as stat boxes ── */}
        {p.metrics && p.metrics.length > 0 && (
          <div className="mb-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {p.metrics.slice(0, 4).map((m) => (
              <div
                key={m}
                className="rounded-xl border border-border/50 bg-muted/40 px-3.5 py-3 transition-colors duration-200 hover:border-border/80"
              >
                <p className="text-[11px] font-medium leading-snug text-foreground/90">{m}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Row 4: tech stack ── */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {p.techStack.slice(0, MAX_STACK).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/50 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {overflow > 0 && (
            <span className="rounded-md border border-border/50 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              +{overflow}
            </span>
          )}
        </div>

        {/* ── Row 5: action links ── */}
        <div className="flex flex-wrap items-center gap-3">
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
            >
              <GithubIcon size={13} /> GitHub
            </a>
          )}
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
          {p.blogUrl && (
            <Link
              href={p.blogUrl}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
            >
              <BookOpen size={13} /> Read Article
            </Link>
          )}

          {/* Primary CTA — right-aligned */}
          <Link
            href={`/projects/${p.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10"
          >
            View Case Study <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </article>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export function FeaturedProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const sorted = [...featuredProjects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const [primary, ...rest] = sorted;

  return (
    <section
      ref={ref}
      id="projects"
      aria-label="Featured Projects"
      className="relative scroll-mt-20 overflow-hidden border-t border-border/60 py-20 sm:py-28"
    >
      {/* Faint left-edge glow — ties back to the hero section without repeating the dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 70% at 0% 50%, var(--primary-glow), transparent 70%)`,
        }}
      />

      <motion.div
        variants={!shouldReduce ? containerVariants : undefined}
        initial={!shouldReduce ? "hidden" : false}
        animate={!shouldReduce ? (inView ? "show" : "hidden") : undefined}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >

        {/* ── Section header ── */}
        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          className="mb-12 flex items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              Selected Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All projects
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        {/* ── Primary featured: large editorial card ── */}
        {primary && (
          <motion.div variants={!shouldReduce ? itemVariants : undefined}>
            <FeaturedProjectHero project={primary} index={0} />
          </motion.div>
        )}

        {/* ── Secondary featured: standard ProjectCard grid ── */}
        {rest.length > 0 && (
          <motion.div
            variants={!shouldReduce ? itemVariants : undefined}
            className={cn(
              "mt-5 grid gap-5",
              rest.length === 1 ? "max-w-xl" : "sm:grid-cols-2",
            )}
          >
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </motion.div>
        )}

      </motion.div>
    </section>
  );
}
