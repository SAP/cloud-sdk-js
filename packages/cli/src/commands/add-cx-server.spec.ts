/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as path from 'path';
import * as fs from 'fs-extra';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { testDir } from '../../../../test-resources/cli';
import AddCxServer from './add-cx-server';

describe('Add CX Server', () => {
  const testOutputDir = getTestOutputDir(__filename);

  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.SHORT);

  it(
    'should add the necessary files',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-cx-server'
      );

      await AddCxServer.run([projectDir]);

      const files = fs.readdir(projectDir);
      const approuterFiles = fs.readdir(path.resolve(projectDir, 'cx-server'));

      return Promise.all([files, approuterFiles]).then(values => {
        expect(values[0]).toContain('cx-server');
        expect(values[1]).toIncludeAllMembers(['cx-server', 'server.cfg']);
      });
    },
    TimeThresholds.SHORT
  );

  it(
    'should add the necessary files on windows',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-cx-server'
      );

      await AddCxServer.run([projectDir, '--platform=win32']);

      const files = fs.readdir(projectDir);
      const approuterFiles = fs.readdir(path.resolve(projectDir, 'cx-server'));
      const fileContent = fs.readFile(
        path.resolve(projectDir, 'cx-server', 'cx-server'),
        { encoding: 'utf8' }
      );

      return Promise.all([files, approuterFiles, fileContent]).then(values => {
        expect(values[0]).toContain('cx-server');
        expect(values[1]).toIncludeAllMembers([
          'cx-server',
          'cx-server.bat',
          'server.cfg'
        ]);
        // Some heuristic test that the content of the script has been downloaded proerly.
        expect((values[2] as string).startsWith('#!/bin/bash')).toBe(true);
        expect((values[2] as string).match('docker run'));
      });
    },
    TimeThresholds.SHORT
  );

  it(
    'should add necessary files to an existing project',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-cx-server-to-existing-project'
      );

      await fs.copy(path.resolve(testDir, 'express'), projectDir, {
        recursive: true
      });

      await AddCxServer.run([projectDir]);

      const files = fs.readdir(projectDir);
      const approuterFiles = fs.readdir(path.resolve(projectDir, 'cx-server'));

      return Promise.all([files, approuterFiles]).then(values => {
        expect(values[0]).toContain('cx-server');
        expect(values[1]).toIncludeAllMembers(['cx-server', 'server.cfg']);
      });
    },
    TimeThresholds.SHORT
  );

  it(
    'should detect and fail if there are conflicts',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-cx-server-conflicts'
      );

      await fs.mkdir(path.resolve(projectDir, 'cx-server'));
      await fs.createFile(path.resolve(projectDir, 'cx-server', 'cx-server'));

      try {
        await AddCxServer.run([projectDir]);
      } catch (e) {
        expect(e.message).toContain(
          'A file with the name "cx-server" already exists.'
        );
      }
    },
    TimeThresholds.SHORT
  );
});
