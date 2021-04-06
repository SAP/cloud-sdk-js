/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
jest.mock('../utils/warnings');

import * as path from 'path';
import { EOL } from 'os';
import * as fs from 'fs-extra';
import { getWarnings, recordWarning } from '../utils/warnings';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { testDir } from '../../../../test-resources/cli';
import Init from './init';

const testOutputDir = getTestOutputDir(__filename);
const expressAppDir = path.resolve(testDir, 'express');
const nestAppDir = path.resolve(testDir, 'nest');

jest.retryTimes(3);

describe('Init', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 6);
  }, TimeThresholds.EXTRA_LONG);

  it(
    'should add necessary files to an existing project',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-to-existing'
      );
      await fs.copy(expressAppDir, projectDir, { recursive: true });

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--startCommand="npm start"',
        '--no-analytics',
        '--skipInstall',
        '--force'
      ]);

      await Promise.all(
        ['credentials.json', 'systems.json', 'manifest.yml']
          .map(file => path.resolve(projectDir, file))
          .map(filePath => fs.access(filePath))
      );
      try {
        await fs.access(path.resolve(projectDir, 'test'));
      } catch (e) {
        expect(e.message).toMatch(/no such file or directory.*test/);
      }
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should add necessary files to an existing project when adding cds',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-to-existing'
      );
      await fs.copy(expressAppDir, projectDir, { recursive: true });

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--addCds',
        '--startCommand="npm start"',
        '--no-analytics',
        '--skipInstall',
        '--force'
      ]);

      return Promise.all(
        ['.cdsrc.json', 'srv/cat-service.cds', 'db/data-model.cds']
          .map(file => path.resolve(projectDir, file))
          .map(filePath => fs.access(filePath))
      );
    },
    TimeThresholds.MEDIUM
  );

  it(
    'init should detect and fail if there are conflicts',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'detect-conflicts'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });

      try {
        await Init.run([
          projectDir,
          '--projectName=testingApp',
          '--startCommand="npm start"',
          '--skipInstall',
          '--no-analytics'
        ]);
      } catch (e) {
        expect(e.message).toMatch(/A file with the name .* already exists\./);
      }
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should add to .gitignore if there is one',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-to-gitignore'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--startCommand="npm start"',
        '--skipInstall',
        '--no-analytics'
      ]);

      const gitignoreEntries = (
        await fs.readFile(`${projectDir}/.gitignore`, 'utf8')
      )
        .split(EOL)
        .filter(entry => entry !== '');

      expect(gitignoreEntries).toIncludeAllMembers([
        'credentials.json',
        '/s4hana_pipeline',
        '/deployment'
      ]);
      expect(gitignoreEntries.length).toBeGreaterThan(29);
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should show a warning if the project is not using git',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'warn-on-no-git'
      );

      await fs.createFile(path.resolve(projectDir, 'package.json'));
      await fs.writeFile(
        path.resolve(projectDir, 'package.json'),
        JSON.stringify({ name: 'project' }),
        'utf8'
      );

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--startCommand="npm start"',
        '--skipInstall',
        '--no-analytics'
      ]);

      expect(recordWarning).toHaveBeenCalledWith(
        'No .gitignore file found!',
        'If your project is using a different version control system,',
        'please make sure the following paths are not tracked:',
        '  credentials.json',
        '  /s4hana_pipeline',
        '  /deployment'
      );
      expect(getWarnings).toHaveBeenCalled();
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should add our scripts and dependencies to the package.json',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-scripts-and-dependencies'
      );
      await fs.createFile(path.resolve(projectDir, 'package.json'));
      await fs.writeFile(
        path.resolve(projectDir, 'package.json'),
        JSON.stringify({ name: 'project' }),
        'utf8'
      );

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--startCommand="npm start"',
        '--frontendScripts',
        '--skipInstall',
        '--no-analytics'
      ]);

      return fs
        .readFile(path.resolve(projectDir, 'package.json'), 'utf8')
        .then(value => {
          const packageJson = JSON.parse(value);

          const dependencies = Object.keys(packageJson.dependencies);
          const devDependencies = Object.keys(packageJson.devDependencies);
          const scripts = Object.keys(packageJson.scripts);

          expect(dependencies).toContain('@sap-cloud-sdk/core');
          expect(devDependencies).toContain('@sap-cloud-sdk/test-util');
          expect(scripts).toIncludeAllMembers([
            'ci-build',
            'ci-package',
            'ci-backend-unit-test',
            'ci-frontend-unit-test',
            'ci-it-backend',
            'ci-e2e'
          ]);
        });
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should add the analytics file',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-to-gitignore'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--startCommand="npm start"',
        '--skipInstall',
        '--analytics',
        '--analyticsSalt=SAPCLOUDSDK4LIFE'
      ]);

      expect(
        JSON.parse(
          await fs.readFile(
            `${projectDir}/sap-cloud-sdk-analytics.json`,
            'utf8'
          )
        )
      ).toEqual({
        enabled: true,
        salt: 'SAPCLOUDSDK4LIFE'
      });
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should add a disabled analytics file',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'add-to-gitignore'
      );
      await fs.copy(expressAppDir, projectDir, { recursive: true });

      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--startCommand="npm start"',
        '--skipInstall',
        '--no-analytics'
      ]);

      return fs
        .readFile(`${projectDir}/sap-cloud-sdk-analytics.json`, 'utf8')
        .then(file => expect(JSON.parse(file)).toEqual({ enabled: false }));
    },
    TimeThresholds.MEDIUM
  );
});
