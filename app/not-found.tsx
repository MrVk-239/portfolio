import type { Metadata } from "next";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, var(--primary-glow), transparent 75%)",
        }}
      />

      {/* Decorative watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none font-mono text-[140px] font-bold leading-none tracking-tighter text-foreground/[0.05] sm:text-[200px]"
      >
        404
      </span>

      {/* Content */}
      <div className="relative -mt-6 flex flex-col items-center gap-6 sm:-mt-10">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
            Not Found
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Page doesn&apos;t exist
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            The URL you&apos;re looking for may have moved or never existed.
            Navigate from the home page to find what you need.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="md">
            <Home size={14} aria-hidden="true" />
            Go Home
          </Button>
          <Button href="/projects" variant="secondary" size="md">
            View Projects
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
