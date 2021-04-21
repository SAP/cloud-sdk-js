import { OpenAPIV3 } from 'openapi-types';
import { emptyDocument } from '../../test/test-util';
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

    expect(parsedDocument.schemas).toEqual([
      expect.objectContaining({
        fileName: 'my-schema-1',
        schemaName: 'MySchema1'
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
      'myService',
      'myFile.json',
      {}
    );
    expect(parsed.schemas).toStrictEqual([
      {
        description: 'Schema Description',
        schemaName: 'SimpleSchema',
        fileName: 'simple-schema',
        schema: { type: 'string' }
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

    expect(parsedDocument.schemas).toEqual([
      expect.objectContaining({ fileName: 'index1', schemaName: 'Index' })
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
