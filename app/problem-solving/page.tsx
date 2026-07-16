import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Trophy } from "lucide-react";
import { getProblemSolvingData } from "@/lib/cp-data";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { PlatformLogo } from "@/components/shared/platform-logos";
import type {
  PlatformProfile,
  IICPCResult,
  CPAward,
  CPTimelineEntry,
  ContestEntry,
  CPCertificate,
  CPSubmission,
} from "@/types";

/* ── Metadata ─────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Competitive Programming",
  description:
    "Competitive programming profile — platform ratings, IICPC™ achievements, milestones, and awards.",
  openGraph: {
    title: `Competitive Programming — ${siteConfig.name}`,
    description: "Ratings, achievements, and milestones across Codeforces, LeetCode, CodeChef, GeeksforGeeks, HackerRank, Codolio, and IICPC™.",
  },
};

/* ── Helpers ──────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
      {children}
    </p>
  );
}

function Divider({ className }: { className?: string }) {
  return <div className={cn("my-14 h-px bg-border/60", className)} />;
}

/* ── Platform strip ───────────────────────────────────────────────── */

function PlatformStrip({ p }: { p: PlatformProfile }) {
  return (
    <a
      href={p.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-6 border-l-[3px] py-6 pl-6 sm:flex-row sm:items-start sm:justify-between -mx-3 px-3 rounded-r-lg transition-colors hover:bg-muted/20"
      style={{ borderColor: p.brandColor }}
    >
      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <span style={{ color: p.brandColor }}>
            <PlatformLogo platformId={p.id} size={18} />
          </span>
          <h3 className="text-base font-bold text-foreground">{p.platform}</h3>
          {p.rank && (
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              style={{ backgroundColor: `${p.brandColor}1a`, color: p.brandColor }}
            >
              {p.rank}
            </span>
          )}
        </div>

        <p className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          @{p.handle}
          <ExternalLink size={11} className="opacity-40 group-hover:opacity-70 transition-opacity" aria-hidden="true" />
        </p>

        {p.note && (
          <p className="mt-2 text-xs text-muted-foreground/70">{p.note}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-8 shrink-0">
        {p.currentRating != null && (
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Rating
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
              {p.currentRating.toLocaleString()}
            </p>
          </div>
        )}

        {p.maxRating != null && p.maxRating !== p.currentRating && (
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Peak
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
              {p.maxRating.toLocaleString()}
            </p>
          </div>
        )}

        {p.problemsSolved != null && p.problemsSolved > 0 && (
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Solved
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
              {p.problemsSolved.toLocaleString()}
            </p>
          </div>
        )}

        {p.contestsParticipated != null && p.contestsParticipated > 0 && (
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Contests
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
              {p.contestsParticipated}
            </p>
          </div>
        )}

        {/* Always show a profile link indicator when no stats are available */}
        {p.currentRating == null &&
          p.maxRating == null &&
          (p.problemsSolved == null || p.problemsSolved === 0) &&
          (p.contestsParticipated == null || p.contestsParticipated === 0) && (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
            View profile
            <ExternalLink size={10} aria-hidden="true" />
          </span>
        )}
      </div>
    </a>
  );
}

/* ── IICPC callout ────────────────────────────────────────────────── */

function IICPCCallout({ result: r }: { result: IICPCResult }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-8 sm:p-10">
      <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-primary">
            IICPC™ {r.year}
          </p>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {r.stage}
          </h3>
          {r.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{r.description}</p>
          )}
          {r.url && (
            <a href={r.url} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-primary/80">
              View results <ExternalLink size={11} />
            </a>
          )}
          {r.certificate && (
            <a href={r.certificate} target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-primary/80">
              Certificate <ExternalLink size={11} />
            </a>
          )}
        </div>

        {r.rank != null && r.totalParticipants != null && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-muted/40 px-8 py-6 sm:min-w-[160px]">
            <span className="font-mono text-5xl font-bold tabular-nums tracking-tight text-foreground sm:text-6xl">
              {r.rank.toLocaleString()}
            </span>
            <span className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              out of {r.totalParticipants.toLocaleString()}+
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Awards list ──────────────────────────────────────────────────── */

function AwardItem({ award: a }: { award: CPAward }) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
        <Trophy size={14} className="text-primary/60" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{a.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{a.event}</p>
        {a.rank && <p className="mt-1 font-mono text-xs font-medium text-primary/80">{a.rank}</p>}
        {a.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/80">{a.description}</p>
        )}
      </div>
      {a.date && (
        <span className="ml-auto shrink-0 font-mono text-xs tabular-nums text-muted-foreground/50">
          {a.date}
        </span>
      )}
    </div>
  );
}

/* ── Timeline ─────────────────────────────────────────────────────── */

function Timeline({ entries }: { entries: CPTimelineEntry[] }) {
  const grouped = entries.reduce<Record<string, CPTimelineEntry[]>>((acc, e) => {
    const year = e.date.split("-")[0] ?? e.date;
    (acc[year] ??= []).push(e);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <div key={year} className="grid gap-6 sm:grid-cols-[60px_1fr]">
          <div className="pt-1">
            <span className="font-mono text-sm font-bold tabular-nums text-muted-foreground/60">
              {year}
            </span>
          </div>
          <div className="relative space-y-6">
            {grouped[year].length > 1 && (
              <div aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />
            )}
            {grouped[year].map((entry, i) => (
              <div key={i} className="relative flex items-start gap-5">
                <div
                  className={cn(
                    "relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 bg-background",
                    entry.highlight ? "border-primary bg-primary/10" : "border-border",
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0 pb-1">
                  {entry.url ? (
                    <a href={entry.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-start gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
                      {entry.event}
                      <ExternalLink size={11} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{entry.event}</p>
                  )}
                  {entry.detail && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{entry.detail}</p>
                  )}
                  {entry.platform && (
                    <span className="mt-1.5 inline-block rounded-full border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {entry.platform}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Contest row ──────────────────────────────────────────────────── */

function ContestRow({ contest: c }: { contest: ContestEntry }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 py-4 first:pt-0 last:pb-0">
      <div className="min-w-[180px] flex-1">
        {c.url ? (
          <a href={c.url} target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            {c.name}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground">{c.name}</p>
        )}
        <p className="text-xs text-muted-foreground">{c.platform} · {c.date}</p>
      </div>
      {c.rank != null && (
        <p className="font-mono text-sm font-semibold tabular-nums text-foreground">
          #{c.rank.toLocaleString()}
          {c.outOf != null && (
            <span className="font-normal text-muted-foreground"> / {c.outOf.toLocaleString()}</span>
          )}
        </p>
      )}
      {c.ratingChange != null && (
        <span className={cn(
          "font-mono text-xs font-semibold tabular-nums",
          c.ratingChange > 0 ? "text-emerald-500" : "text-red-400",
        )}>
          {c.ratingChange > 0 ? "+" : ""}{c.ratingChange}
        </span>
      )}
      {c.screenshotUrl && (
        <a href={c.screenshotUrl} target="_blank" rel="noopener noreferrer"
          aria-label="View rank screenshot"
          className="ml-auto text-muted-foreground/40 transition-colors hover:text-muted-foreground">
          <ExternalLink size={11} />
        </a>
      )}
    </div>
  );
}

/* ── Submission item ──────────────────────────────────────────────── */

function SubmissionItem({ s }: { s: CPSubmission }) {
  const difficultyColor: Record<string, string> = {
    Easy: "text-emerald-500",
    Medium: "text-amber-500",
    Hard: "text-red-400",
  };

  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {s.problemUrl ? (
            <a href={s.problemUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              {s.problemName}
            </a>
          ) : (
            <p className="text-sm font-medium text-foreground">{s.problemName}</p>
          )}
          {s.difficulty && (
            <span className={cn("font-mono text-xs font-semibold", difficultyColor[s.difficulty] ?? "text-muted-foreground")}>
              {s.difficulty}
            </span>
          )}
          <span className="rounded-full border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {s.platform}
          </span>
        </div>
        {s.notes && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.notes}</p>
        )}
        {s.tags && s.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {s.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {s.submissionUrl && (
        <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer"
          className="shrink-0 text-xs text-primary transition-colors hover:text-primary/80">
          Submission
        </a>
      )}
    </div>
  );
}

/* ── Certificate item ─────────────────────────────────────────────── */

function CertificateItem({ cert: c }: { cert: CPCertificate }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-foreground">{c.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{c.issuer}</p>
      </div>
      <div className="shrink-0 text-right">
        {c.date && (
          <p className="font-mono text-xs tabular-nums text-muted-foreground/60">{c.date}</p>
        )}
        {c.credentialUrl && (
          <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer"
            className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80">
            Verify <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default async function ProblemSolvingPage() {
  const { overview, platforms, iicpc, awards, timeline, contests, certificates, submissions } =
    await getProblemSolvingData();

  const featuredPlatforms = platforms.filter((p) => p.featured);
  const hasContests = contests.length > 0;
  const hasCertificates = certificates.length > 0;
  const hasSubmissions = (submissions?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">

      <Link href="/" className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft size={14} /> Home
      </Link>

      <header className="mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
          Competitive Programming
        </p>
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ratings &amp; Achievements
        </h1>

        <div className="grid grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4">
          <div>
            <p className="font-mono text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
              {overview.totalProblemsSolved.toLocaleString()}+
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Problems Solved
            </p>
          </div>
          <div>
            <p className="font-mono text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
              {platforms.length}
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Platforms
            </p>
          </div>
          <div>
            <p className="font-mono text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
              {overview.contestsParticipated}+
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Contests
            </p>
          </div>
          {iicpc[0]?.rank != null && (
            <div>
              <p className="font-mono text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
                {iicpc[0].rank}
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                IICPC™ Rank
              </p>
            </div>
          )}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {overview.tagline}
        </p>
      </header>

      <section aria-label="Platform profiles">
        <SectionLabel>Platform Profiles</SectionLabel>
        <div className="space-y-1 divide-y divide-border/60">
          {platforms.map((p) => (
            <PlatformStrip key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Divider />

      {iicpc.length > 0 && (
        <section aria-label="IICPC results">
          <SectionLabel>IICPC™ Results</SectionLabel>
          <div className="space-y-4">
            {iicpc.map((r) => (
              <IICPCCallout key={r.id} result={r} />
            ))}
          </div>
        </section>
      )}

      {iicpc.length > 0 && <Divider />}

      {awards.length > 0 && (
        <section aria-label="Awards and recognition">
          <SectionLabel>Awards &amp; Recognition</SectionLabel>
          <div className="divide-y divide-border/60">
            {awards.map((a) => (
              <AwardItem key={a.id} award={a} />
            ))}
          </div>
        </section>
      )}

      {awards.length > 0 && <Divider />}

      {timeline.length > 0 && (
        <section aria-label="Milestones">
          <SectionLabel>Milestones</SectionLabel>
          <Timeline entries={timeline} />
        </section>
      )}

      {hasContests && (
        <>
          <Divider />
          <section aria-label="Contest history">
            <SectionLabel>Contest History</SectionLabel>
            <div className="divide-y divide-border/60">
              {contests.map((c) => (
                <ContestRow key={c.id} contest={c} />
              ))}
            </div>
          </section>
        </>
      )}

      {hasCertificates && (
        <>
          <Divider />
          <section aria-label="Certificates">
            <SectionLabel>Certificates</SectionLabel>
            <div className="divide-y divide-border/60">
              {certificates.map((c) => (
                <CertificateItem key={c.id} cert={c} />
              ))}
            </div>
          </section>
        </>
      )}

      {hasSubmissions && (
        <>
          <Divider />
          <section aria-label="Notable submissions">
            <SectionLabel>Notable Submissions</SectionLabel>
            <div className="divide-y divide-border/60">
              {submissions!.map((s) => (
                <SubmissionItem key={s.id} s={s} />
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
}
