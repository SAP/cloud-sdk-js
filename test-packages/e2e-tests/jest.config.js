// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'e2e-tests',
  // E2E tests make real HTTP calls, don't use the unit-test-setup
  // which includes nock that interferes with real requests
  setupFilesAfterEnv: []
};
