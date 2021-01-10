import { createRefs, emptyApiDefinition } from '../../test/test-util';
import { parseAllOperations, parseOpenApiDocument } from './document';

describe('parseOpenApiDocument', () => {
  it('does not modify input service specification', () => {
    const input = {
      ...emptyApiDefinition,
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
          npmPackageName: '@sap/cloud-sdk-openapi-vdm-test-service',
          directoryName: 'test-service'
        }
      }
    );

    expect(input).toStrictEqual(clonedInput);
    expect(parsedDocument).not.toBe(input);
  });
});

describe('parseAllOperations', () => {
  it('returns empty array when there are no paths', async () => {
    expect(parseAllOperations(emptyApiDefinition, await createRefs())).toEqual(
      []
    );
  });

  it('returns and operation for every existing path', async () => {
    const apiDefinition = {
      ...emptyApiDefinition,
      paths: {
        '/entity': {
          get: {},
          post: {}
        },
        '/entity/{placeholder}': {
          get: {},
          post: {},
          delete: {}
        }
      }
    };
    expect(
      parseAllOperations(apiDefinition, await createRefs()).length
    ).toEqual(5);
  });
});
