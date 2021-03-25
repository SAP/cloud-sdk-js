// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'cli',
  testRunner: 'jest-circus/runner',
  testPathIgnorePatterns: ['/test/test-output/','/test/nest','/test/express'],
  setupFilesAfterEnv: ['jest-extended']
};
