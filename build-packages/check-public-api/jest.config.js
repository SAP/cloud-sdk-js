// eslint-disable-next-line
import commonConfig from '../../test-resources/jest.common.config.js';

export default {
  ...commonConfig,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  displayName: 'check-public-api'
};
