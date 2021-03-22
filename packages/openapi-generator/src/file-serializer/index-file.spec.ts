import { OpenApiDocument } from '../openapi-types';
import { apiIndexFile, modelIndexFile } from './index-file';

it('apiIndexFile serializes the api index file with referenced schemas', () => {
  const document = {
    apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
    schemas: [{}]
  } as OpenApiDocument;
  expect(apiIndexFile(document)).toMatchInlineSnapshot(`
    "    export * from './test-api';
        export * from './default-api';
        export * from './model';"
  `);
});

it('apiIndexFile serializes the api index file without referenced schemas', () => {
  const document = ({
    apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
    schemas: []
  } as unknown) as OpenApiDocument;
  expect(apiIndexFile(document)).toMatchInlineSnapshot(`
    "    export * from './test-api';
        export * from './default-api';"
  `);
});

it('modelIndexFile serializes the model index file for schemas in a document', () => {
  const document = ({
    apis: [],
    schemas: [{ name: 'MySchema1' }, { name: 'MySchema2' }]
  } as unknown) as OpenApiDocument;
  expect(modelIndexFile(document)).toMatchInlineSnapshot(`
    "    export * from './my-schema-1';
        export * from './my-schema-2';"
  `);
});
