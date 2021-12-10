module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest", "@typescript-eslint"],
  rules: {
    "no-console": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-explicit-an": "off",
    "no-restricted-globals": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-plusplus": "off",
    "default-case": "off",
    "no-useless-escape": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
      },
    ],
    "import/prefer-default-export": "off",
  },
};
