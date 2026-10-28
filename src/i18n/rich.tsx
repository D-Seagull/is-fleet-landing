import { Fragment, type ReactNode } from "react";

const TOKEN = /<(\w+)>(.*?)<\/\1>|<br\s*\/?>/g;

/**
 * Renders the little markup translations carry — `<br/>` and `<tag>text</tag>` (not nested) — with
 * React elements, so a translator can move the accented word or the bold lead where the language
 * needs it: rich("to <accent>control</accent>", { accent: (c) => <span>{c}</span> }).
 * Works in server and client components alike.
 */
export function rich(text: string, tags: Record<string, (chunk: string) => ReactNode> = {}): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, tag, chunk] = m;
    const render = tag ? tags[tag] : undefined;
    out.push(tag ? (render ? render(chunk) : chunk) : <br />);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}
