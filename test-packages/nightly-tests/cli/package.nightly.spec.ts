/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
jest.mock('@sap-cloud-sdk/cli/src/utils/message-formatter');

import { resolve } from 'path';
import fs from 'fs-extra';
import Package from '@sap-cloud-sdk/cli/src/commands/package';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '@sap-cloud-sdk/cli/test/test-utils';
import { testDir } from '../../../test-resources/cli';

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

  test(
    'should copy dependencies when --ci is set',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'productive-dependencies'
      );
      await fs.copy(nestAppDir, projectDir, { recursive: true });
      await Package.run([projectDir, '--ci']);

      return fs
        .readdir(resolve(projectDir, 'deployment'))
        .then(files =>
          expect(files).toIncludeAllMembers([
            'package.json',
            'package-lock.json',
            'node_modules'
          ])
        );
    },
    TimeThresholds.LONG
  );
});
