import { siteConfig } from "@/data/site";
import { education, type Education } from "@/data/education";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";

/* ── Education item ─────────────────────────────────────────────── */
// Compact — institution, degree, years, grade only.
// Intentionally plain: supporting information, not a feature.

function EducationItem({ item }: { item: Education }) {
  const years =
    item.startYear && item.endYear
      ? `${item.startYear}–${item.endYear}`
      : item.year?.toString() ?? "";

  const degreeLabel = item.field
    ? `${item.degree} · ${item.field}`
    : item.board
      ? `${item.degree} · ${item.board}`
      : item.degree;

  const grade = item.cgpa
    ? `CGPA ${item.cgpa}`
    : item.percentage != null
      ? `${item.percentage}%`
      : null;

  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          {item.institution}
        </p>
        <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
          {years}
        </span>
      </div>
      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
        {degreeLabel}
      </p>
      {grade && (
        <p className="mt-0.5 text-xs font-medium text-primary">{grade}</p>
      )}
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      className="border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="About" title="What Drives Me" />

        {/*
          Two-column only on lg+.
          On mobile and tablet, narrative is full-width so it gets maximum
          reading width — education appears below as secondary context.
        */}
        <div className="mt-12 flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">

          {/* ── Narrative — primary ──────────────────────────── */}
          <div className="space-y-5">
            {siteConfig.about.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* ── Education — supporting ────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Education
            </p>
            <div className="divide-y divide-border/60">
              {education.map((item, i) => (
                <EducationItem key={i} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
