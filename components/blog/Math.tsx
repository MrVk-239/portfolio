import katex from "katex";

interface MathProps {
  children: string;
}

export function Math({ children }: MathProps) {
  const html = katex.renderToString(children, {
    displayMode: true,
    throwOnError: false,
    output: "html",
  });
  return (
    <div
      className="overflow-x-auto py-4 text-center"
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label={`Math: ${children}`}
    />
  );
}

export function InlineMath({ children }: MathProps) {
  const html = katex.renderToString(children, {
    displayMode: false,
    throwOnError: false,
    output: "html",
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
