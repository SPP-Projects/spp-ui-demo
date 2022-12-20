module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  //TODO - SPP PROD
  // rules: {
  //   "no-console": "off",
  //   "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  //   "prettier/prettier": [
  //     "error",
  //     {
  //       endOfLine: "auto",
  //     },
  //   ],
  //
  //   "@typescript-eslint/no-explicit-any": "off",
  // },
  //TODO - SPP PROD
};
