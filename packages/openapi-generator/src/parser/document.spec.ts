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
});
