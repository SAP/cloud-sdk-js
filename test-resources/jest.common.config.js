module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@sap-cloud-sdk/test-util-shared/(.+)$':
      '<rootDir>/../../test-resources/test/test-util/$1.ts',
    '^@sap-cloud-sdk/test-util-shared$':
      '<rootDir>/../../test-resources/test/test-util/index.ts'
  },
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
