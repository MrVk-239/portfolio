"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowRight,
  BookOpen,
  Code2,
  FlaskConical,
  Briefcase,
} from "lucide-react";
import { experiences } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";

/* ── Type badge config ────────────────────────────────────────────── */

type TypeConfigValue = {
  label: string;
  icon: React.ElementType;
  className: string;
};

const TYPE_CONFIG: Record<Experience["type"], TypeConfigValue> = {
  internship: {
    label: "Internship",
    icon: Briefcase,
    className:
      "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  research: {
    label: "Research Internship",
    icon: FlaskConical,
    className:
      "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  fulltime: {
    label: "Full-time",
    icon: Briefcase,
    className:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  parttime: {
    label: "Part-time",
    icon: Briefcase,
    className:
      "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  contract: {
    label: "Contract",
    icon: Briefcase,
    className:
      "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
};

/* ── Helpers ──────────────────────────────────────────────────────── */

function formatDateRange(start: string, end: string | "Present"): string {
  const fmt = (d: string) =>
    new Date(`${d}-01`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  return `${fmt(start)} – ${end === "Present" ? "Present" : fmt(end)}`;
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

/* ── Experience card ──────────────────────────────────────────────── */

function ExperienceCard({ exp }: { exp: Experience }) {
  const type = TYPE_CONFIG[exp.type];
  const TypeIcon = type.icon;
  const dateRange = formatDateRange(exp.startDate, exp.endDate);
  const hasLinks = exp.relatedProject || (exp.relatedArticles && exp.relatedArticles.length > 0);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60",
        "bg-card/70 backdrop-blur-sm",
        "transition-all duration-300 hover:border-border hover:shadow-2xl hover:shadow-black/8",
      )}
    >
      <div className="relative p-7 sm:p-9">

        {/* ── Row 1: type badge + org badge + date ── */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
              type.className,
            )}
          >
            <TypeIcon size={10} aria-hidden="true" />
            {type.label}
          </span>

          {exp.badge && (
            <span className="rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {exp.badge}
            </span>
          )}

          <span className="ml-auto flex items-center gap-1.5 text-[11px] tabular-nums text-muted-foreground">
            <Calendar size={11} aria-hidden="true" />
            {dateRange}
          </span>
        </div>

        {/* ── Row 2: organization + department + role ── */}
        <div className="mb-1">
          {exp.companyUrl ? (
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl"
            >
              {exp.company}
            </a>
          ) : (
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {exp.company}
            </h3>
          )}
          {exp.department && (
            <p className="mt-0.5 text-sm text-muted-foreground">{exp.department}</p>
          )}
        </div>
        <p className="mb-1 text-[15px] font-semibold text-primary">{exp.role}</p>

        {/* ── Location ── */}
        <p className="mb-8 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <MapPin size={12} aria-hidden="true" />
          {exp.location}
        </p>

        {/* ── Description bullets ── */}
        <ul className="mb-8 space-y-2.5">
          {exp.description.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        {/* ── Highlights ── */}
        {exp.highlights && exp.highlights.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {exp.highlights.map((h) => (
              <span
                key={h}
                className="rounded-lg border border-amber-500/20 bg-amber-500/[0.08] px-3 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400"
              >
                ★ {h}
              </span>
            ))}
          </div>
        )}

        {/* ── Tech stack ── */}
        <div className={cn("flex flex-wrap gap-1.5", hasLinks ? "mb-8" : "")}>
          {exp.techStack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/50 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── Cross-links ── */}
        {hasLinks && (
          <div className="flex flex-wrap items-center gap-3 border-t border-border/40 pt-5">
            {exp.relatedProject && (
              <Link
                href={`/projects/${exp.relatedProject}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
              >
                <Code2 size={12} aria-hidden="true" />
                View Project
              </Link>
            )}
            {exp.relatedArticles?.map((slug) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/70 hover:text-foreground"
              >
                <BookOpen size={12} aria-hidden="true" />
                Read Article
              </Link>
            ))}
          </div>
        )}

      </div>
    </article>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const sorted = [...experiences].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  return (
    <section
      ref={ref}
      id="experience"
      aria-label="Experience"
      className="relative scroll-mt-20 border-t border-border/60 py-20 sm:py-28"
    >
      <motion.div
        variants={!shouldReduce ? containerVariants : undefined}
        initial={!shouldReduce ? "hidden" : false}
        animate={!shouldReduce ? (inView ? "show" : "hidden") : undefined}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >

        {/* ── Section header ── */}
        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          className="mb-12 flex items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              Career
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Experience
            </h2>
          </div>

          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View résumé
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* ── Cards ── */}
        <div className="space-y-5">
          {sorted.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.startDate}`}
              variants={!shouldReduce ? itemVariants : undefined}
            >
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
