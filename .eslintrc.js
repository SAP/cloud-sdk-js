module.exports = {
  env: { node: true, jest: true },
  plugins: ['tsdoc', 'jsdoc'],
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
    }
  ],
  rules: {
    radix: 'off',
    'tsdoc/syntax': 'off',
    'valid-jsdoc': 'off',

    // TODO: The jsdoc rules should be moved to the eslint config and all of them should be enabled as errors over time.
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-syntax': 'error',
    'jsdoc/multiline-blocks': 'error',
    'jsdoc/newline-after-description': ['error', 'never'],
    'jsdoc/no-bad-blocks': 'error',
    'jsdoc/no-defaults': 'error',
    'jsdoc/no-types': 'error',
    'jsdoc/require-asterisk-prefix': 'error',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-description': ['error', { exemptedBy: ['experimental'] }],
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-jsdoc': ['warn', { publicOnly: true }],
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns': 'warn',
    'jsdoc/tag-lines': ['error', 'never']
  },
  settings: {
    jsdoc: {
      ignoreInternal: true
    }
  }
};

// requireReturn: false,
//         requireReturnType: false,
//         requireParamType: false,
//         prefer: {
//           return: 'returns'
//         }
