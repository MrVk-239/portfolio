import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, Heading } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir() {
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

export function getAllPosts(): BlogPost[] {
  ensureDir();
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
      const { data } = matter(raw);
      const stats = readingTime(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        lastUpdated: data.lastUpdated as string | undefined,
        tags: (data.tags as string[]) ?? [],
        readingTime: Math.ceil(stats.minutes),
        draft: (data.draft as boolean) ?? false,
        coverImage: data.coverImage as string | undefined,
        relatedProjects: (data.relatedProjects as string[]) ?? [],
        relatedArticles: (data.relatedArticles as string[]) ?? [],
      } satisfies BlogPost;
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): {
  frontmatter: BlogPost;
  source: string;
} | null {
  ensureDir();
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(raw);

  return {
    frontmatter: {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      lastUpdated: data.lastUpdated as string | undefined,
      tags: (data.tags as string[]) ?? [],
      readingTime: Math.ceil(stats.minutes),
      draft: (data.draft as boolean) ?? false,
      coverImage: data.coverImage as string | undefined,
      relatedProjects: (data.relatedProjects as string[]) ?? [],
      relatedArticles: (data.relatedArticles as string[]) ?? [],
    } satisfies BlogPost,
    source: content,
  };
}

export function getAdjacentPosts(
  slug: string
): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

/** Extract h2/h3 headings from raw MDX source for TOC generation. */
export function extractHeadings(source: string): Heading[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ level, text, id });
  }
  return headings;
}

export function generateRSS(posts: BlogPost[], siteUrl: string): string {
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid>${siteUrl}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>V Krishnan — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Technical writing on systems, competitive programming, and software engineering.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
