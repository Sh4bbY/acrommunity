module.exports = {
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
  },
};
