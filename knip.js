/** @type {import('knip').KnipConfig} */
export default {
  ignore: [
    // Bundled GitHub Actions (compiled single-file bundles)
    '.github/actions/*/index.js',
    // Generated test services
    'test-packages/test-services-e2e/**',
    'test-packages/test-services-odata-v2/**',
    'test-packages/test-services-odata-v4/**',
    'test-packages/test-services-openapi/**',
    // Test resources (deliberately faulty/standalone files)
    'test-resources/**',
    // Knowledge base
    'knowledge-base/**',
    // Memory tests use canary/pinned deps outside workspace management
    'test-packages/memory-tests/**',
    // Memory tests workflow references binary from canary workspace
    '.github/workflows/memory-tests.yml'
  ],
  workspaces: {
    // Root workspace — several devDeps are hoisted for sub-packages, not used directly in root source
    '.': {
      entry: ['scripts/**/*.ts'],
      ignoreDependencies: [
        '@typescript/native',
        'axios',
        'glob',
        'semver',
        'typedoc',
        'unionfs'
      ]
    },
    // eslint-config exports JS configs consumed via require(), not TS imports;
    // parser/prettier deps referenced as strings in config objects
    'packages/eslint-config': {
      entry: ['flat-config.js'],
      ignoreDependencies: [
        '@typescript-eslint/parser',
        'eslint-config-prettier',
        'eslint-plugin-prettier'
      ]
    },
    // generator treats odata-v2/v4 as optional peer deps, not direct imports
    'packages/generator': {
      ignoreDependencies: ['@sap-cloud-sdk/odata-v2', '@sap-cloud-sdk/odata-v4']
    },
    // openapi-generator treats openapi as optional peer dep
    'packages/openapi-generator': {
      ignoreDependencies: ['@sap-cloud-sdk/openapi']
    },
    // type-tests: .test-d.ts and .ts files are entry points for tsd;
    // moment used as ambient type without import statement
    'test-packages/type-tests': {
      entry: ['test/**/*.ts', 'test/**/*.test-d.ts'],
      ignoreDependencies: ['moment']
    },
    // self-tests: tsd is invoked by the test runner, not imported
    'test-packages/self-tests': {
      entry: ['madge-test/**/*.ts'],
      ignoreDependencies: ['tsd']
    },
    // e2e-tests: cap-js/sqlite loaded dynamically by CDS at runtime
    'test-packages/e2e-tests': {
      entry: ['test/**/*.ts', 'srv/**/*.js', 'test/proxy/**/*.js'],
      ignoreDependencies: ['@cap-js/sqlite']
    },
    // integration-tests: test-util-internal is used at runtime via jest setup
    'test-packages/integration-tests': {
      ignoreDependencies: ['@sap-cloud-sdk/test-util-internal']
    },
    'build-packages/check-public-api': {
      ignoreDependencies: ['memfs']
    }
  }
};
