import { basename } from 'path';
import { parse, resolve } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { flatten, pascalCase, unique } from '@sap-cloud-sdk/util';
import {
  OpenApiOperation,
  OpenApiDocument,
  OpenApiNamedSchema
} from '../openapi-types';
import { VdmMapping } from '../service-mapping';
import { parseSchema } from './schema';
import { parseApis } from './api';

export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceName: string,
  filePath: string,
  vdmMapping: VdmMapping
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parse(clonedContent)) as OpenAPIV3.Document;
  const refs = await resolve(document);
  const components = parseComponents(document);
  // const operations = parseAllOperations(document, refs);
  const originalFileName = basename(filePath).split('.')[0];
  return {
    apis: parseApis(document, refs),
    serviceName: pascalCase(serviceName),
    npmPackageName: vdmMapping[originalFileName]
      ? vdmMapping[originalFileName].npmPackageName
      : originalFileName,
    directoryName: vdmMapping[originalFileName]
      ? vdmMapping[originalFileName].directoryName
      : originalFileName,
    originalFileName,
    // tags: collectTags(operations),
    components
  };
}

/**
 * Collect all the tags used by given operations.
 * @param operations The given operations.
 * @returns An array that holds the unique tags.
 */
export function collectTags(operations: OpenApiOperation[]): string[] {
  return unique(flatten(operations.map(operation => operation.tags)));
}

export function parseComponents(
  document: OpenAPIV3.Document
): {
  schemas: OpenApiNamedSchema[];
} {
  return {
    schemas: Object.entries(document.components?.schemas || {}).map(
      ([name, schema]) => ({
        name,
        schema: parseSchema(schema)
      })
    )
  };
}
