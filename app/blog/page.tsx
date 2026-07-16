import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogTagFilter } from "@/components/blog/BlogTagFilter";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on systems programming, competitive programming, and software engineering.",
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description:
      "Technical writing on systems programming, competitive programming, and software engineering.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <header className="mb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Writing
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
          Technical deep-dives on systems programming, competitive programming,
          and the engineering decisions behind the projects I build.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No articles published yet.</p>
      ) : (
        <BlogTagFilter posts={posts} tags={tags} />
      )}
    </div>
  );
}
