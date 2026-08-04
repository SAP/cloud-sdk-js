module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: ['workspace']
  },
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  globalSetup: '<rootDir>/../../test-resources/bootstrap-global.js',
  setupFiles: ['<rootDir>/../../test-resources/bootstrap-test.js'],
  setupFilesAfterEnv: [
    '<rootDir>/../../test-resources/unit-test-setup.js'
  ],
  coverageReporters: ['text', 'cobertura', 'html'],
  coveragePathIgnorePatterns: ['dist/', 'node_modules/', 'test/', '.*.spec.ts'],
  reporters: ['default', 'jest-junit'],
  prettierPath: null
};
