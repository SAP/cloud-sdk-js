import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { camelCase, partition, pascalCase } from '@sap-cloud-sdk/util';
import { Method, OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { getType } from './type-mapping';
import { parseRequestBody } from './request-body';
import { resolveObject } from './refs';

/**
 * Parse one operation.
 * @param pattern The url pattern, i. e. the key in the original operation definition object.
 * @param method HTTP method for this operation.
 * @param operation The original operation definition.
 * @param refs List of crossreferences that can occur in the document.
 * @returns The parsed operation.
 */
export function parseOperation(
  pattern: string,
  method: Method,
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenApiOperation {
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
 * Parse parameters of an operation.
 * @param operation The original operation definition.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A list of parsed parameters.
 */
export function parseParameters(
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenApiParameter[] {
  // TODO: What if this is a reference? What does OpenApi do?
  // TODO: What about oneof and other operations?
  return (
    operation.parameters
      ?.map(param => resolveObject(param, refs))
      .map(param => ({
        ...param,
        type: getType(resolveObject(param.schema, refs)?.type?.toString())
      })) || []
  );
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
