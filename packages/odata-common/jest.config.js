// eslint-disable-next-line
const commonConfig = require('../../test-resources/jest.common.config');
module.exports = {
  ...commonConfig,
  displayName: 'odata-common',
  moduleNameMapper: {
    '^@sap-cloud-sdk/test-services-odata-common/(.*)':
      '<rootDir>/../../test-packages/test-services-odata-common/$1'
  }
};
