module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    '../.eslintrc.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {},
  ignorePatterns: [
    '*.d.ts',
    '*.js',
  ],
};
