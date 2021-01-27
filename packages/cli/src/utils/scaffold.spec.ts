/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { testDir } from '../../../../test-resources/cli';

const confirm = jest.fn().mockResolvedValue(true);
jest.mock('cli-ux', () => {
  // Mocking needs to happen before the command is imported
  const cli = jest.requireActual('cli-ux');
  return {
    ...cli,
    ...cli.ux,
    confirm
  };
});
jest.retryTimes(3);

import { resolve } from 'path';
import fs from 'fs-extra';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { shouldBuildScaffold } from './scaffold';

const testOutputDir = getTestOutputDir(__filename);

describe('Scaffold Utils', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 6);
  }, TimeThresholds.LONG);

  it(
    'should determine if scaffold is needed',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'should-build-scaffold'
      );

      expect(await shouldBuildScaffold(projectDir, false)).toBe(true);
      expect(await shouldBuildScaffold(projectDir, true)).toBe(true);

      const packageJsonPath = resolve(projectDir, 'package.json');
      await fs.copyFile(
        resolve(testDir, 'nest', 'package.json'),
        packageJsonPath
      );
      expect(await shouldBuildScaffold(projectDir, false)).toBe(false);
    },
    TimeThresholds.SHORT
  );
});
