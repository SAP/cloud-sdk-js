// eslint-disable-next-line
import commonConfig from '../../test-resources/jest.common.config.js';

export default {
  ...commonConfig,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  displayName: 'check-pr'
};
