import { resolve } from 'path';
import { writeFile, readFile, removeSync } from 'fs-extra';
import execa = require('execa');
import { VdmServiceMetadata } from '../vdm-types';
import { getApiSpecificUsage } from './generation-and-usage';
import { genericCodeSample } from './code-samples';

describe('generation-and-usage', () => {
  const service = {
    npmPackageName: '@sap/dummy-package',
    entities: [{ className: 'DummyClass' }]
  } as VdmServiceMetadata;

  it('creates generic usage example', () => {
    expect(genericCodeSample()).toMatchSnapshot();
  });

  it('creates api specific usage for entity', () => {
    expect(getApiSpecificUsage(service)).toMatchSnapshot();
  });

  it('creates compiling generic usage', async () => {
    const codeSnippet = genericCodeSample().instructions;
    const tsFile = 'generic-get-all-code-sample.ts';
    const jsFile = tsFile.replace('.ts', '.js');
    await writeFile(resolve(__dirname, tsFile), codeSnippet);
    await execa('npx', ['tsc', tsFile, '--esModuleInterop'], {
      cwd: __dirname
    });
    await expect(readFile(resolve(__dirname, jsFile))).resolves.toBeDefined();
    [tsFile, jsFile].map(file => removeSync(resolve(__dirname, file)));
  }, 60000);
});
