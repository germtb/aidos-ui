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
export default function jssDebug(): ({
    name: string;
    config(_config: unknown, { command }: {
        command: string;
    }): {
        oxc: {
            jsx: {
                runtime: string;
                development: boolean;
                importSource: string;
            };
        };
    };
    enforce?: undefined;
    transform?: undefined;
} | {
    name: string;
    enforce: "pre";
    transform(code: string, id: string): {
        code: string;
        map: any;
    };
    config?: undefined;
})[];
