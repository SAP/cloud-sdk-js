import { $Refs } from '@apidevtools/swagger-parser';
import { flatten, pascalCase } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { methods, OpenApiApi } from '../openapi-types';
import { apiNameExtension, defaultApiName } from './extensions';
import { parseOperation } from './operation';
import { OperationInfo, getOperation } from './operation-info';
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
  const operationsByApis = getOperationsByApis(document);

  return Object.entries(operationsByApis).map(([name, operations]) => ({
    name,
    operations: ensureUniqueOperationIds(
      operations
    ).map(({ pathItem, pathPattern, method }) =>
      parseOperation(pathPattern, pathItem, method, refs)
    )
  }));
}

function getApiName(
  operationInfo: OperationInfo,
  defaultDocumentApiName: string
): string {
  const originalApiName =
    getOperation(operationInfo)[apiNameExtension] ||
    operationInfo.pathItem[apiNameExtension] ||
    defaultDocumentApiName ||
    getOperation(operationInfo).tags?.[0] ||
    defaultApiName;
  return `${pascalCase(originalApiName)}Api`;
}

function getOperationsByApis(document: OpenAPIV3.Document) {
  const allOperations = getAllOperations(document);

  return allOperations.reduce((apiMap, operationInfo) => {
    const apiName = getApiName(operationInfo, document[apiNameExtension]);
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
  return flatten(
    Object.entries(openApiDocument.paths).map(
      ([pathPattern, pathItem]: [string, OpenAPIV3.PathItemObject]) =>
        methods
          .filter(method => pathItem[method])
          .map(method => ({
            pathItem,
            pathPattern,
            method
          }))
    )
  );
}
