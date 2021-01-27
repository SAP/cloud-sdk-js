/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

jest.mock('@sap-cloud-sdk/cli/src/utils/warnings');

import {resolve} from 'path';
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
    '[E2E] should create a new project with the necessary files when adding cds',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'full-init-cds'
      );
      await Init.run([
        projectDir,
        '--projectName=testingApp',
        '--buildScaffold',
        '--no-analytics',
        '--addCds'
      ]);

      await Promise.all(
        [
          '.cdsrc.json',
          'srv/cat-service.cds',
          'db/data-model.cds',
          'src/catalogue/catalogue.module.ts'
        ]
          .map(file => resolve(projectDir, file))
          .map(filePath => fs.access(filePath))
      );

      await execa('npm', ['run', 'cds-deploy'], {
        cwd: projectDir,
        stdio: 'inherit'
      });
      return fs.access(resolve(projectDir, 'testingApp.db'));
    },
    TimeThresholds.EXTRA_LONG
  );
});
