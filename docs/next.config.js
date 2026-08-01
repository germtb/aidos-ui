// next.config.js

import mdx from "@next/mdx";
import { fileURLToPath } from "node:url";

const textComponentChildrenPlugin = fileURLToPath(
  new URL("./remark-text-component-children.mjs", import.meta.url),
);

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm", textComponentChildrenPlugin],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.resolve.alias["aidos-ui-jsx/jsx-dev-runtime"] = fileURLToPath(
      new URL("../src/jsx-dev-runtime.ts", import.meta.url),
    );
    config.resolve.alias["aidos-ui-jsx/jsx-runtime"] = fileURLToPath(
      new URL("../src/jsx-runtime.ts", import.meta.url),
    );
    return config;
  },
  turbopack: {
    rules: {
      "*.tsx": {
        loaders: [{ loader: "./jss-debug-loader.mjs" }],
        as: "*.tsx",
      },
    },
    resolveAlias: {
      "aidos-ui-jsx/jsx-dev-runtime": "../src/jsx-dev-runtime.ts",
      "aidos-ui-jsx/jsx-runtime": "../src/jsx-runtime.ts",
    },
  },
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
