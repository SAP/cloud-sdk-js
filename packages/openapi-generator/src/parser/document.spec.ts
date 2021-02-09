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
  it('should collect tags from root and operations', async () => {
    const apiDefinition = {
      ...emptyApiDefinition,
      tags: [{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag3' }]
    };
    const operations: OpenApiOperation[] = [
      {
        tags: ['tag3'],
        operationId: '',
        method: 'get',
        path: '/entity',
        parameters: []
      },
      {
        tags: ['tag4'],
        operationId: '',
        method: 'put',
        path: '/entity',
        parameters: []
      }
    ];
    expect(collectTags(apiDefinition, operations).length).toEqual(4);
  });

  it('should collect tags from operations, when root has no tags', async () => {
    const apiDefinition = {
      ...emptyApiDefinition
    };
    const operations: OpenApiOperation[] = [
      {
        tags: ['tag1'],
        operationId: '',
        method: 'get',
        path: '/entity',
        parameters: []
      }
    ];
    expect(collectTags(apiDefinition, operations).length).toEqual(1);
  });

  it('should collect tags from root, when no tags are used in the operations', async () => {
    const apiDefinition = {
      ...emptyApiDefinition,
      tags: [{ name: 'tag1' }, { name: 'tag2' }]
    };
    expect(collectTags(apiDefinition, []).length).toEqual(2);
  });
});
