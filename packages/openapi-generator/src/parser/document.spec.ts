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
