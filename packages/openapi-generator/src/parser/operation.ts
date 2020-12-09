import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { camelCase, partition, pascalCase } from '@sap-cloud-sdk/util';
import { Method, OpenApiOperation } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { parseParameters } from './parameters';

export function parseOperation(
  pattern: string,
  pathItem: OpenAPIV3.PathItemObject,
  method: Method,
  refs: $Refs
): OpenApiOperation {
  const operation = getOperation(pathItem, method);
  // TODO: What does the OpenApi generator do in this case?
  const requestBody = parseRequestBody(operation.requestBody, refs);
  const parameters = parseParameters(operation, refs);
  const operationName = parseOperationName(operation, pattern, method);

  return {
    ...operation,
    pattern,
    method,
    requestBody,
    parameters,
    operationName
  };
}

/**
 * Get the operation for the given method and merge path parameters with operation parameters.
 * @param pathItem Path Item to get the operation from.
 * @param method HTTP method to get the operation for.
 * @returns The sanitized original operation.
 */
export function getOperation(
  pathItem: OpenAPIV3.PathItemObject,
  method: Method
): OpenAPIV3.OperationObject {
  const operation = pathItem[method];
  if (!operation) {
    throw new Error(
      `Could not parse operation. Operation for method '${method}' does not exist.`
    );
  }
  operation.parameters = [
    ...(pathItem.parameters || []),
    ...(operation.parameters || [])
  ];
  return operation;
}

export function parseOperationName(
  operation: OpenAPIV3.OperationObject,
  pattern: string,
  method: Method
): string {
  // TODO: this function does not check for uniqueness
  return (
    parseOperationNameFromOperation(operation) ||
    parseOperationNameFromPatternAndMethod(pattern, method)
  );
}

function parseOperationNameFromOperation(
  operation: OpenAPIV3.OperationObject
): string | undefined {
  if (operation.operationId) {
    return operation.operationId;
  }
  if (operation.description) {
    return camelCase(operation.description);
  }
}

function parseOperationNameFromPatternAndMethod(
  pattern: string,
  method: Method
): string {
  const [placeholders, pathParts] = partition(pattern.split('/'), part =>
    /^\{.*\}$/.test(part)
  );
  const prefix = getSpeakingNameForMethod(method).toLowerCase();
  const base = pathParts.map(part => pascalCase(part)).join('');
  const suffix = placeholders.length
    ? 'By' + placeholders.map(part => pascalCase(part)).join('And')
    : '';

  return prefix + base + suffix;
}

function getSpeakingNameForMethod(method: Method): string {
  const nameMapping = {
    get: 'get',
    post: 'create',
    patch: 'update',
    put: 'update',
    delete: 'delete',
    head: 'getHeadersFor',
    options: 'getOptionsFor'
  };

  return nameMapping[method];
}
