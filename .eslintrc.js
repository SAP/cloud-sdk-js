module.exports = {
  env: { node: true, jest: true },
  plugins: ['eslint-plugin-tsdoc'],
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
    'test-resources/cli/'
  ],
  overrides: [
    {
      files: ['**/test/**/*'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ],
  rules: {
    radix: 'off',
    'tsdoc/syntax': 'error',
    'import/no-internal-modules': [
      'error',
      {
        allow: ['@sap-cloud-sdk/**/*']
      }
    ]
  }
};
