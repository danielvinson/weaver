module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:@typescript-eslint/all",
    "plugin:functional/recommended",
    "prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "functional",
    "prettier",
    "react",
    "react-hooks",
    "sort-imports-es6-autofix",
    "sort-keys-fix",
    "sort-destructure-keys",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "no-unused-vars": "off",
    // TypeScript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "varsIgnorePattern": "^_" }], // _ is legal for unused
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    // Sorting
    "sort-imports-es6-autofix/sort-imports-es6": "warn",
    "sort-keys-fix/sort-keys-fix": ["warn", "asc", { natural: true }],
    "sort-destructure-keys/sort-destructure-keys": "error",
    // Functional
    "functional/functional-parameters": "off",
    "functional/no-conditional-statement": "off",
    "functional/no-expression-statement": "off",
    "functional/no-mixed-type": "off",
    "functional/no-return-void": "off",
    "functional/no-throw-statement": "off",
    "functional/no-try-statement": "off",
    "functional/prefer-type-literal": "off",
    "functional/prefer-readonly-type": "off",
  },
};
