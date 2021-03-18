import { $Refs } from '@apidevtools/swagger-parser';
import { flat, pascalCase } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { methods, OpenApiApi, OpenApiOperation } from '../openapi-types';
import { apiNameExtension, defaultApiName } from './extensions';
import { parseOperation } from './operation';
import { ensureUniqueOperationIds } from './operation-naming';

/**
 * Collect and parse all APIs of an `OpenAPIV3.Document`.
 * @param document The OpenApi document to parse.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A flat list of parsed APIs.
 */
export function parseApis(
  document: OpenAPIV3.Document,
  refs: $Refs
): OpenApiApi[] {
  const operationsByApis = getOperationsByApis(document, refs);

  return Object.entries(operationsByApis).map(([name, operations]) => ({
    name,
    operations: ensureUniqueOperationIds(operations)
  }));
}

function getApiName(
  operation: OpenApiOperation,
  document: OpenAPIV3.Document
): string {
  const originalApiName =
    operation[apiNameExtension] ||
    document.paths?.[operation.pathPattern]?.[apiNameExtension] ||
    document[apiNameExtension] ||
    operation.tags?.[0] ||
    defaultApiName;
  return `${pascalCase(originalApiName)}Api`;
}

function getOperationsByApis(document: OpenAPIV3.Document, refs: $Refs) {
  const allOperations = parseAllOperations(document, refs);

  return allOperations.reduce((apiMap, operation) => {
    const apiName = getApiName(operation, document);
    if (!apiMap[apiName]) {
      apiMap[apiName] = [];
    }
    apiMap[apiName].push(operation);
    return apiMap;
  }, {} as Record<string, OpenApiOperation[]>);
}

function parseAllOperations(
  openApiDocument: OpenAPIV3.Document,
  refs: $Refs
): OpenApiOperation[] {
  return flat(
    Object.entries(
      openApiDocument.paths
    ).map(([pathPattern, pathItem]: [string, OpenAPIV3.PathItemObject]) =>
      methods
        .filter(method => pathItem[method])
        .map(method => parseOperation(pathPattern, method, pathItem, refs))
    )
  );
}
