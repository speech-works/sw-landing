import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Flag em/en dashes in copy as you type (strings, JSX text, template
    // literals). Comments are covered by scripts/check-no-dashes.mjs instead.
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/[–—]/]",
          message:
            "Avoid em/en dashes in copy. Use a hyphen (-), comma, colon, or period instead.",
        },
        {
          selector: "JSXText[value=/[–—]/]",
          message:
            "Avoid em/en dashes in copy. Use a hyphen (-), comma, colon, or period instead.",
        },
        {
          selector: "TemplateElement[value.raw=/[–—]/]",
          message:
            "Avoid em/en dashes in copy. Use a hyphen (-), comma, colon, or period instead.",
        },
      ],
    },
  },
];

export default eslintConfig;
