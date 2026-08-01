import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "jsx-a11y/aria-proptypes": "error",
      "prefer-const": "error",
      "react/display-name": "error",
      // These APIs intentionally pass or initialize ref-backed values during
      // render. The compiler-oriented rule rejects those public patterns even
      // though they do not mutate DOM state during render.
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "error",
    },
  },
  globalIgnores(["dist/**", "docs/.next/**"]),
]);
