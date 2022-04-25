import { getSdkVersion } from '@sap-cloud-sdk/generator-common/internal';
import { dummyOpenApiDocument } from '@sap-cloud-sdk/private-test-utils';
import { getGenerationAndUsage } from './generation-and-usage';

describe('generation-and-usage', () => {
  it('creates GenerationAndUsage from openApiDocument', async () => {
    const generationAndUsage = await getGenerationAndUsage(
      dummyOpenApiDocument
    );
    expect(generationAndUsage).toMatchSnapshot({
      generatorVersion: expect.any(String)
    });
    expect(generationAndUsage.generatorVersion).toEqual(await getSdkVersion());
  });
});
