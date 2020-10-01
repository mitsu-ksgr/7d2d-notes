/**
 * Jest configration file.
 *
 * c.f.
 *  - https://jestjs.io/docs/ja/configuration
 *  - https://vue-test-utils.vuejs.org/ja/guides/
 */

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!.eslintrc.js',
    '!*.config.js',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
