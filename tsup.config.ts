import { defineConfig } from "tsup";
import icons from "./src/icons/data/all.json";

const entry = {
  index: "src/index.ts",
  "icons/index": "src/icons/index.ts",
  "jsx-runtime": "src/jsx-runtime.ts",
  "jsx-dev-runtime": "src/jsx-dev-runtime.ts",
  "vite-plugin-jss-debug": "src/vite-plugin-jss-debug.ts",
};

export default defineConfig({
  tsconfig: "tsconfig.build.json",
  entry: {
    ...entry,
    ...Object.fromEntries(
      Object.keys(icons).map((name) => [
        `icons/${name}`,
        `.cache/icons/${name}.js`,
      ]),
    ),
  },
  format: ["esm"],
  target: "es2020",
  platform: "neutral",
  // Side-effect-only icon entries share icons/index.d.ts.
  dts: { entry },
  sourcemap: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: [
    "node:path",
    "react",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
  ],
});
