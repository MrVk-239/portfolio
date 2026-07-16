import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  ArrowLeft, ExternalLink, BookOpen,
  Circle, Calendar, CheckCircle2, Wrench, Lightbulb,
} from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { projects, getProjectBySlug } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { rehypeShiki } from "@/lib/rehype-shiki";
import { rehypeSlug } from "@/lib/rehype-slug";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { BlogCard } from "@/components/blog/BlogCard";
import { GithubIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline,
      type: "article",
    },
  };
}

const STATUS_CONFIG: Record<Project["status"], { label: string; className: string }> = {
  completed: { label: "Completed", className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  active: { label: "Ongoing", className: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
  archived: { label: "Archived", className: "text-muted-foreground bg-muted/60 border-border/60" },
};

function formatDate(d: string) {
  return new Date(`${d}-01`).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items, icon: Icon }: { items: string[]; icon: React.ElementType }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <Icon size={14} className="mt-0.5 shrink-0 text-primary/60" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const status = STATUS_CONFIG[p.status];
  const timeline = p.endDate
    ? `${formatDate(p.date)} – ${p.endDate === "Present" ? "Present" : formatDate(p.endDate)}`
    : formatDate(p.date);

  // Resolve related blog articles
  const allPosts = getAllPosts();
  const relatedPosts = (p.relatedArticles ?? (p.blogUrl ? [p.blogUrl.replace("/blog/", "")] : []))
    .map((slug) => allPosts.find((post) => post.slug === slug))
    .filter(Boolean);

  // Load optional MDX content
  let mdxContent: React.ReactNode = null;
  if (p.contentMdx) {
    const mdxPath = path.join(process.cwd(), "content", "projects", `${p.contentMdx}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const raw = fs.readFileSync(mdxPath, "utf-8");
      const { content: source } = matter(raw);
      const { content } = await compileMDX({
        source,
        components: mdxComponents,
        options: {
          mdxOptions: {
            rehypePlugins: [rehypeSlug, rehypeShiki],
          },
        },
      });
      mdxContent = content;
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      {/* Back */}
      <Link href="/projects" className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={14} /> All projects
      </Link>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="mb-12">
        {/* Status + timeline */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium", status.className)}>
            <Circle size={6} className="fill-current" aria-hidden="true" />
            {status.label}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar size={12} aria-hidden="true" />
            {timeline}
          </span>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{p.title}</h1>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">{p.tagline}</p>

        {/* CTA links */}
        <div className="flex flex-wrap gap-3">
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-border hover:shadow-md">
              <GithubIcon size={14} /> View Code
            </a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-border hover:shadow-md">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {p.blogUrl && (
            <Link href={p.blogUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10">
              <BookOpen size={14} /> Read Case Study
            </Link>
          )}
        </div>
      </header>

      {/* ── Tech + Tags ───────────────────────────────────────── */}
      <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="rounded-md border border-border/50 bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
        {p.tags && p.tags.length > 0 && (
          <div>
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Metrics ───────────────────────────────────────────── */}
      {p.metrics && p.metrics.length > 0 && (
        <div className="mb-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Impact</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.metrics.map((m) => (
              <div key={m} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Narrative ─────────────────────────────────────────── */}
      <div className="mb-12 space-y-8 border-t border-border/60 pt-10">
        <Section title="The Problem">
          <p className="text-sm leading-relaxed text-muted-foreground">{p.problem}</p>
        </Section>
        <Section title="Why I Built This">
          <p className="text-sm leading-relaxed text-muted-foreground">{p.whyBuilt}</p>
        </Section>
        {p.description !== p.tagline && (
          <Section title="Overview">
            <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
          </Section>
        )}
      </div>

      {/* ── Features / Challenges / Learnings ─────────────────── */}
      <div className="mb-12 grid gap-8 border-t border-border/60 pt-10 sm:grid-cols-2">
        <Section title="What It Does">
          <BulletList items={p.features} icon={CheckCircle2} />
        </Section>
        <Section title="Challenges">
          <BulletList items={p.challenges} icon={Wrench} />
        </Section>
      </div>
      <div className="mb-12 border-t border-border/60 pt-8">
        <Section title="What I Learned">
          <BulletList items={p.learnings} icon={Lightbulb} />
        </Section>
      </div>

      {/* ── Optional MDX prose ────────────────────────────────── */}
      {mdxContent && (
        <div className="mb-12 border-t border-border/60 pt-10 text-sm">{mdxContent}</div>
      )}

      {/* ── Related articles ──────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-border/60 pt-10">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {relatedPosts.length === 1 ? "Engineering Write-up" : "Related Articles"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPosts.map(
              (post) => post && <BlogCard key={post.slug} post={post} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
