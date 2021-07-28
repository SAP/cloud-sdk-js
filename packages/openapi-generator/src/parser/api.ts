import { flat, pascalCase } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { methods, OpenApiApi } from '../openapi-types';
import { apiNameExtension, defaultApiName } from '../extensions';
import { parseOperation } from './operation';
import { OperationInfo } from './parsing-info';
import { nameOperations } from './operation-naming';
import { ensureUniqueNames } from './unique-naming';
import { OpenApiDocumentRefs } from './refs';
import { ParserOptions } from './options';

/**
 * Collect and parse all APIs of an `OpenAPIV3.Document`.
 * @param document The OpenAPI document to parse.
 * @param refs Object representing cross references throughout the document.
 * @param options Parser options.
 * @returns A flat list of parsed APIs.
 */
export function parseApis(
  document: OpenAPIV3.Document,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiApi[] {
  const operationsByApis = getOperationsByApis(document);

  return Object.entries(operationsByApis).map(
    ([name, operations]: [string, OperationInfo[]]) => {
      const namedOperations = nameOperations(operations);
      const operationNames = namedOperations.map(
        // All operations have been named in the previous step
        ({ operation }) => operation.operationId!
      );
      const uniqueNames = ensureUniqueNames(operationNames, options, {
        separator: '_'
      });
      const uniquelyNamedOperations = namedOperations.map(
        (operationInfo, i) => {
          operationInfo.operation.operationId = uniqueNames[i];
          return operationInfo;
        }
      );
      return {
        name,
        operations: uniquelyNamedOperations.map(operationInfo =>
          parseOperation(operationInfo, refs, options)
        )
      };
    }
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

  if (!allOperations.length) {
    throw new Error(
      'Could not parse APIs. The document does not contain any operations.'
    );
  }

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
