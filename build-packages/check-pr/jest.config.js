// eslint-disable-next-line
import commonConfig from '../../test-resources/jest.common.config.js';

export default {
  ...commonConfig,
  preset: 'ts-jest/presets/default-esm',

  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
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
