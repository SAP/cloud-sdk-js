/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
jest.mock('../../src/utils/warnings');
import { unixEOL } from '@sap-cloud-sdk/util'
import fs from 'fs-extra';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { recordWarning } from './warnings';
import { modifyGitIgnore } from './git-ignore';

const testOutputDir = getTestOutputDir(__filename);

describe('Git Ignore Utils', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.EXTRA_SHORT);

  it(
    'should add paths to empty git ignore',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'empty-git-ignore'
      );
      await fs.writeFile(`${projectDir}/.gitignore`, '');

      modifyGitIgnore(projectDir, false);

      const gitIgnoreContent = (
        await fs.readFile(`${projectDir}/.gitignore`, { encoding: 'utf8' })
      ).split(unixEOL);
      expect(gitIgnoreContent).toIncludeAllMembers([
        '/s4hana_pipeline',
        'credentials.json'
      ]);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should add cds paths to empty git ignore',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'empty-git-ignore-cds'
      );
      await fs.writeFile(`${projectDir}/.gitignore`, '');

      modifyGitIgnore(projectDir, true);

      const gitIgnoreContent = (
        await fs.readFile(`${projectDir}/.gitignore`, { encoding: 'utf8' })
      ).split(unixEOL);
      expect(gitIgnoreContent).toIncludeAllMembers(['gen/', '*.db']);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should add paths to existing git ignore',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'existing-git-ignore'
      );
      await fs.writeFile(
        `${projectDir}/.gitignore`,
        `myPath
      foobar

      !@#$%^&^
      ${unixEOL}`
      );
      modifyGitIgnore(projectDir, false);

      const gitIgnoreContent = (
        await fs.readFile(`${projectDir}/.gitignore`, { encoding: 'utf8' })
      ).split(unixEOL);
      expect(gitIgnoreContent).toIncludeAllMembers([
        '/s4hana_pipeline',
        'myPath',
        'credentials.json'
      ]);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'warn if there is no git ignore',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'no-git-ignore'
      );

      modifyGitIgnore(projectDir, false);

      expect(recordWarning).toHaveBeenCalledWith(
        'No .gitignore file found!',
        'If your project is using a different version control system,',
        'please make sure the following paths are not tracked:',
        '  credentials.json',
        '  /s4hana_pipeline',
        '  /deployment'
      );
    },
    TimeThresholds.EXTRA_SHORT
  );
});
