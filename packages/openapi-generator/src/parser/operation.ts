import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { Method, OpenApiOperation } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { parseParameters } from './parameters';
import { apiNameExtension } from './extensions';

export function parseOperation(
  path: string,
  pathItem: OpenAPIV3.PathItemObject,
  method: Method,
  defaultApiName: string,
  refs: $Refs
): OpenApiOperation {
  const operation = getOperation(pathItem, method);
  const requestBody = parseRequestBody(operation.requestBody, refs);
  const parameters = parseParameters(operation, refs);

  return {
    ...operation,
    path,
    method,
    requestBody,
    ...parameters,
    operationId: operation.operationId!,
    tags: operation.tags!,
    originalApiName:
      operation[apiNameExtension] ||
      pathItem[apiNameExtension] ||
      operation.tags?.[0] ||
      defaultApiName
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
