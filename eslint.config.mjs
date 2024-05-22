// eslint.config.js

import jsPlugin from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";

const ignores = ["**/dist/**/*"];

const jsConfig = {
  //files: ["**/**/*.{js,jsx}"],
  //files: ["**/**/*.jsx"],
  files: ["**/**/*.js"],
  rules: {
    ...jsPlugin.configs["recommended"].rules,
    indent: ["error", 2],
    eqeqeq: "error",
    "no-console": 0,
    "react/prop-types": 0,
  },
  languageOptions: {
    //parser: babelParser,
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.es2021,
      ...globals.node,
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

/*

import jsdoc from "eslint-plugin-jsdoc";
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["./server/*.js"],
    plugins: {
      jsdoc: jsdoc,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        myCustomGlobal: "readonly",
      },
    },
    rules: {
      semi: ["warn", "always"],
      "no-unused-vars": "warn",
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
    },
    ignores: ["./dist"],
  },
];

*/
