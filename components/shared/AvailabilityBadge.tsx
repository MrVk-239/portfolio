import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  className?: string;
}

export function AvailabilityBadge({ className }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs backdrop-blur-sm",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-muted-foreground">
        Open to{" "}
        <span className="font-medium text-foreground">
          Software Engineering Internships
        </span>
      </span>
    </span>
  );
}
