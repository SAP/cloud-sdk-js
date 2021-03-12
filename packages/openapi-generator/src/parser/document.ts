import { basename } from 'path';
import { parse, resolve, $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { flatten, pascalCase, unique } from '@sap-cloud-sdk/util';
import {
  OpenApiOperation,
  OpenApiDocument,
  methods,
  OpenApiNamedSchema,
  OpenApiApi
} from '../openapi-types';
import { VdmMapping } from '../service-mapping';
import { parseOperation } from './operation';
import { parseSchema } from './schema';
import { apiNameExtension, defaultApiName } from './extensions';

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
 * Collect and parse all operations of an `OpenAPIV3.Document`.
 * @param document The OpenApi document to parse.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A flat list of parsed operations.
 */
export function parseApis(
  document: OpenAPIV3.Document,
  refs: $Refs
): OpenApiApi[] {
  // TODO ensure uniqueness of names
  const apis: Record<string, OpenApiOperation[]> = parseAllOperations(
    document,
    refs
  ).reduce((apiMap, operation) => {
    if (!apiMap[operation.originalApiName]) {
      apiMap[operation.originalApiName] = [];
    }
    apiMap[operation.originalApiName].push(operation);
    return apiMap;
  }, {});

  return Object.entries(apis)
    .filter(([, operations]) => operations.length)
    .map(([name, operations]) => ({
      name: `${pascalCase(name)}Api`,
      operations
    }));
}

/**
 * Collect and parse all operations of an `OpenAPIV3.Document`.
 * @param document The OpenApi document to parse.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A flat list of parsed operations.
 */
export function parseAllOperations(
  document: OpenAPIV3.Document,
  refs: $Refs
): OpenApiOperation[] {
  return Object.entries(document.paths).reduce(
    (allOperations, [path, pathDefinition]) => [
      ...allOperations,
      ...methods
        .filter(method => pathDefinition?.[method])
        // Undefined path definitions have been filtered out in the line before
        .map(method =>
          parseOperation(
            path,
            pathDefinition!,
            method,
            document[apiNameExtension] || defaultApiName,
            refs
          )
        )
    ],
    []
  );
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
