import { emptyObjectSchema } from '../../test/test-util';
import { parseApplicationJsonMediaType, parseMediaType } from './media-type';

describe('parseApplicationJsonMediaType', () => {
  it('returns undefined if there is no application/json media type', () => {
    expect(
      parseApplicationJsonMediaType({
        content: { 'application/xml': { schema: { type: 'string' } } }
      },{}as any)
    ).toBeUndefined();
  });

  it('returns parsed media type for application/json', () => {
    expect(
      parseApplicationJsonMediaType({
        content: { 'application/json': { schema: { type: 'object' } } }
      },{}as any)
    ).toEqual(emptyObjectSchema);
  });
});

describe('parseMediaType', () => {
  it('returns undefined if there is no media type at all', () => {
    expect(parseMediaType(undefined,{}as any)).toBeUndefined();
  });

  it('returns any schema if there are other schemas', () => {
    expect(
      parseMediaType({
        content: { 'application/xml': { schema: { type: 'string' } } }
      },{}as any)
    ).toEqual({ type: 'any' });
  });

  it('returns parsed media type if there is only application/json', () => {
    expect(
      parseMediaType({
        content: { 'application/json': { schema: { type: 'object' } } }
      },{}as any)
    ).toEqual(emptyObjectSchema);
  });

  it('returns anyOf schema if there are other schemas and application/json', () => {
    expect(
      parseMediaType({
        content: {
          'application/json': { schema: { type: 'object' } },
          'application/xml': { schema: { type: 'string' } }
        }
      },{}as any)
    ).toEqual({ anyOf: [emptyObjectSchema, { type: 'any' }] });
  });
});
