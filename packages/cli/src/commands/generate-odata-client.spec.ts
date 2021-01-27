/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { testDir } from '../../../../test-resources/cli';

const execa = jest
  .fn()
  .mockRejectedValueOnce({ exitCode: 1 })
  .mockResolvedValueOnce('installed')
  .mockResolvedValueOnce('generated');
jest.mock('execa', () => execa);
jest.mock('cli-ux', ()=>({confirm: jest.fn().mockResolvedValue(true)}));

jest.retryTimes(3);

import { resolve } from 'path';
import { copy } from 'fs-extra';
import { generatorOptionsSDK, GeneratorOptionsSDK } from '../utils';
import {
  deleteAsync,
  getTestOutputDir,
  TimeThresholds
} from '../../test/test-utils';
import GenerateODataClient from './generate-odata-client';

describe('generate-odata-client', () => {
  const pathForTests = getTestOutputDir(__filename);

  beforeAll(async () => {
    await deleteAsync(pathForTests, 3);
    const pathForResources = resolve(
      testDir,
      'resources',
      'template-generator-odata-client'
    );
    await copy(pathForResources, pathForTests);
  }, TimeThresholds.LONG);

  it(
    'should fail if the mandatory parameters are not there',
    async () => {
      await expect(GenerateODataClient.run([])).toReject();
    },
    TimeThresholds.MEDIUM
  );

  it(
    'should install and generate',
    async () => {
      await GenerateODataClient.run([
        '-i=input',
        '-o=output',
        '--projectDir',
        pathForTests
      ]);

      expect(execa).toHaveBeenCalledTimes(3);
      expect(execa.mock.calls[1][1].sort()).toContain(
        '@sap-cloud-sdk/generator'
      );
      expect(execa.mock.calls[2][1].sort()).toEqual(
        getDefault(pathForTests).sort()
      );
    },
    TimeThresholds.MEDIUM
  );
});

function getDefault(projectDir: string) {
  return [
    ...Object.keys(generatorOptionsSDK).reduce((prev, current) => {
      const value = generatorOptionsSDK[current as keyof GeneratorOptionsSDK];
      return value && typeof value.default !== 'undefined'
        ? [...prev, `--${current}=${value.default}`]
        : prev;
    }, [] as any),
    `--inputDir=${resolve(projectDir, 'input')}`,
    `--outputDir=${resolve(projectDir, 'output')}`
  ];
}
