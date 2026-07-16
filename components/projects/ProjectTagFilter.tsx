"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectCategory } from "@/types";

interface ProjectTagFilterProps {
  projects: Project[];
  allTags: string[];
  allCategories: ProjectCategory[];
}

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  fullstack: "Full Stack",
  backend: "Backend",
  research: "Research",
  ml: "ML",
  systems: "Systems",
  other: "Other",
};

export function ProjectTagFilter({ projects, allTags, allCategories }: ProjectTagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);

  const filtered = projects.filter((p) => {
    const tagMatch = !activeTag || p.tags?.includes(activeTag);
    const catMatch = !activeCategory || p.category === activeCategory;
    return tagMatch && catMatch;
  });

  const pill =
    "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150 cursor-pointer";
  const active = "border-primary bg-primary/10 text-primary";
  const inactive = "border-border/60 text-muted-foreground hover:border-border hover:text-foreground";

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 space-y-3">
        {allCategories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button className={cn(pill, !activeCategory ? active : inactive)} onClick={() => setActiveCategory(null)}>All</button>
            {allCategories.map((cat) => (
              <button key={cat} className={cn(pill, activeCategory === cat ? active : inactive)} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        )}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button key={tag} className={cn(pill, "text-[10px]", activeTag === tag ? active : inactive)} onClick={() => setActiveTag(tag === activeTag ? null : tag)}>
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects match these filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
