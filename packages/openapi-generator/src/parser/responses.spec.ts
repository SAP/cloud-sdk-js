import { createRefs } from '../../test/test-util';
import { parseResponses } from './responses';

describe('parseResponses', () => {
  it('parses response schema without content', async () => {
    expect(
      parseResponses(
        { 200: { description: 'A response' } },
        await createRefs(),
        {}
      )
    ).toEqual({
      type: 'any'
    });
  });

  it('parses response schema from content', async () => {
    expect(
      parseResponses(
        {
          200: {
            description: 'A response',
            content: {
              'application/json': { schema: { type: 'string' } }
            }
          }
        },
        await createRefs(),
        {}
      )
    ).toEqual({
      type: 'string'
    });
  });

  it('parses response schema from multiple success codes', async () => {
    const schemaNaming = {
      schemaName: 'RefType',
      fileName: 'ref-type'
    };
    expect(
      parseResponses(
        {
          200: {
            description: 'A response',
            content: {
              'application/json': { schema: { type: 'string' } }
            }
          },
          201: {
            description: 'Another response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schema/RefType' }
              }
            }
          }
        },
        await createRefs(),
        {
          '#/components/schema/RefType': schemaNaming
        }
      )
    ).toEqual({
      anyOf: [
        { type: 'string' },
        { $ref: '#/components/schema/RefType', ...schemaNaming }
      ]
    });
  });
});
