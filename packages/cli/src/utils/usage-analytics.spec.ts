/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const confirm = jest.fn().mockResolvedValue(false);
jest.mock('cli-ux', () => {
  // Mocking needs to happen before the command is imported
  const cli = jest.requireActual('cli-ux');
  return {
    ...cli,
    confirm
  };
});

import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { usageAnalytics } from './usage-analytics';


import { resolve } from 'path';
import fs from 'fs-extra';

const testOutputDir = getTestOutputDir(__filename);

async function readConsentFile(projectDir: string) {
  const filePath = resolve(projectDir, 'sap-cloud-sdk-analytics.json');
  return fs
    .readFile(filePath, { encoding: 'utf8' })
    .then(value => JSON.parse(value));
}

describe('Usage Analytics Utils', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.EXTRA_SHORT);

  it(
    'Create usage analytics consent file',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'usage-analytics'
      );

      await usageAnalytics(projectDir, true);
      expect((await readConsentFile(projectDir)).enabled).toBe(true);

      await usageAnalytics(projectDir, true, 'TEST');
      expect(await readConsentFile(projectDir)).toEqual({
        enabled: true,
        salt: 'TEST'
      });

      await usageAnalytics(projectDir, undefined);
      expect((await readConsentFile(projectDir)).enabled).toBe(false);

      await usageAnalytics(projectDir, false);
      expect((await readConsentFile(projectDir)).enabled).toBe(false);
    },
    TimeThresholds.EXTRA_SHORT
  );
});
