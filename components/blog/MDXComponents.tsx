import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Math, InlineMath } from "./Math";

function AnchorLink({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      className="ml-2 opacity-0 group-hover:opacity-60 hover:!opacity-100 text-muted-foreground transition-opacity"
      aria-label="Link to section"
    >
      #
    </a>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mdxComponents = {
  // ---- Headings -----------------------------------------------------------
  h2: ({ children, id, ...props }: any) => (
    <h2
      id={id}
      className="group mt-12 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
      {id && <AnchorLink id={id} />}
    </h2>
  ),
  h3: ({ children, id, ...props }: any) => (
    <h3
      id={id}
      className="group mt-8 mb-3 scroll-mt-24 text-base font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
      {id && <AnchorLink id={id} />}
    </h3>
  ),
  h4: ({ children, id, ...props }: any) => (
    <h4
      id={id}
      className="group mt-6 mb-2 scroll-mt-24 text-sm font-semibold uppercase tracking-wider text-muted-foreground"
      {...props}
    >
      {children}
    </h4>
  ),

  // ---- Paragraphs & inline -----------------------------------------------
  p: ({ children, ...props }: any) => (
    <p
      className="mb-5 leading-7 text-muted-foreground [&:has(img)]:text-center"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:no-underline"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-primary underline underline-offset-2 hover:no-underline"
        {...props}
      >
        {children}
      </Link>
    );
  },
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic text-muted-foreground" {...props}>
      {children}
    </em>
  ),

  // ---- Lists --------------------------------------------------------------
  ul: ({ children, ...props }: any) => (
    <ul
      className="mb-5 list-disc space-y-1.5 pl-6 text-muted-foreground marker:text-muted-foreground/50"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol
      className="mb-5 list-decimal space-y-1.5 pl-6 text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // ---- Code ---------------------------------------------------------------
  pre: (props: any) => <CodeBlock {...props} />,
  code: ({ children, className, ...props }: any) => {
    // Inline code (no className from lang)
    if (!className) {
      return (
        <code
          className="rounded-md border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.8em] text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={cn("font-mono text-sm leading-relaxed", className)} {...props}>
        {children}
      </code>
    );
  },

  // ---- Blockquote ---------------------------------------------------------
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="my-6 border-l-2 border-primary/40 pl-5 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // ---- Tables -------------------------------------------------------------
  table: ({ children, ...props }: any) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="border-b border-border/60 bg-muted/40" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody className="divide-y divide-border/40" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => (
    <th
      className="px-4 py-3 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="px-4 py-3 text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),

  // ---- Divider ------------------------------------------------------------
  hr: (props: any) => (
    <hr className="my-10 border-border/60" {...props} />
  ),

  // ---- Custom components (available in MDX files) -------------------------
  Callout,
  Math,
  InlineMath,
};
