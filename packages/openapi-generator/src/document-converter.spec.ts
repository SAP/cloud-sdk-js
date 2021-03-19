import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { emptyApiDefinition } from '../test/test-util';
import {
  convertDocToOpenApiV3,
  parseFileAsJson,
  convertDocWithApiNameTag
} from './document-converter';

const jsonContent = { test: 'test' };
const files = {
  '/path/spec.json': JSON.stringify(jsonContent),
  '/path/spec.yaml': 'test: test',
  '/path/spec.yml': 'test: test',
  '/path/no-extension': 'test',
  '/path/other-extension.test': 'test'
};

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockImplementation(path => files[path])
  }
}));

describe('convertDocWithApiNameTag', () => {
  it('should use api name extensions when provided', () => {
    const originalSpec = {
      ...emptyApiDefinition,
      tags: [{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag' }],
      paths: {
        '/pattern1': {
          'x-sap-cloud-sdk-api-name': 'api1',
          get: {
            tags: []
          },
          post: {
            tags: ['tag']
          }
        },
        '/pattern1/pattern2': {
          'x-sap-cloud-sdk-api-name': 'api2',
          get: {},
          post: {
            tags: ['tag']
          }
        }
      }
    };
    const newSpec = convertDocWithApiNameTag(originalSpec);

    expect(newSpec).toEqual({
      ...emptyApiDefinition,
      tags: [{ name: 'api1' }, { name: 'api2' }],
      paths: {
        '/pattern1': {
          'x-sap-cloud-sdk-api-name': 'api1',
          get: {
            tags: ['api1']
          },
          post: {
            tags: ['api1']
          }
        },
        '/pattern1/pattern2': {
          'x-sap-cloud-sdk-api-name': 'api2',
          get: {
            tags: ['api2']
          },
          post: {
            tags: ['api2']
          }
        }
      }
    });
  });

  it('does not change the spec when tags are provided but api name extensions are missing', () => {
    const originalSpec = {
      ...emptyApiDefinition,
      tags: [{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag' }],
      paths: {
        '/pattern1': {
          get: {
            tags: ['tag1', 'tag2']
          },
          post: {
            tags: ['tag']
          }
        },
        '/pattern1/pattern2': {
          post: {
            tags: ['tag']
          }
        }
      }
    };
    const oldSpec = JSON.parse(JSON.stringify(originalSpec));
    const newSpec = convertDocWithApiNameTag(originalSpec);

    expect(newSpec).toEqual(oldSpec);
  });

  it('should use default tag as fallback', () => {
    const originalSpec = {
      ...emptyApiDefinition,
      tags: [{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag' }],
      paths: {
        '/pattern1': {
          get: {
            tags: []
          },
          post: {
            tags: ['tag']
          }
        },
        '/pattern1/pattern2': {
          get: {},
          post: {
            tags: ['tag']
          }
        }
      }
    };
    const newSpec = convertDocWithApiNameTag(originalSpec);

    expect(newSpec).toEqual({
      ...emptyApiDefinition,
      tags: [{ name: 'default' }, { name: 'tag' }],
      paths: {
        '/pattern1': {
          get: {
            tags: ['default']
          },
          post: {
            tags: ['tag']
          }
        },
        '/pattern1/pattern2': {
          get: {
            tags: ['default']
          },
          post: {
            tags: ['tag']
          }
        }
      }
    });
  });
});

describe('convertDocToOpenApiV3', () => {
  const swaggerDoc: OpenAPIV2.Document = {
    info: { title: 'Test Service', version: '1.0.0' },
    swagger: '2.0',
    paths: {
      'path/{pathParam}': {
        parameters: [
          {
            in: 'path',
            name: 'pathParam',
            required: true,
            type: 'string'
          }
        ],
        post: {
          operationId: 'postPathByPathParam',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'query',
              name: 'queryParam',
              type: 'integer'
            },
            {
              in: 'body',
              name: 'bodyParam',
              schema: {
                $ref: '#/components/schemas/TestItem'
              }
            }
          ],

          responses: {
            200: {
              description: 'response',
              schema: {
                type: 'array',
                items: {
                  $ref: '#/definitions/TestItem'
                }
              }
            }
          }
        }
      }
    },
    definitions: {
      TestItem: {
        properties: {
          someProperty: {
            type: 'string'
          }
        }
      }
    }
  };

  const openApiDoc: OpenAPIV3.Document = {
    info: { title: 'Test Service', version: '1.0.0' },
    openapi: '3.0.0',
    paths: {
      'path/{pathParam}': {
        parameters: [
          {
            in: 'path',
            name: 'pathParam',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        post: {
          operationId: 'postPathByPathParam',
          parameters: [
            {
              in: 'query',
              name: 'queryParam',
              schema: {
                type: 'integer'
              }
            }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestItem'
                }
              }
            }
          },
          responses: {
            200: {
              description: 'response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/TestItem'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        TestItem: {
          properties: {
            someProperty: {
              type: 'string'
            }
          }
        }
      }
    }
  };

  it('converts Swagger documents to OpenApi', async () => {
    expect(await convertDocToOpenApiV3(swaggerDoc)).toStrictEqual(openApiDoc);
  });

  it('does not change OpenApi documents', async () => {
    expect(await convertDocToOpenApiV3(openApiDoc)).toStrictEqual(openApiDoc);
  });
});

describe('parseFileAsJson', () => {
  it('does not throw error for JSON or YAML files', async () => {
    expect(await parseFileAsJson('/path/spec.json')).toStrictEqual(jsonContent);
    expect(await parseFileAsJson('/path/spec.yaml')).toStrictEqual(jsonContent);
    expect(await parseFileAsJson('/path/spec.yml')).toStrictEqual(jsonContent);
  });

  it('throws an error for non JSON or YAML files', async () => {
    await expect(() =>
      parseFileAsJson('/path/no-extension')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not parse OpenAPI specification at /path/no-extension. Only JSON and YAML files are allowed."'
    );
    await expect(() =>
      parseFileAsJson('/path/other-extension.test')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not parse OpenAPI specification at /path/other-extension.test. Only JSON and YAML files are allowed."'
    );
  });
});
