import { createRefs, emptyApiDefinition } from '../../test/test-util';
import { OpenApiDocument, OpenApiOperation } from '../openapi-types';
import {
  collectTags,
  parseAllOperations,
  parseOpenApiDocument
} from './document';

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

  it('parse service mapping information from a given object', async () => {
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
    const serviceName = 'TestService';
    const npmPackageName = '@sap/cloud-sdk-openapi-vdm-test-service';
    const directoryName = 'test-service-dir';
    const originalFileName = 'test-service';

    const parsedDocument = await parseOpenApiDocument(
      input,
      serviceName,
      `../../../../test-resources/openapi-service-specs/${originalFileName}.json`,
      {
        'test-service': {
          npmPackageName,
          directoryName
        }
      }
    );
    const serviceMappingInfo: Partial<OpenApiDocument> = {
      npmPackageName,
      directoryName,
      originalFileName
    };
    expect(parsedDocument).toMatchObject(
      expect.objectContaining(serviceMappingInfo)
    );
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

describe('collectTags', () => {
  it('should collect tags from all operations', async () => {
    const operations: OpenApiOperation[] = [
      {
        tags: ['tag']
      },
      {
        tags: ['default']
      },
      {
        tags: ['default']
      }
    ] as OpenApiOperation[];
    expect(collectTags(operations)).toEqual(['tag', 'default']);
  });
});
