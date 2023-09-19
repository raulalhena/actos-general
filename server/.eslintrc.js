module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    // "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "indent": [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single", 
      {"allowTemplateLiterals": true}
    ],
    "quote-props": [
      "error",
      "consistent-as-needed"
    ],
    "semi": [
      "error",
      "always"
    ],
    "eqeqeq": [
      "error",
      "smart"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "array-bracket-spacing": [
      "error",
      "always"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "no-mixed-spaces-and-tabs": [
      "error",
      "smart-tabs"
    ],
    "array-bracket-newline": [
      "error", "consistent"
    ],
    "camelcase": [
      "error", 
      { 
        "properties": "never" 
      }
    ],
    "prefer-arrow-callback": "error"
  }
};
