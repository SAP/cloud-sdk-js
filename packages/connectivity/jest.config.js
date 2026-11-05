// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'connectivity',
  moduleNameMapper: {
    ...commonConfig.moduleNameMapper,
    '^\\./jks-parser\\.js$': '<rootDir>/src/http-agent/jks-parser.ts'
  }
};
