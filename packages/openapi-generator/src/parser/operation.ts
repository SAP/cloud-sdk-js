import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { Method, OpenApiOperation } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { parseParameters } from './parameters';

export function parseOperation(
  pathPattern: string,
  method: Method,
  pathItem: OpenAPIV3.PathItemObject,
  refs: $Refs
): OpenApiOperation {
  const operation = pathItem[method];
  if (!operation) {
    throw new Error(
      `Could not parse operation. Operation for method '${method}' does not exist.`
    );
  }
  const originalParameters = getParameters(operation, pathItem);
  const requestBody = parseRequestBody(operation.requestBody, refs);
  const parameters = parseParameters(originalParameters, refs);

  return {
    ...operation,
    pathPattern,
    method,
    requestBody,
    ...parameters,
    operationId: operation.operationId!,
    tags: operation.tags!
  };
}

/**
 * Get the operation for the given method and merge path parameters with operation parameters.
 * @param pathItem Path Item to get the operation from.
 * @param method HTTP method to get the operation for.
 * @returns The sanitized original operation.
 */
export function getParameters(
  operation: OpenAPIV3.OperationObject,
  pathItem: OpenAPIV3.PathItemObject
): (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] {
  return [...(pathItem.parameters || []), ...(operation.parameters || [])];
}
