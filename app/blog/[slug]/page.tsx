import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getPostBySlug, getAdjacentPosts, getAllPosts, extractHeadings,
} from "@/lib/blog";
import { getProjectBySlug } from "@/data/projects";
import { rehypeShiki } from "@/lib/rehype-shiki";
import { rehypeSlug } from "@/lib/rehype-slug";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vkrishnan.vercel.app";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { frontmatter: fm } = post;
  return {
    title: fm.title,
    description: fm.description,
    openGraph: {
      title: `${fm.title} — ${siteConfig.name}`,
      description: fm.description,
      type: "article",
      publishedTime: fm.date,
      modifiedTime: fm.lastUpdated,
      tags: fm.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter: fm, source } = post;
  const { prev, next } = getAdjacentPosts(slug);
  const headings = extractHeadings(source);
  const pageUrl = `${SITE_URL}/blog/${slug}`;

  // Resolve cross-links
  const allPosts = getAllPosts();
  const relatedProjectList = (fm.relatedProjects ?? [])
    .map((s) => getProjectBySlug(s))
    .filter(Boolean);
  const relatedArticleList = (fm.relatedArticles ?? [])
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean);

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeShiki],
      },
    },
  });

  const showLastUpdated =
    fm.lastUpdated && fm.lastUpdated !== fm.date;

  return (
    <>
      <ReadingProgress />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Back */}
        <Link href="/blog" className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> All articles
        </Link>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16 xl:grid-cols-[1fr_240px]">
          {/* ── Main content ── */}
          <div className="min-w-0">
            {/* Article header */}
            <header className="mb-8 border-b border-border/60 pb-8">
              {fm.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {fm.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {fm.title}
              </h1>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">{fm.description}</p>

              {/* Meta row */}
              <div className="mb-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} aria-hidden="true" />
                  <time dateTime={fm.date}>{formatDate(fm.date)}</time>
                </span>
                {showLastUpdated && (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw size={11} aria-hidden="true" />
                    Updated <time dateTime={fm.lastUpdated}>{formatDate(fm.lastUpdated!)}</time>
                  </span>
                )}
                {fm.readingTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {fm.readingTime} min read
                  </span>
                )}
              </div>

              {/* Share buttons */}
              <ShareButtons url={pageUrl} title={fm.title} />
            </header>

            {/* MDX prose */}
            <article className="text-sm sm:text-base">{content}</article>

            {/* ── Related Projects ── */}
            {relatedProjectList.length > 0 && (
              <section className="mt-14 border-t border-border/60 pt-10">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Related {relatedProjectList.length === 1 ? "Project" : "Projects"}
                </p>
                <div className={cn("grid gap-4", relatedProjectList.length > 1 && "sm:grid-cols-2")}>
                  {relatedProjectList.map(
                    (proj) => proj && (
                      <ProjectCard key={proj.slug} project={proj} compact />
                    )
                  )}
                </div>
              </section>
            )}

            {/* ── Related Articles ── */}
            {relatedArticleList.length > 0 && (
              <section className="mt-10 border-t border-border/60 pt-10">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Related {relatedArticleList.length === 1 ? "Article" : "Articles"}
                </p>
                <div className={cn("grid gap-4", relatedArticleList.length > 1 && "sm:grid-cols-2")}>
                  {relatedArticleList.map(
                    (article) => article && <BlogCard key={article.slug} post={article} />
                  )}
                </div>
              </section>
            )}

            {/* ── Prev / Next ── */}
            {(prev || next) && (
              <nav aria-label="Article navigation" className="mt-12 grid grid-cols-2 gap-4 border-t border-border/60 pt-8">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className={cn("group flex flex-col gap-1 rounded-xl border border-border/60 p-4 hover:border-border transition-colors")}>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft size={12} /> Previous</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{prev.title}</span>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link href={`/blog/${next.slug}`} className={cn("group flex flex-col items-end gap-1 rounded-xl border border-border/60 p-4 hover:border-border transition-colors text-right")}>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">Next <ArrowRight size={12} /></span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.title}</span>
                  </Link>
                ) : <div />}
              </nav>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <TableOfContents headings={headings} />
              <div className="border-t border-border/60 pt-6">
                <ShareButtons url={pageUrl} title={fm.title} className="flex-col items-start" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
