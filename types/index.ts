/* ============================================================
   Shared TypeScript types — all content data shapes defined here
   ============================================================ */

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  whyBuilt: string;
  techStack: string[];
  /** Semantic filter labels — shorter / more abstract than techStack entries */
  tags?: string[];
  features: string[];
  challenges: string[];
  learnings: string[];
  /** Structured impact metrics — each string is one bullet (e.g. "1,000+ submissions") */
  metrics?: string[];
  /** Kept for backward compat; use metrics[] for new entries */
  impact?: string;
  githubUrl?: string;
  liveUrl?: string;
  /** Link to the blog post or case study written about this project */
  blogUrl?: string;
  images?: string[];
  architectureDiagram?: string;
  /** MDX file in /content/projects/ for rich prose; page renders it below structured fields */
  contentMdx?: string;
  /** Blog slugs that discuss this project (beyond the primary blogUrl) */
  relatedArticles?: string[];
  featured: boolean;
  /** Lower number = shown first in listings */
  order?: number;
  category: ProjectCategory;
  status: "completed" | "active" | "archived";
  /** ISO YYYY-MM start date */
  date: string;
  /** ISO YYYY-MM end date, or "Present" */
  endDate?: string | "Present";
}

export type ProjectCategory =
  | "fullstack"
  | "backend"
  | "research"
  | "ml"
  | "systems"
  | "other";

export interface Experience {
  company: string;
  companyUrl?: string;
  /** Sub-unit within the organization, e.g. "Department of Computer Science and Engineering" */
  department?: string;
  role: string;
  type: "internship" | "fulltime" | "parttime" | "contract" | "research";
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  techStack: string[];
  highlights?: string[];
  badge?: string;
  /** Slug of the primary project built or contributed to during this experience */
  relatedProject?: string;
  /** Blog post slugs written about or arising from this experience */
  relatedArticles?: string[];
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  /** "coursework" renders chips with a distinct subtle style */
  variant?: "default" | "coursework";
}

export interface SkillUsage {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: "primary" | "secondary" | "learning";
  icon?: string;
  /** Projects or experiences where this skill was directly demonstrated */
  usedIn?: SkillUsage[];
}

export interface Achievement {
  title: string;
  description: string;
  date?: string;
  icon?: string;
  category: "competitive" | "academic" | "professional" | "leadership";
  highlight?: boolean;
}

// ---- Problem Solving -------------------------------------------------------

export interface PlatformProfile {
  id: string;
  platform: string;
  handle: string;
  profileUrl: string;
  currentRating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  problemsSolved?: number;
  /** Number of rated contests on this platform */
  contestsParticipated?: number;
  /** Year they started using this platform, e.g. "2024" */
  activeSince?: string;
  /** Hex brand color for the platform badge */
  brandColor: string;
  /** Show on homepage CP summary card */
  featured?: boolean;
  note?: string;
}

export interface IICPCResult {
  id: string;
  year: string;
  /** e.g. "CodeFest", "Preliminary Round" */
  stage: string;
  rank?: number;
  totalParticipants?: number;
  teamName?: string;
  teamMembers?: string[];
  problemsSolved?: number;
  totalProblems?: number;
  url?: string;
  /** Short description of the achievement for display */
  description?: string;
  /** URL to the result certificate or proof */
  certificate?: string;
}

export interface ContestEntry {
  id: string;
  name: string;
  platform: string;
  date: string;
  rank?: number;
  outOf?: number;
  ratingChange?: number;
  newRating?: number;
  url?: string;
  /** URL to a screenshot of the rank / result page */
  screenshotUrl?: string;
  highlight?: boolean;
}

export interface CPAward {
  id: string;
  title: string;
  event: string;
  date?: string;
  rank?: string;
  description?: string;
  url?: string;
  highlight?: boolean;
}

export interface CPCertificate {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  /** URL to an image of the certificate for display */
  imageUrl?: string;
}

/** A notable problem solution — showcases algorithmic thinking */
export interface CPSubmission {
  id: string;
  problemName: string;
  platform: string;
  difficulty?: "Easy" | "Medium" | "Hard" | string;
  /** Link to the problem statement */
  problemUrl?: string;
  /** Link to the accepted submission */
  submissionUrl?: string;
  /** What makes this solution interesting */
  notes?: string;
  tags?: string[];
  highlight?: boolean;
}

export interface CPTimelineEntry {
  date: string;
  event: string;
  platform?: string;
  detail?: string;
  highlight?: boolean;
  /** External URL — makes the entry clickable (e.g., contest page, announcement) */
  url?: string;
}

export interface ProblemSolvingData {
  overview: {
    totalProblemsSolved: number;
    contestsParticipated: number;
    /** Short tagline shown on the homepage CP card */
    tagline: string;
    /** Year they started competitive programming, e.g. "2024" */
    activeSince?: string;
  };
  platforms: PlatformProfile[];
  iicpc: IICPCResult[];
  contests: ContestEntry[];
  awards: CPAward[];
  certificates: CPCertificate[];
  timeline: CPTimelineEntry[];
  /** Notable problem solutions that showcase algorithmic thinking */
  submissions?: CPSubmission[];
}

// ---- Platform configuration (identity + fallback values for the resolver) --

export interface PlatformConfig {
  id: string;
  platform: string;
  handle: string;
  profileUrl: string;
  brandColor: string;
  featured?: boolean;
  /** Year the user started on this platform, e.g. "2024" */
  activeSince?: string;
  /** Static display note (e.g. ranking tier label) */
  note?: string;
  /** Fallback values used when the live API is unavailable */
  fallback: {
    currentRating?: number;
    maxRating?: number;
    rank?: string;
    maxRank?: string;
    problemsSolved?: number;
    contestsParticipated?: number;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  tags: string[];
  readingTime?: number;
  draft?: boolean;
  coverImage?: string;
  /** Project slugs shown as related cards at the bottom of the post */
  relatedProjects?: string[];
  /** Blog slugs shown as related articles at the bottom of the post */
  relatedArticles?: string[];
}

export interface Heading {
  level: 2 | 3;
  text: string;
  id: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  displayName: string;
  tagline: string;
  bio: string;
  about: string[];
  email: string;
  location: string;
  openToWork: boolean;
  social: SocialLink[];
  nav: NavLink[];
  resumeUrl: string;
}
