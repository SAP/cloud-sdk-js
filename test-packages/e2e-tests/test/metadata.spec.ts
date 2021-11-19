import { checkUrlExists } from '@sap-cloud-sdk/util';
import { getGenerationSteps } from '@sap-cloud-sdk/generator-common';
import {
  VdmServiceMetadata,
  getGenerationAndUsage,
  linkGenerationDocumentation,
  getODataLinks
} from '@sap-cloud-sdk/generator/internal';
import {
  getOpenApiLinks,
  getGenerationAndUsage as getGenerationAndUsageOpenApi,
  OpenApiDocument
} from '@sap-cloud-sdk/openapi-generator/internal';

const service = {
  npmPackageName: '@sap/dummy-package',
  originalFileName: 'DummyClass',
  entities: [{ className: 'DummyClass' }]
} as VdmServiceMetadata;

describe('metadata', () => {
  it('gives instructions with working link', async () => {
    expect(
      getGenerationSteps(
        'install command',
        'generate command',
        linkGenerationDocumentation,
        'OData'
      ).instructions
    ).toContain(linkGenerationDocumentation);
    await checkUrlExists(linkGenerationDocumentation);
  });

  describe('OData', () => {
    it('gives a working generator repository link', async () => {
      const generationAndUsage = await getGenerationAndUsage(service);
      await checkUrlExists(generationAndUsage.generatorRepositoryLink);
    });

    it('contains only existing links', async () => {
      const links = getODataLinks();
      for (const link of Object.values(links)) {
        await checkUrlExists(link.url);
      }
    }, 10000);
  });

  describe('OpenAPI', () => {
    it('gives a working generator repository link', async () => {
      const generationAndUsage = await getGenerationAndUsageOpenApi({
        apis: [] as any[]
      } as OpenApiDocument);
      await checkUrlExists(generationAndUsage.generatorRepositoryLink);
    }, 10000);

    it('contains only existing links', async () => {
      const links = getOpenApiLinks();
      for (const link of Object.values(links)) {
        await checkUrlExists(link.url);
      }
    }, 10000);
  });
});
