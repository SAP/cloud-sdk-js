/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { resolve } from 'path';
import fs from 'fs-extra';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { testDir } from '../../../../test-resources/cli';
import { getJestConfig, modifyJestConfig } from './jest-config';

const testOutputDir = getTestOutputDir(__filename);

describe('Jest Config Utils', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.EXTRA_SHORT);

  it(
    'returns jest config object for tests',
    () => {
      expect(getJestConfig(true)).toMatchSnapshot();
      expect(getJestConfig(false)).toMatchSnapshot();
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'returns adds jest config to file',
    async () => {
      const projectDir = await getCleanProjectDir(testOutputDir, 'jest-config');
      const jestConfigPath = resolve(projectDir, 'jest-e2e.json');
      await fs.copyFile(
        resolve(testDir, 'nest', 'test', 'jest-e2e.json'),
        jestConfigPath
      );

      modifyJestConfig(jestConfigPath, getJestConfig(false));

      expect(
        JSON.parse(await fs.readFile(jestConfigPath, { encoding: 'utf8' }))
      ).toMatchObject(getJestConfig(false));
    },
    TimeThresholds.EXTRA_SHORT
  );
});
