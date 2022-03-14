module.exports = {
  env: { node: true, jest: true },
  extends: ['@sap-cloud-sdk'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: {
      extends: 'tsconfig.json',
      include: ['**/*.ts'],
      exclude: [
        '**/*.d.ts',
        '**/dist/**/*',
        '**/node_modules/**/*',
        'test-packages/test-services/**/*',
        'test-packages/test-services-e2e/**/*',
        'packages/rest-generator/test/test-services/**/*',
        'test-resources/cli/**/*',
        '**/test-output/**',
        '**/README.md'
      ]
    },
    sourceType: 'module'
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'README.md',
    'test-packages/test-services',
    'test-packages/test-services-e2e',
    'packages/rest-generator/test/test-services',
    'test-resources/cli/',
    'test-resources/generator/test-output'
  ],
  overrides: [
    {
      files: ['**/test/**/*'],
      rules: {
        'import/no-internal-modules': 'off',
        'no-unused-expressions': 'off'
      }
    },
    {
      files: ['**/index.ts'],
      rules: {
        'jsdoc/require-description-complete-sentence': 'off'
      }
    }
  ],
  rules: {
    radix: 'off'
  }
};
