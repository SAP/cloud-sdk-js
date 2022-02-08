// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'generator-common',
  setupFilesAfterEnv: ['jest-extended/all']
};
