import { emptyObjectSchema } from '../../test/test-util';
import { parseApplicationJsonMediaType } from './media-type';

describe('parseApplicationJsonMediaType', () => {
  it('returns undefined if there is no application/json media type', () => {
    expect(
      parseApplicationJsonMediaType({
        content: { 'application/xml': { schema: { type: 'string' } } }
      })
    ).toBeUndefined();
  });

  it('returns parsed media type for application/json', () => {
    expect(
      parseApplicationJsonMediaType({
        content: { 'application/json': { schema: { type: 'object' } } }
      })
    ).toEqual(emptyObjectSchema);
  });
});
