import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      // 기본 코드 스타일 규칙
      "indent": ["error", 2],
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "no-alert": "error",
      "no-trailing-spaces": "error",
      "curly": "error",
      "brace-style": "error",
      "no-multi-spaces": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "no-whitespace-before-property": "error",
      "func-call-spacing": "error",
      "space-before-blocks": "error",
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "comma-style": ["error", "last"],
      "comma-dangle": ["error", "always-multiline"],
      "space-in-parens": ["error", "never"],
      "block-spacing": "error",
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "key-spacing": ["error", { "mode": "strict" }],
      "arrow-spacing": ["error", { "before": true, "after": true }],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    // TypeScript 관련 추가 규칙
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-empty-function": "error",
    },
  },
];