/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  globalSetup: '<rootDir>/../../test-resources/bootstrap-global.js',
  setupFiles: ['<rootDir>/../../test-resources/bootstrap-test.js'],
  coverageReporters: ['text', 'cobertura', 'html'],
  coveragePathIgnorePatterns: ['dist/', 'node_modules/', 'test/'],
  reporters: ['default', 'jest-junit']
};
