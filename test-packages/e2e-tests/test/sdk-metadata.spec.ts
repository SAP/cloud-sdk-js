import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/dist/vdm-types';
import {
  getGenerationAndUsage,
  getGenerationSteps,
  linkGenerationDocumentaion
} from '@sap-cloud-sdk/generator/dist/sdk-metadata/generation-and-usage';
import { checkUrlExists } from '@sap-cloud-sdk/util';
import { getLinks } from '@sap-cloud-sdk/generator/dist/sdk-metadata/links';

const service = {
  npmPackageName: '@sap/dummy-package',
  entities: [{ className: 'DummyClass' }]
} as VdmServiceMetadata;

describe('sdk-metadata', () => {
  it('gives a working generator repository link', async () => {
    const generationAndUsage = await getGenerationAndUsage(service);
    checkUrlExists(generationAndUsage.generatorRepositoryLink);
  });

  it('gives instruction with working link', async () => {
    expect(getGenerationSteps().instructions).toContain(
      linkGenerationDocumentaion
    );
    checkUrlExists(linkGenerationDocumentaion);
  });

  it('contains only existing links', async () => {
    const links = getLinks();
    for (const link of Object.values(links)) {
      await checkUrlExists(link.url);
    }
  }, 10000);
});
