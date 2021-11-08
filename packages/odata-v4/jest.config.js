// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'odata-v4',
  setupFilesAfterEnv: ['jest-extended/all']
};
