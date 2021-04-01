import { emptyObjectSchema } from '../../test/test-util';
import { parseApplicationJsonMediaType, parseMediaType } from './media-type';

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

describe('parseMediaType', () => {
  it('returns undefined if there is no media type at all', () => {
    expect(parseMediaType(undefined)).toBeUndefined();
  });

  it('returns any schema if there are other schemas', () => {
    expect(
      parseMediaType({
        content: { 'application/xml': { schema: { type: 'string' } } }
      })
    ).toEqual({ type: 'any' });
  });

  it('returns parsed media type if there is only application/json', () => {
    expect(
      parseMediaType({
        content: { 'application/json': { schema: { type: 'object' } } }
      })
    ).toEqual(emptyObjectSchema);
  });

  it('returns anyOf schema if there are other schemas and application/json', () => {
    expect(
      parseMediaType({
        content: {
          'application/json': { schema: { type: 'object' } },
          'application/xml': { schema: { type: 'string' } }
        }
      })
    ).toEqual({ anyOf: [emptyObjectSchema, { type: 'any' }] });
  });
});
