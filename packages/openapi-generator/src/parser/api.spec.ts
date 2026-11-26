import { createTestRefs, emptyDocument } from '../../test/test-util';
import { apiNameExtension } from '../extensions';
import { parseApis } from './api';
import { createRefs } from './refs';
import type { OpenAPIV3 } from 'openapi-types';

const options = { strictNaming: true, schemaPrefix: '', resolveExternal: true };
describe('parseApis', () => {
  it('returns no APIs for a document without paths (OpenAPI 3.1 schemas-only)', async () => {
    const refs = await createTestRefs();
    expect(parseApis(emptyDocument, refs, options)).toEqual([]);
  });

  it('throws an error if paths are present but contain no operations', async () => {
    const refs = await createTestRefs();
    expect(() =>
      parseApis({ ...emptyDocument, paths: { '/x': {} } }, refs, options)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not parse APIs. The document does not contain any operations."'
    );
  });

  it('parses APIs based on tags', async () => {
    const document: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {
        '/x': {
          get: {
            tags: ['api1'],
            responses: { 200: { description: 'some response description' } },
            operationId: 'getX'
          },
          post: {
            tags: ['api2'],
            responses: { 200: { description: 'some response description' } },
            operationId: 'createX'
          }
        },
        '/y': {
          get: {
            tags: ['api1'],
            responses: { 200: { description: 'some response description' } },
            operationId: 'getY'
          },
          post: {
            tags: ['api2'],
            responses: { 200: { description: 'some response description' } },
            operationId: 'createY'
          }
        },
        '/z': {
          get: {
            operationId: 'getZ',
            responses: { 200: { description: 'some response description' } }
          }
        }
      }
    };

    expect(
      parseApis(document, await createRefs(document, options), options)
    ).toStrictEqual([
      {
        name: 'Api1Api',
        operations: [
          expect.objectContaining({
            operationId: 'getX'
          }),
          expect.objectContaining({
            operationId: 'getY'
          })
        ]
      },
      {
        name: 'Api2Api',
        operations: [
          expect.objectContaining({
            operationId: 'createX'
          }),
          expect.objectContaining({
            operationId: 'createY'
          })
        ]
      },
      {
        name: 'DefaultApi',
        operations: [
          expect.objectContaining({
            operationId: 'getZ'
          })
        ]
      }
    ]);
  });

  it('preserves first-pass names when operation IDs are deduplicated', async () => {
    const document: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {
        '/duplicates': {
          get: {
            tags: ['duplicates'],
            operationId: 'duplicateOperationId',
            responses: { 200: { description: 'ok' } }
          },
          post: {
            tags: ['duplicates'],
            operationId: 'duplicateOperationId',
            responses: { 200: { description: 'ok' } }
          },
          put: {
            tags: ['duplicates'],
            operationId: 'duplicateOperationId_1',
            responses: { 200: { description: 'ok' } }
          },
          patch: {
            tags: ['duplicates'],
            operationId: 'duplicateOperationId1',
            responses: { 200: { description: 'ok' } }
          }
        }
      }
    };
    const nonStrictOptions = { ...options, strictNaming: false };

    expect(
      parseApis(
        document,
        await createRefs(document, nonStrictOptions),
        nonStrictOptions
      )[0].operations.map(({ operationId }) => operationId)
    ).toEqual([
      'duplicateOperationId',
      'duplicateOperationId1_1',
      'duplicateOperationId_1',
      'duplicateOperationId1'
    ]);
  });
  it('generates a named operation for every request body media type', async () => {
    const document: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {
        '/predict': {
          post: {
            tags: ['predict'],
            operationId: 'predict',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { rows: { type: 'array' } }
                  }
                },
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: { file: { type: 'string', format: 'binary' } }
                  }
                }
              }
            },
            responses: { 200: { description: 'ok' } }
          }
        }
      }
    };

    const operations = parseApis(
      document,
      await createRefs(document, options),
      options
    )[0].operations;

    expect(
      operations.map(operation => [
        operation.operationId,
        operation.requestBody?.mediaType
      ])
    ).toEqual([
      ['predictWithJson', 'application/json'],
      ['predictWithMultipartFormData', 'multipart/form-data']
    ]);
    const requestBody = document.paths!['/predict']!.post!
      .requestBody as OpenAPIV3.RequestBodyObject;
    const reversedDocument: OpenAPIV3.Document = {
      ...document,
      paths: {
        '/predict': {
          post: {
            ...document.paths!['/predict']!.post,
            requestBody: {
              ...requestBody,
              content: {
                'multipart/form-data':
                  requestBody.content!['multipart/form-data'],
                'application/json': requestBody.content!['application/json']
              }
            }
          }
        }
      }
    };
    const reversedOperations = parseApis(
      reversedDocument,
      await createRefs(reversedDocument, options),
      options
    )[0].operations;

    expect(
      reversedOperations
        .map(operation => [
          operation.operationId,
          operation.requestBody?.mediaType
        ])
        .sort()
    ).toEqual([
      ['predictWithJson', 'application/json'],
      ['predictWithMultipartFormData', 'multipart/form-data']
    ]);
  });

  it('parses APIs based on extensions', async () => {
    interface ExtensionType {
      [apiNameExtension]?: string;
    }
    type DocumentWithExtensions<T extends ExtensionType> = Omit<
      OpenAPIV3.Document<T>,
      'paths'
    > &
      ExtensionType & { paths: OpenAPIV3.PathsObject<T, ExtensionType> };
    const document: DocumentWithExtensions<ExtensionType> = {
      ...emptyDocument,
      [apiNameExtension]: 'root',
      paths: {
        '/x': {
          [apiNameExtension]: 'path',
          get: {
            tags: ['api1'],
            [apiNameExtension]: 'operationWithTag',
            operationId: 'operationWithTagOperation',
            responses: { 200: { description: 'some response description' } }
          },
          post: {
            [apiNameExtension]: 'operationWithoutTag',
            operationId: 'operationWithoutTagOperation',
            responses: { 200: { description: 'some response description' } }
          },
          delete: {
            operationId: 'pathOperation',
            responses: { 200: { description: 'some response description' } }
          }
        },
        '/y': {
          get: {
            tags: ['api1'],
            operationId: 'rootOperation',
            responses: { 200: { description: 'some response description' } }
          }
        }
      }
    };

    expect(
      parseApis(document, await createRefs(document, options), options)
    ).toStrictEqual([
      {
        name: 'OperationWithTagApi',
        operations: [
          expect.objectContaining({
            operationId: 'operationWithTagOperation'
          })
        ]
      },
      {
        name: 'OperationWithoutTagApi',
        operations: [
          expect.objectContaining({
            operationId: 'operationWithoutTagOperation'
          })
        ]
      },
      {
        name: 'PathApi',
        operations: [
          expect.objectContaining({
            operationId: 'pathOperation'
          })
        ]
      },
      {
        name: 'RootApi',
        operations: [
          expect.objectContaining({
            operationId: 'rootOperation'
          })
        ]
      }
    ]);
  });

  it("parses API names without trailing 'api'", async () => {
    interface DocumentWithExtensions extends OpenAPIV3.Document {
      [apiNameExtension]: string;
    }
    const document: DocumentWithExtensions = {
      ...emptyDocument,
      [apiNameExtension]: 'RootApi',
      paths: {
        '/x': {
          get: {
            tags: [],
            responses: { 200: { description: 'some response description' } },
            operationId: 'someOperation'
          }
        }
      }
    };

    expect(
      parseApis(document, await createRefs(document, options), options)
    ).toStrictEqual([
      {
        name: 'RootApi',
        operations: [
          expect.objectContaining({
            operationId: 'someOperation'
          })
        ]
      }
    ]);
  });
});
