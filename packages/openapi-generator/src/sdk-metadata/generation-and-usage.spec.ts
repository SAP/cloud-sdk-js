import { dummyOpenApiDocument } from '../../test/test-util';
import { getApiSpecificUsage } from './generation-and-usage';

describe('generation-and-usage', () => {
  it('creates api specific usage for entity', () => {
    expect(getApiSpecificUsage(dummyOpenApiDocument)).toMatchSnapshot();
  });
});
