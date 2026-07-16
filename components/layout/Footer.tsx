import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: (props) => <Mail aria-hidden="true" {...props} />,
};

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Problem Solving", href: "/problem-solving" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex w-fit items-center gap-1.5 text-sm font-semibold tracking-tight transition-opacity hover:opacity-75"
              aria-label="V Krishnan — home"
            >
              <span className="font-mono text-primary" aria-hidden="true">{"<"}</span>
              <span>V Krishnan</span>
              <span className="font-mono text-primary" aria-hidden="true">{" />"}</span>
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-2">
              {siteConfig.social.map((s) => {
                const Icon = iconMap[s.icon] ?? ExternalLink;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    aria-label={s.name}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / status */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Get in touch
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-muted-foreground">
                Open to internships · 2027
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} V Krishnan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Next.js
            </a>
            {" & "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Tailwind CSS
            </a>
            {" · Deployed on "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
