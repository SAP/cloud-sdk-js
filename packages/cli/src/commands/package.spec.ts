/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

jest.mock('../utils/message-formatter');

import { resolve } from 'path';
import fs from 'fs-extra';
import { testDir } from '../../../../test-resources/cli';
import { boxMessage } from '../utils';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import Package from './package';

const testOutputDir = getTestOutputDir(__filename);
const nestAppDir = resolve(testDir, 'nest');

jest.retryTimes(3);

describe('Package', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.SHORT);

  beforeEach(() => {
    jest.clearAllMocks();
  }, TimeThresholds.SHORT);

  it(
    'should copy files correctly without parameters',
    async () => {
      const projectDir = await getCleanProjectDir(testOutputDir, 'no-params');
      await fs.copy(nestAppDir, projectDir, { recursive: true });
      await Package.run([projectDir]);

      const copiedFiles = await fs.readdir(resolve(projectDir, 'deployment'));
      expect(copiedFiles).toIncludeAllMembers(['package.json']);
      expect(copiedFiles).toHaveLength(1);
    },
    TimeThresholds.SHORT
  );

  it(
    'should copy files correctly with custom globs',
    async () => {
      const projectDir = await getCleanProjectDir(testOutputDir, 'globs');
      await fs.copy(nestAppDir, projectDir, { recursive: true });
      await Package.run([
        projectDir,
        '--include=*.json',
        '--exclude=package*,tsconfig*'
      ]);

      const files = await fs.readdir(resolve(projectDir, 'deployment'));
      expect(files).toIncludeAllMembers(['nest-cli.json']);
      expect(files).not.toIncludeAnyMembers([
        'package.json',
        'package-lock.json',
        'tsconfig.json'
      ]);
    },
    TimeThresholds.SHORT
  );

  it(
    'should overwrite output folder',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'folder-overwrite'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });
      await Package.run([projectDir, '--include=.gitignore']);
      await Package.run([projectDir, '--include=README.md']);

      return fs
        .readdir(resolve(projectDir, 'deployment'))
        .then(files => expect(files).toEqual(['README.md']));
    },
    TimeThresholds.SHORT
  );

  it(
    'should not show warning messages when old dependencies are not used',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'without-dependencies'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });

      await Package.run([projectDir]);

      expect(boxMessage).toBeCalledWith(
        expect.arrayContaining(['✅ Package finished successfully.'])
      );
      expect(boxMessage).not.toBeCalledWith(
        expect.arrayContaining([
          '- Old SAP Cloud SDK: @sap/cloud-sdk-core is detected.',
          'Please find how to migrate here:'
        ])
      );
    },
    TimeThresholds.SHORT
  );

  it(
    'should show warning messages when old dependencies are used',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'old-dependencies'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });

      const packageJson = await fs
        .readFile(resolve(projectDir, 'package.json'), {
          encoding: 'utf8'
        })
        .then(file => JSON.parse(file));
      packageJson.dependencies['@sap/cloud-sdk-core'] = '^1.17.2';
      await fs.writeFile(
        resolve(projectDir, 'package.json'),
        JSON.stringify(packageJson),
        { encoding: 'utf8' }
      );

      await Package.run([projectDir]);

      expect(boxMessage).toBeCalledWith(
        expect.arrayContaining([
          '- Old SAP Cloud SDK: @sap/cloud-sdk-core is detected.',
          'Please find how to migrate here:'
        ])
      );
      expect(boxMessage).not.toBeCalledWith(
        expect.arrayContaining(['✅ Package finished successfully.'])
      );
    },
    TimeThresholds.SHORT
  );
});
