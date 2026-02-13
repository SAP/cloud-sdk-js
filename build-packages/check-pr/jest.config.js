// eslint-disable-next-line
import commonConfig from '../../test-resources/jest.common.config';
export default {
  ...commonConfig,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: path.resolve(import.meta.dirname, 'tsconfig.test.json')
      }
    ]
  },
  displayName: 'check-pr'
};
