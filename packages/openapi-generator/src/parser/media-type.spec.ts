import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { parseTopLevelMediaType, parseMediaType } from './media-type';

const defaultOptions = { strictNaming: true };
describe('parseTopLevelMediaType', () => {
  it('returns undefined if the media type is not supported', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: { 'application/xml': { schema: { type: 'string' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toBeUndefined();
  });

  it('returns parsed media type for supported media type application/json', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: { 'application/json': { schema: { type: 'object' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual(emptyObjectSchema);
  });

  it('returns parsed media type for supported media type application/merge-patch+json', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'application/merge-patch+json': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual(emptyObjectSchema);
  });
});

describe('parseMediaType', () => {
  it('returns undefined if there is no media type at all', async () => {
    expect(
      parseMediaType(undefined, await createTestRefs(), defaultOptions)
    ).toBeUndefined();
  });

  it('returns any schema if there are other schemas', async () => {
    expect(
      parseMediaType(
        {
          content: { 'application/xml': { schema: { type: 'string' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({ type: 'any' });
  });

  it('returns parsed media type if there is only application/json', async () => {
    expect(
      parseMediaType(
        {
          content: { 'application/json': { schema: { type: 'object' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual(emptyObjectSchema);
  });

  it('returns parsed media type if there is only application/merge-patch+json', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/merge-patch+json': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual(emptyObjectSchema);
  });

  it('returns anyOf schema if there are other schemas and application/json', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/json': { schema: { type: 'object' } },
            'application/xml': { schema: { type: 'string' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({ anyOf: [emptyObjectSchema, { type: 'any' }] });
  });
});
