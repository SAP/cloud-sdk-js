import { createLogger } from '@sap-cloud-sdk/util';
import { emptyDocument } from '../../test/test-util';
import { parseOpenApiDocument } from './document';
import * as api from './api';
import type { ServiceOptions } from '@sap-cloud-sdk/generator-common/dist/options-per-service';
import type { OpenAPIV3 } from 'openapi-types';

const options = { strictNaming: true, schemaPrefix: '', resolveExternal: true };
describe('parseOpenApiDocument()', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not modify input service specification', () => {
    const input: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {
        '/entity': {
          parameters: [{ name: 'param1', in: 'query' }],
          get: {
            parameters: [{ name: 'param2', in: 'query' }],
            responses: { 200: { description: 'some response description' } }
          }
        }
      }
    };

    const clonedInput = JSON.parse(JSON.stringify(input));
    const parsedDocument = parseOpenApiDocument(
      input,
      {
        packageName: '@sap/cloud-sdk-openapi-test-service',
        directoryName: 'test-service'
      },
      options
    );

    expect(input).toStrictEqual(clonedInput);
    expect(parsedDocument).not.toBe(input);
  });

  it('parses unique schema names', async () => {
    const input: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {},
      components: {
        schemas: {
          'my-schema': { type: 'string' },
          MySchema: { type: 'number' }
        }
      }
    };

    jest.spyOn(api, 'parseApis').mockImplementation();

    const parsedDocument = await parseOpenApiDocument(
      input,
      {
        packageName: '@sap/cloud-sdk-openapi-test-service',
        directoryName: 'test-service'
      },
      { strictNaming: false, schemaPrefix: '', resolveExternal: true }
    );

    expect(parsedDocument.schemas).toEqual([
      expect.objectContaining({
        fileName: 'my-schema-1',
        schemaName: 'MySchema_1'
      }),
      expect.objectContaining({
        fileName: 'my-schema',
        schemaName: 'MySchema'
      })
    ]);
  });

  it('parses simple schema with description', async () => {
    const components: OpenAPIV3.ComponentsObject = {
      schemas: {
        SimpleSchema: {
          description: 'Schema Description',
          type: 'string'
        }
      }
    };

    const document: OpenAPIV3.Document = getDocument(
      getResponse('SimpleSchema'),
      components
    );

    const parsed = await parseOpenApiDocument(
      document,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );
    expect(parsed.schemas).toStrictEqual([
      {
        description: 'Schema Description',
        schemaName: 'SimpleSchema',
        fileName: 'simple-schema',
        nullable: false,
        schema: {
          type: 'string'
        },
        schemaProperties: {}
      }
    ]);
  });

  it('parses discriminator schema with circular references', async () => {
    const components: OpenAPIV3.ComponentsObject = {
      schemas: {
        DiscriminatorSchema: {
          properties: {
            discriminatingProp: { type: 'string' }
          },
          discriminator: {
            propertyName: 'discriminatingProp',
            mapping: {
              a: '#/components/schemas/SchemaA'
            }
          },
          required: ['discriminatingProp']
        },
        SchemaA: {
          allOf: [
            { $ref: '#/components/schemas/DiscriminatorSchema' },
            {
              properties: {
                b: { type: 'string' }
              },
              additionalProperties: false
            }
          ]
        }
      }
    };

    const document: OpenAPIV3.Document = getDocument(
      getResponse('DiscriminatorSchema'),
      components
    );

    const parsed = await parseOpenApiDocument(
      document,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );
    expect(parsed.schemas).toStrictEqual([
      {
        description: undefined,
        schemaName: 'DiscriminatorSchema',
        fileName: 'discriminator-schema',
        nullable: false,
        schema: {
          oneOf: [],
          discriminator: {
            propertyName: 'discriminatingProp',
            mapping: {
              a: {
                $ref: '#/components/schemas/SchemaA',
                fileName: 'schema-a',
                schemaName: 'SchemaA'
              }
            }
          }
        },
        schemaProperties: {}
      },
      {
        description: undefined,
        schemaName: 'SchemaA',
        fileName: 'schema-a',
        nullable: false,
        schema: {
          allOf: [
            {
              properties: [
                {
                  name: 'discriminatingProp',
                  description: undefined,
                  nullable: false,
                  required: true,
                  schema: {
                    type: 'string'
                  },
                  schemaProperties: {}
                }
              ]
            },
            {
              properties: [
                {
                  name: 'b',
                  description: undefined,
                  nullable: false,
                  required: false,
                  schema: {
                    type: 'string'
                  },
                  schemaProperties: {}
                }
              ]
            }
          ]
        },
        schemaProperties: {}
      }
    ]);
  });

  it('parses simple object persisted schema with nullable', async () => {
    const components: OpenAPIV3.ComponentsObject = {
      schemas: {
        SimpleSchema: {
          description: 'Schema Description',
          type: 'object',
          nullable: true,
          properties: {
            prop1: { type: 'string' }
          }
        }
      }
    };

    const document: OpenAPIV3.Document = getDocument(
      getResponse('SimpleSchema'),
      components
    );

    const parsed = await parseOpenApiDocument(
      document,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );
    expect(parsed.schemas).toStrictEqual([
      {
        description: 'Schema Description',
        schemaName: 'SimpleSchema',
        fileName: 'simple-schema',
        schema: {
          additionalProperties: {
            type: 'any'
          },
          properties: [
            {
              description: undefined,
              name: 'prop1',
              nullable: false,
              required: false,
              schema: {
                type: 'string'
              },
              schemaProperties: {}
            }
          ]
        },
        nullable: true,
        schemaProperties: {}
      }
    ]);
  });

  it('parses a nullable persisted schema declared via a null type array (OpenAPI 3.1)', async () => {
    const input = {
      ...emptyDocument,
      openapi: '3.1.0',
      paths: {},
      components: {
        schemas: {
          NullableString: { type: ['string', 'null'] }
        }
      }
    } as any;

    const parsed = await parseOpenApiDocument(
      input,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );

    expect(parsed.schemas).toStrictEqual([
      {
        description: undefined,
        schemaName: 'NullableString',
        fileName: 'nullable-string',
        nullable: true,
        schema: { type: 'string' },
        schemaProperties: {}
      }
    ]);
  });

  it('generates only schema models for a paths-less OpenAPI 3.1 document', async () => {
    const input = {
      ...emptyDocument,
      openapi: '3.1.0',
      components: {
        schemas: {
          SimpleSchema: { type: 'string' }
        }
      }
    } as any;
    delete input.paths;

    const parsed = await parseOpenApiDocument(
      input,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );

    expect(parsed.apis).toEqual([]);
    expect(parsed.schemas).toHaveLength(1);
  });

  it("escapes 'index' as file name, but not as schema name", async () => {
    const input: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {},
      components: {
        schemas: {
          Index: { type: 'string' }
        }
      }
    };

    jest.spyOn(api, 'parseApis').mockImplementation();

    const parsedDocument = await parseOpenApiDocument(
      input,
      {
        packageName: '@sap/cloud-sdk-openapi-test-service',
        directoryName: 'test-service'
      },
      { strictNaming: false, schemaPrefix: '', resolveExternal: true }
    );

    expect(parsedDocument.schemas).toEqual([
      expect.objectContaining({ fileName: 'index-1', schemaName: 'Index' })
    ]);
  });

  it('warns when components/pathItems are present (OpenAPI 3.1)', async () => {
    const logger = createLogger('openapi-generator');
    jest.spyOn(logger, 'warn');
    const input = {
      ...emptyDocument,
      openapi: '3.1.0',
      paths: {},
      components: {
        pathItems: {
          '/shared-path': {
            get: {
              operationId: 'sharedGet',
              responses: { '200': { description: 'ok' } }
            }
          }
        }
      }
    } as any;

    await parseOpenApiDocument(
      input,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('components/pathItems')
    );
  });

  it('does not warn about components/pathItems when they are absent', async () => {
    const logger = createLogger('openapi-generator');
    jest.spyOn(logger, 'warn');
    const input = {
      ...emptyDocument,
      openapi: '3.1.0',
      paths: {},
      components: { schemas: { Foo: { type: 'string' } } }
    } as any;

    await parseOpenApiDocument(
      input,
      { directoryName: 'myService' } as ServiceOptions,
      options
    );

    expect(logger.warn).not.toHaveBeenCalledWith(
      expect.stringContaining('components/pathItems')
    );
  });

  function getDocument(
    responseObject: OpenAPIV3.ResponseObject,
    components: OpenAPIV3.ComponentsObject
  ): OpenAPIV3.Document {
    return {
      ...emptyDocument,
      paths: {
        '/entity': {
          parameters: [{ name: 'param1', in: 'query' }],
          get: {
            parameters: [{ name: 'param2', in: 'query' }],
            responses: { '200': responseObject }
          }
        }
      },
      components
    };
  }

  function getResponse(schemaName: string): OpenAPIV3.ResponseObject {
    return {
      description: 'Response description',
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${schemaName}`
          }
        }
      }
    };
  }
});
