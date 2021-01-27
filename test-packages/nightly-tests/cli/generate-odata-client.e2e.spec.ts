/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { testDir } from '../../../test-resources/cli';

jest.mock('cli-ux', () => ({
      confirm: jest.fn().mockResolvedValue(true)
}));
jest.retryTimes(3);

import {resolve} from 'path';
import fs from 'fs-extra';
import GenerateODataClient from '@sap-cloud-sdk/cli/src/commands/generate-odata-client';
import {
  deleteAsync,
  getTestOutputDir,
  TimeThresholds
} from '@sap-cloud-sdk/cli/test/test-utils';

describe('generate-odata-client', () => {
  const pathForTests = getTestOutputDir(__filename);

  beforeAll(async () => {
    await deleteAsync(pathForTests, 6);
    const pathForResources = resolve(
      testDir,
      'resources',
      'template-generator-odata-client'
    );
    await fs.copy(pathForResources, pathForTests);
  }, TimeThresholds.LONG);

  test(
    '[E2E] should generate a OData client',
    async () => {
      const result = await GenerateODataClient.run([
        '-i',
        'edmxSource',
        '-o',
        'output',
        '--projectDir',
        pathForTests
      ]);
      expect(result.exitCode).toBe(0);

      const files = await fs.readdir(resolve(pathForTests, 'output'));
      expect(files).toHaveLength(1);
    },
    TimeThresholds.LONG
  );
});
