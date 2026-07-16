"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  "data-language"?: string;
  [key: string]: unknown;
}

export function CodeBlock({
  children,
  className,
  "data-language": language,
  ...rest
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      {language && (
        <span className="absolute top-3 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 select-none">
          {language}
        </span>
      )}
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className={cn(
          "absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-md",
          "border border-border/50 bg-card/80 backdrop-blur-sm",
          "text-muted-foreground transition-all duration-150",
          "opacity-0 group-hover:opacity-100 hover:text-foreground hover:border-border"
        )}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-xl border border-border/60 p-4 text-sm leading-relaxed",
          language && "pt-8",
          className
        )}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
