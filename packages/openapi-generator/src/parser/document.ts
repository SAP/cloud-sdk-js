import { parse, resolve, $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { pascalCase } from '@sap-cloud-sdk/util';
import { OpenApiOperation, OpenApiDocument, methods } from '../openapi-types';
import { parseOperation } from './operation';

export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceName: string
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parse(clonedContent)) as OpenAPIV3.Document;
  const refs = await resolve(document);
  const operations = parseAllOperations(document, refs);
  return {
    operations,
    apiName: pascalCase(serviceName) + 'Api'
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
        .map(method => parseOperation(pattern, pathDefinition, method, refs))
    ],
    []
  );
}
