import { cn } from "@/lib/utils";
import { Info, AlertTriangle, XCircle, Lightbulb } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<
  CalloutType,
  { icon: React.ElementType; className: string; defaultTitle: string }
> = {
  info: {
    icon: Info,
    className:
      "border-blue-500/30 bg-blue-500/5 [&_svg]:text-blue-500 [&_.callout-title]:text-blue-700 dark:[&_.callout-title]:text-blue-400",
    defaultTitle: "Note",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-amber-500/30 bg-amber-500/5 [&_svg]:text-amber-500 [&_.callout-title]:text-amber-700 dark:[&_.callout-title]:text-amber-400",
    defaultTitle: "Warning",
  },
  error: {
    icon: XCircle,
    className:
      "border-red-500/30 bg-red-500/5 [&_svg]:text-red-500 [&_.callout-title]:text-red-700 dark:[&_.callout-title]:text-red-400",
    defaultTitle: "Important",
  },
  tip: {
    icon: Lightbulb,
    className:
      "border-emerald-500/30 bg-emerald-500/5 [&_svg]:text-emerald-500 [&_.callout-title]:text-emerald-700 dark:[&_.callout-title]:text-emerald-400",
    defaultTitle: "Tip",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, className, defaultTitle } = config[type];
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed",
        className
      )}
      role={type === "error" ? "alert" : undefined}
    >
      <Icon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="callout-title mb-1 font-semibold">
          {title ?? defaultTitle}
        </p>
        <div className="text-muted-foreground [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}
