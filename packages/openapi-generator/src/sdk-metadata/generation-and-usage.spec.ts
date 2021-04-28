import { getGenerationAndUsage } from './generation-and-usage';
import { dummyOpenApiDocument } from '../../test/test-util';

describe('generation-and-usage', () => {
  it('creates GenerationAndUsage from openApiDocument', async () => {
    expect(await getGenerationAndUsage(dummyOpenApiDocument)).toMatchSnapshot();
  });
});
