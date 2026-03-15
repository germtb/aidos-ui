import path from "path";

/**
 * Vite plugin that enables JSS debug tooling:
 *
 * 1. Injects component names into toClassnames() calls so they appear as CSS classes.
 *    toClassnames(jss) → toClassnames(jss, "Card")
 *
 * 2. Configures the custom JSX dev runtime that injects <!-- ComponentName -->
 *    HTML comments at component boundaries (same approach as the Next.js setup).
 *
 * Usage in vite.config.ts:
 *   import jssDebug from "aidos-ui/vite-plugin-jss-debug";
 *   export default defineConfig({ plugins: [jssDebug()] });
 */
export default function jssDebug() {
  return [
    {
      name: "jss-debug-jsx",
      config() {
        return {
          esbuild: {
            jsx: "automatic",
            jsxDev: true,
            jsxImportSource: "aidos-ui",
          },
        };
      },
    },
    {
      name: "jss-debug-classnames",
      enforce: "pre" as const,

      transform(code: string, id: string) {
        if (id.includes("node_modules")) return;
        if (!id.match(/\.[jt]sx?$/)) return;
        if (!code.includes("toClassnames(")) return;

        const filename = path.basename(id, path.extname(id));
        const name = JSON.stringify(filename);
        const needle = "toClassnames(";
        let result = "";
        let i = 0;

        while (i < code.length) {
          const idx = code.indexOf(needle, i);
          if (idx === -1) {
            result += code.slice(i);
            break;
          }

          // Copy everything up to and including "toClassnames("
          result += code.slice(i, idx + needle.length);
          i = idx + needle.length;

          // Track parens to find the matching closing )
          let depth = 1;
          let j = i;
          while (j < code.length && depth > 0) {
            const ch = code[j];
            if (ch === "(") depth++;
            else if (ch === ")") depth--;
            if (depth > 0) j++;
          }

          // Copy the original arguments, then inject the component name
          result += code.slice(i, j) + ", " + name;
          i = j;
        }

        return { code: result, map: null };
      },
    },
  ];
}
