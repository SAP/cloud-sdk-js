/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
jest.mock('@sap-cloud-sdk/cli/src/utils/warnings');

import { resolve } from 'path';
import execa = require('execa');
import fs from 'fs-extra';
import Init from '@sap-cloud-sdk/cli/src/commands/init';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '@sap-cloud-sdk/cli/test/test-utils';

const testOutputDir = getTestOutputDir(__filename);

jest.retryTimes(3);

describe('Init', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 6);
  }, TimeThresholds.EXTRA_LONG);

  test(
    'should create a new project with the necessary files',
    async () => {
      const projectDir = await getCleanProjectDir(testOutputDir, 'full-init');
      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--buildScaffold',
        '--no-analytics'
      ]);

      await Promise.all([
        ...['credentials.json', 'systems.json', 'manifest.yml']
          .map(file => resolve(projectDir, file))
          .map(filePath => fs.access(filePath)),
        fs
          .readFile(resolve(projectDir, 'README.md'), { encoding: 'utf8' })
          .then(file => expect(file).toInclude('SAP Cloud SDK'))
      ]);

      // execute the ci scripts and check if the reports are written
      // trying to do this in parallel lead to strange npm errors
      await execa('npm', ['run', 'ci-backend-unit-test'], {
        cwd: projectDir,
        stdio: 'inherit'
      });
      await execa('npm', ['run', 'ci-it-backend'], {
        cwd: projectDir,
        stdio: 'inherit'
      });

      const reportsPath = resolve(projectDir, 's4hana_pipeline', 'reports');
      const backendUtil = fs.readdir(resolve(reportsPath, 'backend-unit'));
      const backendUtilCoverage = fs.readdir(
        resolve(reportsPath, 'coverage-reports', 'backend-unit')
      );
      const backendIntegration = fs.readdir(
        resolve(reportsPath, 'backend-integration')
      );

      return Promise.all([
        backendUtil,
        backendUtilCoverage,
        backendIntegration
      ]).then(folders => {
        folders.forEach(folder => expect(folder.length).toBeGreaterThan(1));
        return Promise.resolve();
      });
    },
    TimeThresholds.EXTRA_LONG
  );
});
