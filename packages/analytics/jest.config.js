module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  globalSetup: './test/test-util/bootstrap.js',
  coverageReporters: ['text', 'cobertura', 'html'],
  coveragePathIgnorePatterns: ['dist/', 'node_modules/', 'test/'],
  reporters: ['default', 'jest-junit']
};
