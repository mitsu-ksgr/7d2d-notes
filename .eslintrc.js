/**
 * ESLint configration file.
 *
 * c.f.
 *  - https://eslint.org/
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-continue': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
