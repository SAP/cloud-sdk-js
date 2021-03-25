import { checkUrlExists } from '@sap-cloud-sdk/test-util';
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
});
