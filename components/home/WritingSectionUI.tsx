"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Terminal,
  Cpu,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface FeaturedPost {
  post: BlogPost;
  relatedProjectSlug?: string;
  relatedProjectTitle?: string;
}

/* ── Per-article placeholder config ──────────────────────────────────── */

const PLACEHOLDER: Record<
  string,
  { Icon: React.ElementType; label: string }
> = {
  "building-an-online-judge": {
    Icon: Terminal,
    label: "Backend systems article",
  },
  "cryptography-research-ocaml": {
    Icon: Cpu,
    label: "Cryptography research article",
  },
};

/* ── Animation variants ───────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ── Helpers ──────────────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Editorial card ───────────────────────────────────────────────────── */
/*
  Interaction model:
  - `<article>` has `position: relative` (from Tailwind `relative`)
  - The title `<Link className="stretched-link">` creates a full-card ::after
    overlay (z-index: 1) via the `.stretched-link` utility in globals.css
  - "Read article →" span navigates via the stretched-link overlay
  - Related project `<Link>` has `relative z-[2]` to pierce the overlay and
    remain independently clickable
*/

function EditorialCard({
  post,
  relatedProjectSlug,
  relatedProjectTitle,
}: FeaturedPost) {
  const config = PLACEHOLDER[post.slug] ?? { Icon: Terminal, label: "Article" };
  const Icon = config.Icon;

  return (
    <motion.article
      variants={itemVariants}
      className={cn(
        "group relative flex flex-col",
        "rounded-2xl border border-border/60 bg-card/60",
        "overflow-hidden backdrop-blur-sm",
        "transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-black/5",
      )}
    >
      {/* ── Cover / Placeholder ── */}
      <div className="relative aspect-video overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /*
            Elegant placeholder — replaces automatically when coverImage is
            added to frontmatter and the file placed in /public/blog/.
          */
          <div
            aria-label={config.label}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
          >
            {/* Subtle radial glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06] [background:radial-gradient(ellipse_60%_55%_at_50%_50%,var(--color-primary),transparent)]"
            />
            {/* Topic icon */}
            <Icon
              size={56}
              strokeWidth={0.75}
              aria-hidden="true"
              className="relative text-primary/20 transition-all duration-500 group-hover:scale-105 group-hover:text-primary/35"
            />
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-6">
        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={11} aria-hidden="true" />
              {post.readingTime} min read
            </span>
          )}
        </div>

        {/* Title — stretched-link anchor */}
        <h3 className="mb-2 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-lg">
          <Link href={`/blog/${post.slug}`} className="stretched-link">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-border/40 pt-4">
          {/* Related project cross-link — z-[2] pierces stretched-link overlay */}
          {relatedProjectSlug && relatedProjectTitle && (
            <Link
              href={`/projects/${relatedProjectSlug}`}
              className="relative z-[2] flex min-w-0 max-w-[10rem] items-center gap-1 text-[11px] text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              <FolderOpen size={10} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{relatedProjectTitle}</span>
            </Link>
          )}

          {/* CTA — navigates via stretched-link overlay */}
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-primary transition-[gap] duration-200 group-hover:gap-2.5">
            Read article
            <ArrowRight size={12} aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

interface WritingSectionUIProps {
  posts: FeaturedPost[];
}

export function WritingSectionUI({ posts }: WritingSectionUIProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const animate = !shouldReduce;

  return (
    <section
      ref={ref}
      id="writing"
      aria-label="Writing"
      className="relative scroll-mt-20 border-t border-border/60 py-20 sm:py-28"
    >
      <motion.div
        variants={animate ? containerVariants : undefined}
        initial={animate ? "hidden" : false}
        animate={animate ? (inView ? "show" : "hidden") : undefined}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          variants={animate ? itemVariants : undefined}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              Articles
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Writing
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Technical deep-dives on systems programming, compiler
              performance, and software engineering.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all articles
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        {/* Editorial cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map(({ post, relatedProjectSlug, relatedProjectTitle }) => (
            <EditorialCard
              key={post.slug}
              post={post}
              relatedProjectSlug={relatedProjectSlug}
              relatedProjectTitle={relatedProjectTitle}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
