import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/dist/vdm-types';
import { checkUrlExists } from '@sap-cloud-sdk/util';
import {
  getGenerationAndUsage,
  getGenerationSteps,
  linkGenerationDocumentaion,
  getLinks
} from '@sap-cloud-sdk/generator-common';

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
