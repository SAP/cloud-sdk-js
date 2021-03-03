// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'nightly-tests',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['jest-extended']
};
