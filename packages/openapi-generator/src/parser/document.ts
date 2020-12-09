import * as path from 'path';
import { parse, resolve, $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { pascalCase } from '@sap-cloud-sdk/util';
import { OpenApiOperation, OpenApiDocument, methods } from '../openapi-types';
import { parseOperation } from './operation';

export async function parseOpenApiDocument(
  filePath: string
): Promise<OpenApiDocument> {
  const document = (await parse(filePath)) as OpenAPIV3.Document;
  const refs = await resolve(document);
  const operations = parseAllOperations(document, refs);
  const serviceName = parseServiceName(filePath);
  return {
    operations,
    apiName: pascalCase(serviceName) + 'Api',
    serviceDirName: serviceName
  };
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
    (allOperations, [pattern, pathDefinition]) => [
      ...allOperations,
      ...methods()
        .filter(method => method in pathDefinition)
        .map(method =>
          parseOperation(pattern, pathDefinition, method, refs)
        )
    ],
    []
  );
}

/**
 * Parse the name of the service based on the file path.
 * @param filePath Path of the service specification.
 * @returns The parsed name.
 */
function parseServiceName(filePath: string): string {
  return path.parse(filePath).name.replace(/-openapi$/, '');
}
