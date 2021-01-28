/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { resolve } from 'path';
import fs from 'fs-extra';
import execa from 'execa';
import {
  deleteAsync,
  getCleanProjectDir,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import { testDir } from '../../../../test-resources/cli';
import {
  installDependencies,
  modifyPackageJson,
  parsePackageJson
} from './package-json';

jest.mock('execa', () => jest.fn().mockResolvedValue('1.0.0'));

const testOutputDir = getTestOutputDir(__filename);

describe('Package Json Utils', () => {
  beforeAll(async () => {
    await deleteAsync(testOutputDir, 3);
  }, TimeThresholds.LONG);

  it(
    'should call `npm install`',
    () => {
      installDependencies('', true);
      expect(execa).toHaveBeenCalledWith('npm', ['install'], {
        cwd: '',
        stdio: 'inherit'
      });
    },
    TimeThresholds.SHORT
  );

  it(
    'should parse the package.json',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'parse-package-json'
      );
      const packageJsonPath = resolve(projectDir, 'package.json');
      await fs.copyFile(
        resolve(testDir, 'nest', 'package.json'),
        packageJsonPath
      );

      expect(
        Object.keys(await parsePackageJson(projectDir)).sort()
      ).toMatchSnapshot();
    },
    TimeThresholds.SHORT
  );

  it(
    'add scripts, dependencies and test config for existing project',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'modify-package-json-existing'
      );
      const packageJsonPath = resolve(projectDir, 'package.json');
      await fs.copyFile(
        resolve(testDir, 'nest', 'package.json'),
        packageJsonPath
      );

      await modifyPackageJson({
        projectDir,
        isScaffold: false,
        frontendScripts: false,
        force: false,
        addCds: false
      });
      expect(await parsePackageJson(projectDir)).toMatchSnapshot();
    },
    TimeThresholds.SHORT
  );

  it(
    'add scripts, dependencies and test config for scaffolded project',
    async () => {
      const projectDir = await getCleanProjectDir(
        testOutputDir,
        'modify-package-json-existing'
      );
      const packageJsonPath = resolve(projectDir, 'package.json');
      await fs.copyFile(
        resolve(testDir, 'nest', 'package.json'),
        packageJsonPath
      );

      await modifyPackageJson({
        projectDir,
        isScaffold: true,
        frontendScripts: true,
        force: false,
        addCds: false
      });
      expect(await parsePackageJson(projectDir)).toMatchSnapshot();
    },
    TimeThresholds.SHORT
  );
});
