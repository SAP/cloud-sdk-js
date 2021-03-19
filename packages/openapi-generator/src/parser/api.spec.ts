import { OpenAPIV3 } from 'openapi-types';
import { apiNameExtension } from '../../dist/parser/extensions';
import { createRefs, emptyDocument } from '../../test/test-util';
import { parseApis } from './api';

describe('parseApis', () => {
  it('parses APIs without paths', async () => {
    expect(parseApis(emptyDocument, await createRefs({}))).toStrictEqual([]);
  });

  it('parses APIs based on tags', async () => {
    const document: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {
        '/x': {
          get: {
            tags: ['api1'],
            operationId: 'getX'
          },
          post: {
            tags: ['api2'],
            operationId: 'createX'
          }
        },
        '/y': {
          get: {
            tags: ['api1'],
            operationId: 'getY'
          },
          post: {
            tags: ['api2'],
            operationId: 'createY'
          }
        },
        '/z': {
          get: {
            operationId: 'getZ'
          }
        }
      }
    };
    expect(parseApis(document, await createRefs({}))).toStrictEqual([
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

  it('parses APIs based on extensions', async () => {
    const document = {
      ...emptyDocument,
      [apiNameExtension]: 'root',
      paths: {
        '/x': {
          [apiNameExtension]: 'path',
          get: {
            tags: ['api1'],
            [apiNameExtension]: 'operationWithTag',
            operationId: 'operationWithTagOperation'
          },
          post: {
            [apiNameExtension]: 'operationWithoutTag',
            operationId: 'operationWithoutTagOperation'
          },
          delete: {
            operationId: 'pathOperation'
          }
        },
        '/y': {
          get: {
            tags: ['api1'],
            operationId: 'rootOperation'
          }
        }
      }
    };
    expect(parseApis(document, await createRefs({}))).toStrictEqual([
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
});
