/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const prompt = jest.fn().mockResolvedValue('mock-project');
jest.mock('cli-ux', () => {
  // Mocking needs to happen before the command is imported
  const cli = jest.requireActual('cli-ux');
  return {
    ...cli,
    prompt
  };
});

import * as path from 'path';
import * as fs from 'fs-extra';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { testDir } from '../../../../test-resources/cli';
import AddCds from './add-cds';

describe('Add CDS', () => {
  const testOutputDir = getTestOutputDir(__filename);

  beforeAll(async () => {
    await deleteAsync(testOutputDir, 6);
  }, TimeThresholds.LONG);

  it(
    'should add necessary files to an existing project',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-cds-to-existing-project'
      );

      await fs.copy(path.resolve(testDir, 'express'), projectDir, {
        recursive: true
      });

      await AddCds.run([projectDir, '--skipInstall']);

      const files = fs.readdir(projectDir);
      const dbFiles = fs.readdir(path.resolve(projectDir, 'db'));
      const srvFiles = fs.readdir(path.resolve(projectDir, 'srv'));
      return Promise.all([files, dbFiles, srvFiles]).then(values => {
        expect(values[0]).toIncludeAllMembers(['.cdsrc.json', 'db', 'srv']);
        expect(values[1]).toContain('data-model.cds');
        expect(values[2]).toContain('cat-service.cds');
      });
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should detect and fail if there are conflicts',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-cds-conflicts'
      );

      await fs.copy(path.resolve(testDir, 'express'), projectDir, {
        recursive: true
      });
      await fs.mkdir(path.resolve(projectDir, 'db'));
      await fs.createFile(path.resolve(projectDir, 'db', 'data-model.cds'));
      await fs.writeFile(
        path.resolve(projectDir, 'db', 'data-model.cds'),
        'some text',
        'utf8'
      );

      try {
        await AddCds.run([projectDir, '--skipInstall']);
      } catch (e) {
        expect(e.message).toMatch(/A file with the name .* already exists\./);
      }
    },
    TimeThresholds.SHORT
  );
});
