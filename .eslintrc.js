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
        'test-packages/test-services*/**/*',
        'test-packages/test-services-e2e/**/*',
        'test-packages/memory-tests/sdk-v1/test-service/*',
        'test-packages/memory-tests/sdk-canary/test-service/*',
        'build-packages/check-pr/lib/**',
        'build-packages/get-changelog/lib/**',
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
    'test-packages/test-services-odata-v2',
    'test-packages/test-services-odata-v4',
    'test-packages/test-services-odata-common',
    'test-packages/test-services-openapi',
    'test-packages/test-services-e2e',
    'test-packages/e2e-tests/test/generator-test-output',
    'test-packages/memory-tests/sdk-v1/test-service',
    'test-packages/memory-tests/sdk-canary/test-service',
    'packages/rest-generator/test/test-services',
    'scripts/',
    'test-resources/cli/',
    'test-resources/generator/test-output'
  ],
  overrides: [
    {
      files: ['**/test/**/*'],
      rules: {
        'import/no-internal-modules': 'off',
        'no-unused-expressions': 'off',
        'jsdoc/require-jsdoc': 'off'
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
    radix: 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message:
          'Enums are weird in TypeScript. Prefer union types or const objects instead.'
      }
    ]
  }
};
