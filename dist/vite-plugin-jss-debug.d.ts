/**
 * Vite plugin that injects component names into toClassnames() calls.
 *
 * In dev mode, rewrites:
 *   toClassnames(jss)  →  toClassnames(jss, "Card")
 *
 * The component name is inferred from the filename (Card.tsx → "Card").
 * Only transforms files that contain "toClassnames(" to avoid unnecessary work.
 *
 * Usage in vite.config.ts:
 *   import jssDebug from "aidos-ui/vite-plugin-jss-debug";
 *   export default defineConfig({ plugins: [jssDebug()] });
 */
export default function jssDebug(): {
    name: string;
    enforce: "pre";
    transform(code: string, id: string): {
        code: string;
        map: any;
    };
};
