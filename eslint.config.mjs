// eslint.config.mjs (eslint.config.js)

import jsPlugin from "@eslint/js";
import globals from "globals";
//import babelParser from "@babel/eslint-parser";

const ignores = ["**/dist/**/*"];

const jsConfig = {
  files: ["**/**/*.{js,jsx}"],
  rules: {
    ...jsPlugin.configs["recommended"].rules,
    indent: ["error", 2],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": "error",
    "react/prop-types": 0,
    "linebreak-style": ["error", "unix"],
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "React",
      },
    ],
  },
  languageOptions: {
    //parser: babelParser,
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.es2021,
      ...globals.node,
      ...globals.jest,
      myCustomGlobal: "readonly",
    },
  },
};

export default [
  jsConfig,
  {
    ignores: [...ignores, "mongo.js"],
  },
];
