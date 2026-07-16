"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
} as const;

const variantStyles = {
  primary: "btn-primary",
  secondary: [
    "border border-border text-foreground",
    "hover:bg-accent hover:border-border/80",
    "transition-colors",
  ].join(" "),
  ghost: "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
} as const;

interface ButtonProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  className,
  onClick,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeStyles[size],
    variantStyles[variant],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
