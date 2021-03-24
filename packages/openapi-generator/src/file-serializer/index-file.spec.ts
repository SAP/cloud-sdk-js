import { OpenApiDocument } from '../openapi-types';
import { apiIndexFile, schemaIndexFile } from './index-file';

it('apiIndexFile serializes the api index file with referenced schemas', () => {
  const document = {
    apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
    schemas: [{}]
  } as OpenApiDocument;
  expect(apiIndexFile(document)).toMatchInlineSnapshot(`
    "    export * from './test-api';
        export * from './default-api';
        export * from './schema';"
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

it('schemaIndexFile serializes the schema index file for schemas in a document', () => {
  const document = ({
    apis: [],
    schemas: [{ name: 'MySchema1' }, { name: 'MySchema2' }]
  } as unknown) as OpenApiDocument;
  expect(schemaIndexFile(document)).toMatchInlineSnapshot(`
    "    export * from './my-schema-1';
        export * from './my-schema-2';"
  `);
});
