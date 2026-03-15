// next.config.js

import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.tsx": {
        loaders: [{ loader: "./jss-debug-loader.mjs" }],
        as: "*.tsx",
      },
    },
    resolveAlias: {
      "aidos-ui-jsx/jsx-dev-runtime": "./src/jsx-dev-runtime.ts",
      "aidos-ui-jsx/jsx-runtime": "./src/jsx-runtime.ts",
    },
  },
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
