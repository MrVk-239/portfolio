"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/types";

/* ── Desktop column-balance ordering ─────────────────────────────── */
/*
  Mobile: narrative data order (order-1 through order-9).
  Desktop (2-col grid): Frontend ↔ Languages swapped so both tall
  categories land in opposite columns — ~590px each.

    Left column:  CP | Languages | Databases | Tools | Coursework
    Right column: Backend | Frontend | Cloud | Research
*/
const CATEGORY_ORDER: Record<string, string> = {
  "Competitive Programming":            "order-1 lg:order-1",
  "Backend Engineering":                "order-2 lg:order-2",
  "Frontend Engineering":              "order-3 lg:order-4",
  "Programming Languages":              "order-4 lg:order-3",
  "Databases":                          "order-5 lg:order-5",
  "Cloud & DevOps":                     "order-6 lg:order-6",
  "Tools & Technologies":               "order-7 lg:order-7",
  "Research & Performance Engineering": "order-8 lg:order-8",
  "Relevant Coursework":                "order-9 lg:order-9",
};

/* ── Animation variants ───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Skill chip ───────────────────────────────────────────────────── */

function SkillChip({
  skill,
  isCoursework,
}: {
  skill: Skill;
  isCoursework: boolean;
}) {
  if (isCoursework) {
    return (
      <div className="rounded-lg border border-dashed border-border/40 bg-transparent px-3 py-2">
        <span className="text-[12px] font-normal text-muted-foreground/70">
          {skill.name}
        </span>
      </div>
    );
  }

  const hasUsage = skill.usedIn && skill.usedIn.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-xl border px-3.5 py-3 select-none",
        hasUsage
          ? "border-border/60 bg-card/60 transition-colors duration-200 hover:border-border hover:bg-card"
          : "border-border/40 bg-muted/30",
      )}
    >
      <span
        className={cn(
          "text-[13px] font-medium leading-none",
          hasUsage ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {skill.name}
      </span>

      {hasUsage && (
        <div className="flex flex-wrap gap-1">
          {skill.usedIn!.map((usage) => (
            <Link
              key={usage.href}
              href={usage.href}
              className={cn(
                "inline-flex items-center gap-0.5",
                "rounded-full px-2 py-0.5",
                "border border-primary/15 bg-primary/5",
                "font-mono text-[10px] text-primary/70",
                "transition-all duration-150",
                "hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
              )}
            >
              {usage.label}
              <ArrowUpRight size={8} aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Category card ────────────────────────────────────────────────── */

function CategoryCard({
  category,
  animate,
  orderClass,
}: {
  category: SkillCategory;
  animate: boolean;
  orderClass: string;
}) {
  const isCoursework = category.variant === "coursework";

  return (
    <motion.div
      variants={animate ? itemVariants : undefined}
      className={cn("flex flex-col gap-3", orderClass)}
    >
      <h3
        className={cn(
          "font-mono text-[11px] font-semibold uppercase tracking-widest",
          isCoursework ? "text-muted-foreground/55" : "text-muted-foreground",
        )}
      >
        {isCoursework && (
          <GraduationCap
            size={11}
            className="mr-1.5 inline-block align-[-1px]"
            aria-hidden="true"
          />
        )}
        {category.name}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillChip
            key={skill.name}
            skill={skill}
            isCoursework={isCoursework}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const animate = !shouldReduce;

  return (
    <section
      ref={ref}
      id="skills"
      aria-label="Skills"
      className="relative scroll-mt-20 border-t border-border/60 py-20 sm:py-28"
    >
      <motion.div
        variants={animate ? containerVariants : undefined}
        initial={animate ? "hidden" : false}
        animate={animate ? (inView ? "show" : "hidden") : undefined}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* ── Section header ── */}
        <motion.div
          variants={animate ? itemVariants : undefined}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
            Toolkit
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Skills
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Technologies I&apos;ve used in production, research, or competitive
            programming — with links to where each was applied.
          </p>
        </motion.div>

        {/* ── Category grid ── */}
        {/*
          CSS grid with explicit order values per card.
          Mobile: order-1..9 → narrative data order.
          Desktop (lg:grid-cols-2): lg:order-* values swap Frontend ↔ Languages
          so both tall categories land in opposite columns.
        */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2">
          {skillCategories.map((cat) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              animate={animate}
              orderClass={CATEGORY_ORDER[cat.name] ?? ""}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
