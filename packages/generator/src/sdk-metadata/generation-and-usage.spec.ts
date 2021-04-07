import { resolve } from 'path';
import { checkUrlExists } from '@sap-cloud-sdk/test-util';
import { writeFile, readFile, removeSync } from 'fs-extra';
import execa = require('execa');
import {
  getApiSpecificUsage,
  getGenerationDocumentation,
  getGenericUsage,
  linkGenerationDocumentaion
} from './generation-and-usage';

describe('generation-and-usage', () => {
  it('creates generic usage example', async () => {
    await expect(getGenericUsage()).resolves.toMatchSnapshot();
  });

  it('creates api specific usage for entity', async () => {
    await expect(
      getApiSpecificUsage({
        npmPackageName: '@sap/dummy-package',
        entities: [{ className: 'DummyClass' }]
      } as any)
    ).resolves.toMatchSnapshot();
  });

  it('[E2E] gives instruction with working link', async () => {
    expect(getGenerationDocumentation()).toContain(linkGenerationDocumentaion);
    checkUrlExists(linkGenerationDocumentaion);
  });

  it('[E2E] creates compiling generic usage', async () => {
    const codeSnippet = await getGenericUsage();
    const tsFile = 'generic-get-all-code-sample.ts';
    const jsFile = tsFile.replace('.ts', '.js');
    await writeFile(resolve(__dirname, tsFile), codeSnippet);
    await execa('tsc', [tsFile, '--esModuleInterop'], { cwd: __dirname });
    await expect(readFile(resolve(__dirname, jsFile))).resolves;
    [tsFile, jsFile].map(file => removeSync(resolve(__dirname, file)));
  }, 60000);
});
