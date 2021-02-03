/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
jest.retryTimes(3);

import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '@sap-cloud-sdk/cli/test/test-utils';
import { buildScaffold } from '@sap-cloud-sdk/cli/src/utils';

const testOutputDir = getTestOutputDir(__filename);

describe('Scaffold Utils', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 6);
  }, TimeThresholds.LONG);

  test(
    'should build the scaffold',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'build-scaffold'
      );

      await buildScaffold(projectDir, false, false);
    },
    TimeThresholds.LONG
  );
});
