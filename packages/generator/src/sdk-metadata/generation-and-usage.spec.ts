import { resolve } from 'path';
import { writeFile, readFile, removeSync } from 'fs-extra';
import execa = require('execa');
import { VdmServiceMetadata } from '../vdm-types';
import { getApiSpecificUsage, getGenericUsage } from './generation-and-usage';

describe('generation-and-usage', () => {
  const service = {
    npmPackageName: '@sap/dummy-package',
    entities: [{ className: 'DummyClass' }]
  } as VdmServiceMetadata;

  it('creates generic usage example', async () => {
    await expect(getGenericUsage()).resolves.toMatchSnapshot();
  });

  it('creates api specific usage for entity', async () => {
    await expect(getApiSpecificUsage(service)).resolves.toMatchSnapshot();
  });

  it('creates compiling generic usage', async () => {
    const codeSnippet = (await getGenericUsage()).instructions;
    const tsFile = 'generic-get-all-code-sample.ts';
    const jsFile = tsFile.replace('.ts', '.js');
    await writeFile(resolve(__dirname, tsFile), codeSnippet);
    await execa('tsc', [tsFile, '--esModuleInterop'], { cwd: __dirname });
    await expect(readFile(resolve(__dirname, jsFile))).resolves.toBeDefined();
    [tsFile, jsFile].map(file => removeSync(resolve(__dirname, file)));
  }, 60000);
});
