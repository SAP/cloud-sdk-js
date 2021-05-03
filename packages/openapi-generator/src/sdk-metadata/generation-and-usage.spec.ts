import { getSdkVersion } from '@sap-cloud-sdk/generator-common';
import { dummyOpenApiDocument } from '../../test/test-util';
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
