import Link from "next/link";
import { ArrowRight, ExternalLink, BookOpen, Circle } from "lucide-react";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const STATUS_CONFIG = {
  completed: { label: "Completed", className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  active: { label: "Ongoing", className: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
  archived: { label: "Archived", className: "text-muted-foreground bg-muted/60 border-border/60" },
} satisfies Record<Project["status"], { label: string; className: string }>;

const MAX_STACK = 5;

interface ProjectCardProps {
  project: Project;
  /** Compact variant for related-content sidebars */
  compact?: boolean;
  className?: string;
}

function formatTimeline(date: string, endDate?: string | "Present"): string {
  const fmt = (d: string) =>
    new Date(`${d}-01`).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  if (!endDate) return fmt(date);
  return `${fmt(date)} – ${endDate === "Present" ? "Present" : fmt(endDate)}`;
}

export function ProjectCard({ project: p, compact = false, className }: ProjectCardProps) {
  const status = STATUS_CONFIG[p.status];
  const overflow = p.techStack.length - MAX_STACK;

  if (compact) {
    return (
      <Link
        href={`/projects/${p.slug}`}
        className={cn(
          "group flex flex-col gap-2 rounded-xl border border-border/60 bg-card/60 p-4",
          "backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-black/5",
          className
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
            {p.title}
          </h3>
          <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium", status.className)}>
            {status.label}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{p.tagline}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {p.techStack.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md border border-border/50 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-[gap] duration-150">
          View case study <ArrowRight size={11} />
        </span>
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border/60 bg-card/60 p-6",
        "backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-black/5",
        className
      )}
    >
      {/* Header row */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium", status.className)}>
            <Circle size={6} className="fill-current" aria-hidden="true" />
            {status.label}
          </span>
          {p.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
          {formatTimeline(p.date, p.endDate)}
        </span>
      </div>

      {/* Title + tagline */}
      <h2 className="mb-1.5 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
        <Link href={`/projects/${p.slug}`} className="stretched-link">{p.title}</Link>
      </h2>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.tagline}</p>

      {/* Metrics (first 2) */}
      {p.metrics && p.metrics.length > 0 && (
        <ul className="mb-4 space-y-1">
          {p.metrics.slice(0, 2).map((m) => (
            <li key={m} className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
              {m}
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {p.techStack.slice(0, MAX_STACK).map((t) => (
          <span key={t} className="rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {t}
          </span>
        ))}
        {overflow > 0 && (
          <span className="rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            +{overflow}
          </span>
        )}
      </div>

      {/* Links — each gets relative z-[2] to pierce the stretched-link overlay */}
      <div className="flex items-center gap-3 border-t border-border/40 pt-4">
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="relative z-[2] flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <GithubIcon size={13} /> Code
          </a>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="relative z-[2] flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors" aria-label="Live demo">
            <ExternalLink size={13} /> Live
          </a>
        )}
        {p.blogUrl && (
          <Link href={p.blogUrl} className="relative z-[2] flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen size={13} /> Article
          </Link>
        )}
        <span className="ml-auto flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-[gap] duration-150">
          Case study <ArrowRight size={11} />
        </span>
      </div>
    </article>
  );
}
