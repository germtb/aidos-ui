import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "tsconfig.build.json",
  entry: {
    index: "src/index.ts",
    "jsx-runtime": "src/jsx-runtime.ts",
    "jsx-dev-runtime": "src/jsx-dev-runtime.ts",
    "vite-plugin-jss-debug": "src/vite-plugin-jss-debug.ts",
  },
  format: ["esm"],
  target: "es2020",
  platform: "neutral",
  dts: true,
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
