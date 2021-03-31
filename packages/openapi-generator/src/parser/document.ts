import { basename } from 'path';
import SwaggerParser, { parse, resolve } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { pascalCase, removeFileExtension } from '@sap-cloud-sdk/util';
import { OpenApiDocument, OpenApiNamedSchema } from '../openapi-types';
import { ServiceMapping } from '../service-mapping';
import { parseSchema } from './schema';
import { parseApis } from './api';
import { resolveObject } from './refs';

/**
 * Parse the original OpenAPI document and return an SDK compliant document.
 * @param fileContent The OpenAPI document representation.
 * @param serviceName The name of the service.
 * @param filePath The path of the OpenAPI document.
 * @param serviceMapping A file representing a custom mapping of directory and npm package names.
 * @returns The parsed document
 */
export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceName: string,
  filePath: string,
  serviceMapping: ServiceMapping
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parse(clonedContent)) as OpenAPIV3.Document;
  const refs = await resolve(document);
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
    schemas: parseSchemas(document,refs)
  };
}

export function parseSchemas(
  document: OpenAPIV3.Document,
refs: SwaggerParser.$Refs
): OpenApiNamedSchema[] {
  return Object.entries(document.components?.schemas || {}).map(
    ([name, schema]) => ({
      name,
      schema: parseSchema(schema,refs),
      description: resolveObject(schema,refs).description
    })
  );
}
