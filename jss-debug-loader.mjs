import path from "path";

/**
 * Webpack/Turbopack loader that injects component names into toClassnames() calls.
 *
 * Rewrites:
 *   toClassnames(jss)  →  toClassnames(jss, "Card")
 *
 * The component name is inferred from the filename (Card.tsx → "Card").
 */
export default function jssDebugLoader(source) {
  if (!source.includes("toClassnames(")) return source;

  const filename = path.basename(this.resourcePath, path.extname(this.resourcePath));
  const name = JSON.stringify(filename);
  const needle = "toClassnames(";
  let result = "";
  let i = 0;

  while (i < source.length) {
    const idx = source.indexOf(needle, i);
    if (idx === -1) {
      result += source.slice(i);
      break;
    }

    result += source.slice(i, idx + needle.length);
    i = idx + needle.length;

    let depth = 1;
    let j = i;
    while (j < source.length && depth > 0) {
      const ch = source[j];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      if (depth > 0) j++;
    }

    result += source.slice(i, j) + ", " + name;
    i = j;
  }

  return result;
}
