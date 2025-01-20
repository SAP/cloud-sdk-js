import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { parseTopLevelMediaType, parseMediaType } from './media-type';

const defaultOptions = { strictNaming: true, schemaPrefix: '', resolveExternal: true };
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

  it('returns parsed schema for supported media type application/json', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'application/json;charset=utf-8': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual(emptyObjectSchema);
  });

  it('returns parsed schema for supported media type application/merge-patch+json', async () => {
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

  it('returns parsed schema for supported media type text/plain', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'text/plain': { schema: { type: 'integer' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({ type: 'number' });
  });

  it('returns parsed schema for supported media type application/octet-stream', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'application/octet-stream': {
              schema: { type: 'string', format: 'binary' }
            }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({ type: 'string' });
  });
});

describe('parseMediaType', () => {
  it('returns undefined if there is no media type at all', async () => {
    expect(
      parseMediaType(undefined, await createTestRefs(), defaultOptions)
    ).toBeUndefined();
  });

  it('returns type `any` if there is an unsupported media type', async () => {
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

  it('returns parsed schema if there is only application/json', async () => {
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

  it('returns parsed schema if there is only application/merge-patch+json', async () => {
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

  it('returns parsed schema if there is only wildcard media type */*', async () => {
    expect(
      parseMediaType(
        {
          content: {
            '*/*': { schema: { type: 'string' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({ type: 'string' });
  });

  it('returns parsed schema if there is both application/json and application/merge-patch+json', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/json': { schema: { type: 'object' } },
            'application/merge-patch+json': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual(emptyObjectSchema);
  });

  it('returns anyOf schema if there are unsupported media type and supported media type', async () => {
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
