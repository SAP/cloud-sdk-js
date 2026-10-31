import { createLogger } from '@sap-cloud-sdk/util';
import { createTestRefs } from '../../test/test-util';
import { parseRequestBodies } from './request-body';

const defaultOptions = {
  strictNaming: true,
  schemaPrefix: '',
  resolveExternal: true
};
describe('parseRequestBodies', () => {
  it('returns an empty array for undefined', async () => {
    const logger = createLogger('openapi-generator');
    jest.spyOn(logger, 'warn');
    expect(
      parseRequestBodies(undefined, await createTestRefs(), defaultOptions)
    ).toEqual([]);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('resolves referenced request body schema', async () => {
    const requestBody = {
      $ref: '#/components/requestBodies/RequestBody'
    };

    expect(
      parseRequestBodies(
        requestBody,
        await createTestRefs({
          requestBodies: {
            RequestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }),
        defaultOptions
      )
    ).toEqual([
      {
        schema: { type: 'string' },
        mediaType: 'application/json',
        encoding: undefined,
        description: undefined,
        required: false
      }
    ]);
  });

  it('resolves referenced schema', async () => {
    const schema = {
      $ref: '#/components/schemas/TestEntity'
    };
    const requestBody = {
      content: {
        'application/json': { schema }
      },
      required: true
    };

    const schemaNaming = {
      schemaName: 'TestEntity',
      fileName: 'test-entity'
    };

    expect(
      parseRequestBodies(
        requestBody,
        await createTestRefs({ schemas: { TestEntity: { type: 'string' } } }),
        defaultOptions
      )
    ).toEqual([
      {
        schema: { ...schema, ...schemaNaming },
        mediaType: 'application/json',
        encoding: undefined,
        description: undefined,
        required: true
      }
    ]);
  });
  it('parses every supported request body media type', async () => {
    const requestBodies = parseRequestBodies(
      {
        required: true,
        content: {
          'Application/JSON; charset=utf-8': { schema: { type: 'object' } },
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: { file: { type: 'string', format: 'binary' } }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(requestBodies).toHaveLength(2);
    expect(requestBodies[0]).toEqual({
      schema: { properties: [], additionalProperties: { type: 'any' } },
      mediaType: 'application/json',
      encoding: undefined,
      description: undefined,
      required: true
    });
    expect(requestBodies[1]).toEqual(
      expect.objectContaining({
        mediaType: 'multipart/form-data',
        required: true,
        encoding: expect.objectContaining({
          file: expect.objectContaining({
            contentType: 'application/octet-stream'
          })
        })
      })
    );
  });
  it('omits unsupported variants when a supported variant exists', async () => {
    const requestBodies = parseRequestBodies(
      {
        content: {
          'application/json': { schema: { type: 'object' } },
          'application/xml': { schema: { type: 'string' } }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(requestBodies).toHaveLength(1);
    expect(requestBodies[0]).toEqual({
      schema: { properties: [], additionalProperties: { type: 'any' } },
      mediaType: 'application/json',
      encoding: undefined,
      description: undefined,
      required: false
    });
  });

  it('retains the any/application-json fallback for unsupported-only content', async () => {
    const requestBodies = parseRequestBodies(
      {
        content: { 'application/xml': { schema: { type: 'string' } } }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(requestBodies).toEqual([
      {
        schema: { type: 'any' },
        mediaType: 'application/json',
        description: undefined,
        required: false
      }
    ]);
  });
});
