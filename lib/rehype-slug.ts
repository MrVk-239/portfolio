import type { Root, Element, Text } from "hast";

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function getText(node: Element): string {
  let text = "";
  for (const child of node.children) {
    if (child.type === "text") text += (child as Text).value;
    else if (child.type === "element") text += getText(child as Element);
  }
  return text;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function visit(node: Root | Element, seen: Map<string, number>) {
  if (!("children" in node)) return;
  for (const child of node.children) {
    if (child.type !== "element") continue;
    const el = child as Element;
    if (HEADING_TAGS.has(el.tagName) && !el.properties?.id) {
      const base = slugify(getText(el));
      const count = seen.get(base) ?? 0;
      const id = count === 0 ? base : `${base}-${count}`;
      seen.set(base, count + 1);
      el.properties = { ...el.properties, id };
    }
    visit(el, seen);
  }
}

export function rehypeSlug() {
  return (tree: Root) => {
    visit(tree, new Map());
  };
}
