import { VdmServiceMetadata } from '@sap-cloud-sdk/generator/dist/vdm-types';
import { checkUrlExists } from '@sap-cloud-sdk/util';
import { getGenerationSteps } from '@sap-cloud-sdk/generator-common';
import {
  getGenerationAndUsage,
  linkGenerationDocumentation,
  getODataLinks
} from '@sap-cloud-sdk/generator/internal';
import {
  getOpenApiLinks,
  getGenerationAndUsage as getGenerationAndUsageOpenApi
} from '@sap-cloud-sdk/openapi-generator/internal';
import { OpenApiDocument } from '@sap-cloud-sdk/openapi-generator/dist/openapi-types';

const service = {
  npmPackageName: '@sap/dummy-package',
  entities: [{ className: 'DummyClass' }]
} as VdmServiceMetadata;

describe('metadata', () => {
  it('gives instructions with working link', async () => {
    expect(
      getGenerationSteps(
        'install command',
        'generate command',
        linkGenerationDocumentation
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
    });

    it('contains only existing links', async () => {
      const links = getOpenApiLinks();
      for (const link of Object.values(links)) {
        await checkUrlExists(link.url);
      }
    }, 10000);
  });
});
