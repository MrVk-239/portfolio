import { getPostBySlug } from "@/lib/blog";
import { getProjectBySlug } from "@/data/projects";
import { WritingSectionUI, type FeaturedPost } from "./WritingSectionUI";

const FEATURED_SLUGS = [
  "building-an-online-judge",
  "cryptography-research-ocaml",
] as const;

export function WritingSection() {
  const posts: FeaturedPost[] = FEATURED_SLUGS.flatMap((slug) => {
    const result = getPostBySlug(slug);
    if (!result) return [];

    const { frontmatter } = result;
    const projectSlug = frontmatter.relatedProjects?.[0];
    const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;

    return [
      {
        post: frontmatter,
        relatedProjectSlug: projectSlug,
        relatedProjectTitle: project?.title,
      },
    ];
  });

  if (posts.length === 0) return null;

  return <WritingSectionUI posts={posts} />;
}
