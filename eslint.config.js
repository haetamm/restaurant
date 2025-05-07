const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-plugin-prettier");

module.exports = tseslint.config(
  // 1. File TypeScript (*.ts)
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      "plugin:prettier/recommended",
    ],
    plugins: { prettier },
    processor: angular.processInlineTemplates,
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          trailingComma: "es5",
          singleQuote: false,
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          bracketSpacing: true,
          arrowParens: "avoid",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
    },
  },
  // 2. File HTML (*.html)
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      "plugin:prettier/recommended",
    ],
    plugins: { prettier },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          trailingComma: "es5",
          singleQuote: false,
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          bracketSpacing: true,
          arrowParens: "avoid",
        },
      ],
    },
  },
  // 3. File JavaScript (*.js)
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended, "plugin:prettier/recommended"],
    plugins: { prettier },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          trailingComma: "es5",
          singleQuote: false,
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          bracketSpacing: true,
          arrowParens: "avoid",
        },
      ],
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "no-console": "warn",
    },
  },
);
