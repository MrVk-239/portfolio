import { codeToHast } from "shiki";
import type { Root, Element, Text } from "hast";

function getText(node: Element): string {
  let text = "";
  for (const child of node.children) {
    if (child.type === "text") text += (child as Text).value;
    else if (child.type === "element") text += getText(child as Element);
  }
  return text;
}

type CollectedBlock = {
  parent: Root | Element;
  index: number;
  lang: string;
  code: string;
};

function collect(node: Root | Element, blocks: CollectedBlock[]) {
  if (!("children" in node)) return;
  node.children.forEach((child, i) => {
    if (child.type !== "element") return;
    const el = child as Element;
    if (el.tagName === "pre") {
      const codeEl = el.children[0] as Element | undefined;
      if (codeEl?.type === "element" && codeEl.tagName === "code") {
        const classes = (codeEl.properties?.className as string[]) ?? [];
        const langClass = classes.find(
          (c) => typeof c === "string" && c.startsWith("language-")
        );
        const lang = langClass ? langClass.slice(9) : "text";
        blocks.push({ parent: node, index: i, lang, code: getText(codeEl) });
      }
    }
    collect(el, blocks);
  });
}

export function rehypeShiki() {
  return async (tree: Root): Promise<void> => {
    const blocks: CollectedBlock[] = [];
    collect(tree, blocks);

    await Promise.all(
      blocks.map(async ({ parent, index, lang, code }) => {
        try {
          const hast = await codeToHast(code, {
            lang,
            themes: { light: "github-light", dark: "github-dark" },
          });
          const pre = hast.children[0] as Element;
          pre.properties = {
            ...pre.properties,
            "data-language": lang,
          };
          parent.children[index] = pre;
        } catch {
          // Unknown language — leave original node intact
        }
      })
    );
  };
}
