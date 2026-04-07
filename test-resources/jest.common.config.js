module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  globalSetup: '<rootDir>/../../test-resources/bootstrap-global.js',
  setupFiles: ['<rootDir>/../../test-resources/bootstrap-test.js'],
  setupFilesAfterEnv: [
    '<rootDir>/../../test-resources/unit-test-setup.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(\\.pnpm/.+/node_modules/)?@sap-cloud-sdk/test-services-)'
  ],
  coverageReporters: ['text', 'cobertura', 'html'],
  coveragePathIgnorePatterns: ['dist/', 'node_modules/', 'test/', '.*.spec.ts'],
  reporters: ['default', 'jest-junit'],
  prettierPath: null
};
