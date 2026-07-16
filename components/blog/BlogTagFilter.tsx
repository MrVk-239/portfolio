"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/types";

interface BlogTagFilterProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogTagFilter({ posts, tags }: BlogTagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150",
              activeTag === null
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150",
                activeTag === tag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No articles for this tag yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
