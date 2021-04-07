import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import {
  camelCase,
  filterDuplicatesRight,
  partition,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import { OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { resolveObject } from './refs';
import { parseSchema } from './schema';
import { parseResponses } from './responses';
import { OperationInfo } from './parsing-info';
import { reservedJsKeywords } from './reserved-words';

/**
 * Parse an operation info into a serialization-ready object.
 * @param operationInfo Parsing relevant information on an operation.
 * @param refs List of cross references that can occur in the document.
 * @param schemaRefMapping Mapping between references and parsed names of the schemas.
 * @returns A flat list of parsed operations.
 */
export function parseOperation(
  { operation, pathPattern, method, pathItemParameters }: OperationInfo,
  refs: $Refs,
  schemaRefMapping: Record<string, string>
): OpenApiOperation {
  const requestBody = parseRequestBody(
    operation.requestBody,
    refs,
    schemaRefMapping
  );
  const response = parseResponses(operation.responses, refs, schemaRefMapping);
  const relevantParameters = getRelevantParameters(
    [...(pathItemParameters || []), ...(operation.parameters || [])],
    refs
  );

  const [pathParams, queryParams] = partition(
    relevantParameters,
    parameter => parameter.in === 'path'
  );

  const pathParameters = parsePathParameters(
    pathParams,
    pathPattern,
    schemaRefMapping
  );

  return {
    ...operation,
    method,
    requestBody,
    response,
    queryParameters: parseParameters(queryParams, schemaRefMapping),
    pathParameters,
    pathPattern: parsePathPattern(pathPattern, pathParameters),
    operationId: operation.operationId!,
    tags: operation.tags!
  };
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

export function parsePathPattern(
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
        return `{${parameterNames.shift()}}`;
      }
      return part;
    })
    .join('/');
}

export function parsePathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  pathPattern: string,
  schemaRefMapping: Record<string, string>
): OpenApiParameter[] {
  const sortedPathParameters = sortPathParameters(pathParameters, pathPattern);
  const nameGenerator = new UniqueNameGenerator('', [
    'body',
    'queryParameters',
    ...reservedJsKeywords
  ]);

  return parseParameters(sortedPathParameters, schemaRefMapping).map(param => ({
    ...param,
    name: nameGenerator.generateAndSaveUniqueName(camelCase(param.originalName))
  }));
}

export function parseParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  schemaRefMapping: Record<string, string>
): OpenApiParameter[] {
  return pathParameters.map(param => ({
    ...param,
    originalName: param.name,
    schema: parseSchema(param.schema, schemaRefMapping)
  }));
}
