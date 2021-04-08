import { OpenAPIV3 } from 'openapi-types';
import { emptyDocument } from '../../test/test-util';
import { OpenApiObjectSchema } from '../openapi-types';
import { parseOpenApiDocument } from './document';

describe('parseOpenApiDocument', () => {
  it('does not modify input service specification', () => {
    const input = {
      ...emptyDocument,
      paths: {
        '/entity': {
          parameters: [{ name: 'param1', in: 'query' }],
          get: {
            parameters: [{ name: 'param2', in: 'query' }]
          }
        }
      }
    };

    const clonedInput = JSON.parse(JSON.stringify(input));
    const parsedDocument = parseOpenApiDocument(
      input,
      'TestService',
      'openapi/test-service.json',
      {
        'test-service': {
          npmPackageName: '@sap/cloud-sdk-openapi-test-service',
          directoryName: 'test-service'
        }
      }
    );

    expect(input).toStrictEqual(clonedInput);
    expect(parsedDocument).not.toBe(input);
  });

  it('parses unique api names', async () => {
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

    const parsedDocument = await parseOpenApiDocument(
      input,
      'TestService',
      'openapi/test-service.json',
      {
        'test-service': {
          npmPackageName: '@sap/cloud-sdk-openapi-test-service',
          directoryName: 'test-service'
        }
      }
    );

    expect(parsedDocument.schemas.map(schema => schema.name)).toEqual([
      'MySchema1',
      'MySchema'
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
      'myService',
      'myFile.json',
      {}
    );
    expect(parsed.schemas).toStrictEqual([
      {
        description: 'Schema Description',
        name: 'SimpleSchema',
        schema: { type: 'string' }
      }
    ]);
  });

  it('parses object schemas with description referenced', async () => {
    const components: OpenAPIV3.ComponentsObject = {
      schemas: {
        PropertySchema: {
          description: 'Property Description',
          type: 'string'
        },
        ObjectSchema: {
          description: 'Object Description',
          type: 'object',
          properties: {
            prop1: {
              $ref: '#/components/schemas/PropertySchema'
            }
          }
        }
      }
    };

    const document: OpenAPIV3.Document = getDocument(
      getResponse('ObjectSchema'),
      components
    );

    const parsed = await parseOpenApiDocument(
      document,
      'myService',
      'myFile.json',
      {}
    );
    const objectSchema = parsed.schemas.find(
      schema => schema.name === 'ObjectSchema'
    );
    const propertySchema = parsed.schemas.find(
      schema => schema.name === 'PropertySchema'
    );
    expect(objectSchema!.description).toBe('Object Description');
    expect(
      (objectSchema!.schema as OpenApiObjectSchema).properties[0].description
    ).toBeUndefined();
    expect(propertySchema!.description).toBe('Property Description');
  });

  it('parses object schemas with description inline', async () => {
    const components: OpenAPIV3.ComponentsObject = {
      schemas: {
        ObjectSchema: {
          description: 'Object Description',
          type: 'object',
          properties: {
            prop1: {
              description: 'Property Description',
              type: 'string'
            }
          }
        }
      }
    };

    const document: OpenAPIV3.Document = getDocument(
      getResponse('ObjectSchema'),
      components
    );

    const parsed = await parseOpenApiDocument(
      document,
      'myService',
      'myFile.json',
      {}
    );
    const objectSchema = parsed.schemas.find(
      schema => schema.name === 'ObjectSchema'
    );
    expect(objectSchema!.description).toBe('Object Description');
    expect(
      (objectSchema!.schema as OpenApiObjectSchema).properties[0].description
    ).toBe('Property Description');
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
