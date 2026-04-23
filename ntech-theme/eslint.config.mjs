import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**"
    ]
  },

  js.configs.recommended,

  // Node Config Files
  {
    files: ["*.config.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
    },
  },

  // Browser (React App)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["**/*.d.ts"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/*.d.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // React
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-restricted-imports": [
        "error",
        {
          "patterns": [{ "regex": "^@mui/[^/]+$" }]
        }
      ]
    },
  },
];
