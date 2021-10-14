import { OpenAPIV3 } from 'openapi-types';
import { createTestRefs, emptyDocument } from '../../test/test-util';
import { apiNameExtension } from '../extensions';
import { parseApis } from './api';
import { createRefs } from './refs';

const options = { strictNaming: true };
describe('parseApis', () => {
  it('throws an error if there are APIs without paths', async () => {
    const refs = await createTestRefs();
    expect(() =>
      parseApis(emptyDocument, refs, options)
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

  it('parses APIs based on extensions', async () => {
    interface ExtensionType {
      [apiNameExtension]?: string;
    }
    type DocumentWithExtensions<T> = Omit<OpenAPIV3.Document<T>, 'paths'> &
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
