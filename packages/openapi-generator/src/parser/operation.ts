import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import {
  camelCase,
  filterDuplicatesRight,
  partition,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import { Method, OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { resolveObject } from './refs';
import { parseSchema } from './schema';
import { parseResponses } from './responses';

export function parseOperation(
  pathPattern: string,
  pathItem: OpenAPIV3.PathItemObject,
  method: Method,
  refs: $Refs
): OpenApiOperation {
  const operation = getOperation(pathItem, method);
  const requestBody = parseRequestBody(operation.requestBody, refs);
  const response = parseResponses(operation.responses, refs);
  const relevantParameters = getRelevantParameters(
    [...(pathItem.parameters || []), ...(operation.parameters || [])],
    refs
  );

  const [pathParams, queryParams] = partition(
    relevantParameters,
    parameter => parameter.in === 'path'
  );

  const pathParameters = parsePathParameters(pathParams, pathPattern);

  return {
    ...operation,
    method,
    requestBody,
    response,
    queryParameters: parseParameters(queryParams),
    pathParameters,
    pathTemplate: parsePathTemplate(pathPattern, pathParameters),
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
  return operation;
}

export function getRelevantParameters(
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  refs: $Refs
): OpenAPIV3.ParameterObject[] {
  const resolvedParameters = parameters
    .map(param => resolveObject(param, refs))
    // Filter cookie and header parameters
    .filter(param => param.in === 'path' || param.in === 'query');
  return filterDuplicatesRight(
    resolvedParameters,
    (left, right) => left.name === right.name && left.in === right.in
  );
}

function isPlaceholder(pathPart: string): boolean {
  return /^\{.+\}$/.test(pathPart);
}

function sortPathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  pathPattern: string
): OpenAPIV3.ParameterObject[] {
  const pathParts = pathPattern.split('/');
  const placeholders = pathParts.filter(part => isPlaceholder(part));

  return placeholders.map(placeholder => {
    const strippedPlaceholder = placeholder.slice(1, -1);
    const pathParameter = pathParameters.find(
      param => param.name === strippedPlaceholder
    );
    if (!pathParameter) {
      throw new Error(
        `Path parameter '${strippedPlaceholder}' provided in path is missing in path parameters.`
      );
    }

    return pathParameter;
  });
}

export function parsePathTemplate(
  pathPattern: string,
  pathParameters: OpenApiParameter[]
): string {
  const pathParts = pathPattern.split('/');
  const parameterNames = pathParameters.map(param => param.name);

  return pathParts
    .map(part => {
      if (isPlaceholder(part)) {
        if (!parameterNames.length) {
          throw new Error(
            `Could not find parameter for placeholder '${part}'.`
          );
        }
        return `\${${parameterNames.shift()}}`;
      }
      return part;
    })
    .join('/');
}

export function parsePathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  pathPattern: string
): OpenApiParameter[] {
  const sortedPathParameters = sortPathParameters(pathParameters, pathPattern);
  const nameGenerator = new UniqueNameGenerator('', [
    'body',
    'queryParameters'
  ]);

  return parseParameters(sortedPathParameters).map(param => ({
    ...param,
    name: nameGenerator.generateAndSaveUniqueName(camelCase(param.originalName))
  }));
}

export function parseParameters(
  pathParameters: OpenAPIV3.ParameterObject[]
): OpenApiParameter[] {
  return pathParameters.map(param => ({
    ...param,
    originalName: param.name,
    schema: parseSchema(param.schema)
  }));
}
