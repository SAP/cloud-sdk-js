// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'nightly-tests',
  setupFilesAfterEnv: ['jest-extended']
};
