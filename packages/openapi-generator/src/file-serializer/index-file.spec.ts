import { readPrettierConfig } from '@sap-cloud-sdk/generator-common/internal';
import { apiIndexFile, schemaIndexFile } from './index-file';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';
import type { OpenApiDocument } from '../openapi-types';

describe('index-file', () => {
  describe('apiIndexFile', () => {
    it('serializes the api index file with referenced schemas', () => {
      const document = {
        apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
        schemas: [{}]
      } as OpenApiDocument;
      expect(apiIndexFile(document)).toMatchSnapshot();
    });

    it('serializes the api index file following the esm format', async () => {
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

    it('serializes the api index file without referenced schemas', () => {
      const document = {
        apis: [{ name: 'TestApi' }, { name: 'DefaultApi' }],
        schemas: []
      } as unknown as OpenApiDocument;
      expect(apiIndexFile(document)).toMatchSnapshot();
    });
  });

  describe('schemaIndexFile', () => {
    it('serializes the schema index file for schemas in a document', () => {
      const document = {
        apis: [],
        schemas: [
          { schemaName: 'MySchema1', fileName: 'my-schema-1' },
          { schemaName: 'MySchema2', fileName: 'some-other-name' }
        ]
      } as unknown as OpenApiDocument;
      expect(schemaIndexFile(document)).toMatchSnapshot();
    });

    it('serializes the schema index file for schemas following the ESM format', async () => {
      const document = {
        apis: [],
        schemas: [
          { schemaName: 'MySchema1', fileName: 'my-schema-1' },
          { schemaName: 'MySchema2', fileName: 'some-other-name' }
        ]
      } as unknown as OpenApiDocument;
      const createFileOptions: CreateFileOptions = {
        generateESM: true,
        overwrite: false,
        prettierOptions: await readPrettierConfig(undefined)
      };
      expect(schemaIndexFile(document, createFileOptions)).toMatchSnapshot();
    });
  });
});
