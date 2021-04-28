import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/dist/vdm-types';
import { checkUrlExists } from '@sap-cloud-sdk/util';
import { getGenerationSteps, getLinks } from '@sap-cloud-sdk/generator-common';
import {
  getGenerationAndUsage,
  linkGenerationDocumentation
} from '@sap-cloud-sdk/generator/internal';

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
    expect(
      getGenerationSteps(
        'install command',
        'generate command',
        linkGenerationDocumentation
      ).instructions
    ).toContain(linkGenerationDocumentation);
    checkUrlExists(linkGenerationDocumentation);
  });

  it('contains only existing links', async () => {
    const links = getLinks();
    for (const link of Object.values(links)) {
      await checkUrlExists(link.url);
    }
  }, 10000);
});
