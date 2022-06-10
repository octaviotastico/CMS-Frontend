module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/react",
    "airbnb/base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    "import/prefer-default-export": "off",
    "react/prop-types": 0,
    "react/no-danger": 0,
    "no-plusplus": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
    "no-param-reassign": "off",
    "comma-dangle": ["off", "always-multiline"],
    quotes: [2, "double"],
    "import/extensions": ["off", "never"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
};
