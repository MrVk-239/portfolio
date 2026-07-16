import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border/60 bg-card/60 p-6",
        "backdrop-blur-sm transition-all duration-300",
        "hover:border-border hover:shadow-lg hover:shadow-black/5",
        className
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        {post.readingTime && (
          <span className="flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" />
            {post.readingTime} min read
          </span>
        )}
      </div>

      <h2 className="mb-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
        {post.title}
      </h2>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:gap-2.5 transition-[gap] duration-200">
        Read article
        <ArrowRight size={12} aria-hidden="true" />
      </span>
    </Link>
  );
}
