import { basename } from 'path';
import { parse } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { pascalCase, removeFileExtension } from '@sap-cloud-sdk/util';
import { OpenApiDocument, OpenApiPersistedSchema } from '../openapi-types';
import { ServiceMapping } from '../service-mapping';
import { parseSchema } from './schema';
import { parseApis } from './api';
import { createRefs, OpenApiDocumentRefs } from './refs';

export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceName: string,
  filePath: string,
  serviceMapping: ServiceMapping
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parse(clonedContent)) as OpenAPIV3.Document;
  const refs = await createRefs(document);
  const originalFileName = removeFileExtension(basename(filePath));

  return {
    apis: parseApis(document, refs),
    serviceName: pascalCase(serviceName),
    npmPackageName: serviceMapping[originalFileName]
      ? serviceMapping[originalFileName].npmPackageName
      : originalFileName,
    directoryName: serviceMapping[originalFileName]
      ? serviceMapping[originalFileName].directoryName
      : originalFileName,
    originalFileName,
    schemas: parseSchemas(document, refs)
  };
}

export function parseSchemas(
  document: OpenAPIV3.Document,
  refs: OpenApiDocumentRefs
): OpenApiPersistedSchema[] {
  return Object.entries(document.components?.schemas || {}).map(
    ([name, schema]) => ({
      ...refs.getSchemaNaming(`#/components/schemas/${name}`),
      schema: parseSchema(schema, refs),
      description: refs.resolveObject(schema).description
    })
  );
}
