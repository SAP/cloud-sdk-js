const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const localPlugin = {
  rules: {
    'no-uppercase-internal-tag': {
      meta: { type: 'problem', schema: [] },
      create(context) {
        return {
          Program() {
            for (const comment of context.sourceCode.getAllComments()) {
              if (comment.value.includes('@Internal')) {
                context.report({
                  loc: comment.loc,
                  message:
                    'You are not allowed to use @Internal. Please use @internal.'
                });
              }
            }
          }
        };
      }
    }
  }
};

module.exports = defineConfig([
  {
    plugins: { local: localPlugin },
    rules: { 'local/no-uppercase-internal-tag': 'error' }
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      parser: tsParser,
      sourceType: 'module',
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
        }
      }
    },
    extends: compat.extends('@sap-cloud-sdk'),
    rules: {
      radix: 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            'Enums are weird in TypeScript. Prefer union types or const objects instead.'
        }
      ],
      'import-x/no-internal-modules': [
        'error',
        {
          allow: ['@sap-cloud-sdk/**/internal', '@sap-cloud-sdk/**/internal.js']
        }
      ]
    }
  },
  globalIgnores([
    '**/dist',
    '**/node_modules',
    '**/README.md',
    'test-packages/test-services-odata-v2',
    'test-packages/test-services-odata-v4',
    'test-packages/test-services-odata-common',
    'test-packages/test-services-openapi',
    'test-packages/test-services-e2e',
    'test-packages/e2e-tests/test/generator-test-output',
    'test-packages/memory-tests/sdk-v1/test-service',
    'test-packages/memory-tests/sdk-canary/test-service',
    'packages/rest-generator/test/test-services',
    '**/scripts/',
    'test-resources/cli/',
    'test-resources/generator/test-output',
    '**/*.js',
    '**/*.json'
  ]),
  {
    files: ['**/test/**/*', '**/*.spec.ts'],
    rules: {
      'import-x/no-internal-modules': 'off',
      'no-unused-expressions': 'off',
      'jsdoc/require-jsdoc': 'off'
    }
  },
  {
    files: ['**/index.ts'],
    rules: {
      'jsdoc/require-description-complete-sentence': 'off'
    }
  },
  {
    // avoid circular imports via destination barrel
    files: [
      'packages/connectivity/src/scp-cf/token-accessor.ts'
    ],
    rules: {
      'import-x/no-internal-modules': [
        'error',
        {
          allow: [
            '@sap-cloud-sdk/**/internal',
            '@sap-cloud-sdk/**/internal.js',
            '**/destination/build-ias-destination',
            '**/destination/ias-types',
            '**/destination/destination-service-types'
          ]
        }
      ]
    }
  }
]);
