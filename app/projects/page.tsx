import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectTagFilter } from "@/components/projects/ProjectTagFilter";
import { siteConfig } from "@/data/site";
import type { ProjectCategory } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering case studies — full-stack platforms, systems research, and data pipelines built by V Krishnan.",
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description: "Engineering case studies across full-stack, systems, research, and ML.",
  },
};

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const allTags = unique(sorted.flatMap((p) => p.tags ?? []));
  const allCategories = unique(sorted.map((p) => p.category)) as ProjectCategory[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <header className="mb-14">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Work</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Projects</h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Engineering case studies across competitive programming platforms, systems research,
          data pipelines, and machine learning — each with a full breakdown of decisions,
          trade-offs, and outcomes.
        </p>
      </header>

      <ProjectTagFilter projects={sorted} allTags={allTags} allCategories={allCategories} />
    </div>
  );
}
