import {
  CreateFileOptions,
  readPrettierConfig
} from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiDocument } from '../openapi-types';
import { apiIndexFile, schemaIndexFile } from './index-file';

it('apiIndexFile serializes the api index file with referenced schemas', () => {
  const document = {
    apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
    schemas: [{}]
  } as OpenApiDocument;
  expect(apiIndexFile(document)).toMatchSnapshot();
});

it('apiIndexFile serializes the api index file without referenced schemas', () => {
  const document = {
    apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
    schemas: []
  } as unknown as OpenApiDocument;
  expect(apiIndexFile(document)).toMatchSnapshot();
});

it('schemaIndexFile serializes the schema index file for schemas in a document', () => {
  const document = {
    apis: [],
    schemas: [
      { schemaName: 'MySchema1', fileName: 'my-schema-1' },
      { schemaName: 'MySchema2', fileName: 'some-other-name' }
    ]
  } as unknown as OpenApiDocument;
  expect(schemaIndexFile(document)).toMatchSnapshot();
});

it('apiIndexFile serializes the schema index file following the esm format', async () => {
  const document = {
    apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
    schemas: [{}]
  } as OpenApiDocument;

  const createFileOptions: CreateFileOptions = {
    generateESM: true,
    overwrite: false,
    prettierOptions: await readPrettierConfig(undefined)
  };
  expect(apiIndexFile(document, createFileOptions)).toMatchSnapshot();
});
