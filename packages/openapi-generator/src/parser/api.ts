import { $Refs } from '@apidevtools/swagger-parser';
import { flat, pascalCase } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { methods, OpenApiApi } from '../openapi-types';
import { apiNameExtension, defaultApiName } from '../extensions';
import { parseOperation } from './operation';
import { OperationInfo } from './operation-info';
import { nameOperations } from './operation-naming';
import { ensureUniqueNames } from './unique-naming';

/**
 * Collect and parse all APIs of an `OpenAPIV3.Document`.
 * @param document The OpenApi document to parse.
 * @param refs List of cross references that can occur in the document.
 * @returns A flat list of parsed APIs.
 */
export function parseApis(
  document: OpenAPIV3.Document,
  refs: $Refs
): OpenApiApi[] {
  const operationsByApis = getOperationsByApis(document);

  return Object.entries(operationsByApis).map(
    ([name, operations]: [string, OperationInfo[]]) => ({
      name,
      operations: ensureUniqueNames(
        nameOperations(operations),
        // All operations got an operationId in the line before
        ({ operation }) => operation.operationId!,
        (operationInfo, operationId) => {
          operationInfo.operation.operationId = operationId;
        }
      ).map(operationInfo => parseOperation(operationInfo, refs))
    })
  );
}

function getPathItem(
  document: OpenAPIV3.Document,
  pathPattern: string
): OpenAPIV3.PathItemObject {
  const pathItem = document.paths[pathPattern];
  if (!pathItem) {
    // This should never happen
    throw new Error(
      `Could not parse APIs. Path pattern '${pathPattern}' does not exist in the document.`
    );
  }
  return pathItem;
}

function getApiNameForOperation(
  { operation, pathPattern }: OperationInfo,
  document: OpenAPIV3.Document
): string {
  const originalApiName =
    operation[apiNameExtension] ||
    getPathItem(document, pathPattern)[apiNameExtension] ||
    document[apiNameExtension] ||
    operation.tags?.[0] ||
    defaultApiName;
  return `${pascalCase(originalApiName.replace(/api$/i, ''))}Api`;
}

function getOperationsByApis(document: OpenAPIV3.Document) {
  const allOperations = getAllOperations(document);

  return allOperations.reduce((apiMap, operationInfo) => {
    const apiName = getApiNameForOperation(operationInfo, document);
    if (!apiMap[apiName]) {
      apiMap[apiName] = [];
    }
    apiMap[apiName].push(operationInfo);
    return apiMap;
  }, {} as Record<string, OperationInfo[]>);
}

function getAllOperations(
  openApiDocument: OpenAPIV3.Document
): OperationInfo[] {
  return flat(
    Object.entries(openApiDocument.paths).map(
      ([pathPattern, pathItem]: [string, OpenAPIV3.PathItemObject]) =>
        methods
          .filter(method => pathItem[method])
          .map(method => ({
            pathPattern,
            // We can assume that the operation exists as non existing operations where filtered before.
            operation: pathItem[method]!,
            pathItemParameters: pathItem.parameters || [],
            method
          }))
    )
  );
}
