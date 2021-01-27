/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { testDir } from '../../../../test-resources/cli';

const prompt = jest.fn().mockResolvedValue('mock-project');
jest.mock('cli-ux', () => {
  const cli = jest.requireActual('cli-ux');
  return {
    ...cli,
      prompt
  };
});
import {resolve} from 'path';
import fs from 'fs-extra';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import AddApprouter from './add-approuter';

describe('Add Approuter', () => {
  const testOutputDir = getTestOutputDir(__filename);

  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.SHORT);

  it(
    'should add preconfigured files',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-approuter'
      );

      await AddApprouter.run([projectDir]);

      const files = fs.readdir(projectDir);
      const approuterFiles = fs.readdir(resolve(projectDir, 'approuter'));

      return Promise.all([files, approuterFiles]).then(values => {
        expect(values[0]).toContain('approuter');
        expect(values[1]).toIncludeAllMembers([
          'manifest.yml',
          'package.json',
          'xs-app.json',
          'xs-security.json'
        ]);
      });
    },
    TimeThresholds.SHORT
  );

  it(
    'should add necessary files to an existing project',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-approuter-to-existing-project'
      );

      await fs.copy(resolve(testDir, 'express'), projectDir, {
        recursive: true
      });

      await AddApprouter.run([projectDir]);

      const files = fs.readdir(projectDir);
      const approuterFiles = fs.readdir(resolve(projectDir, 'approuter'));

      return Promise.all([files, approuterFiles]).then(values => {
        expect(values[0]).toContain('approuter');
        expect(values[1]).toIncludeAllMembers([
          'manifest.yml',
          'package.json',
          'xs-app.json',
          'xs-security.json'
        ]);
      });
    },
    TimeThresholds.SHORT
  );

  it(
    'should detect and fail if there are conflicts',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-approuter-conflicts'
      );

      await fs.copy(resolve(testDir, 'express'), projectDir, {
        recursive: true
      });
      await fs.mkdir(resolve(projectDir, 'approuter'));
      await fs.createFile(
        resolve(projectDir, 'approuter', 'xs-security.json')
      );
      await fs.writeFile(
        resolve(projectDir, 'approuter', 'xs-security.json'),
        JSON.stringify({ 'tenant-mode': 'shared' }),
        'utf8'
      );

      try {
        await AddApprouter.run([projectDir]);
      } catch (e) {
        expect(e.message).toMatch(/A file with the name .* already exists\./);
      }
    },
    TimeThresholds.SHORT
  );
});
