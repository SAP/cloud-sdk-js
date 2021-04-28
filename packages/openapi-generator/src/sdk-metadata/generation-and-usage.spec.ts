import { dummyOpenApiDocument } from '../../test/test-util';
import { getGenerationAndUsage } from './generation-and-usage';

describe('generation-and-usage', () => {
  it('creates GenerationAndUsage from openApiDocument', async () => {
    expect(await getGenerationAndUsage(dummyOpenApiDocument)).toMatchSnapshot();
  });
});
