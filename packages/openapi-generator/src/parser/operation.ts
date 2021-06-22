import { OpenAPIV3 } from 'openapi-types';
import { filterDuplicatesRight, partition } from '@sap-cloud-sdk/util';
import { OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { OpenApiDocumentRefs } from './refs';
import { parseSchema } from './schema';
import { parseResponses } from './responses';
import { OperationInfo } from './parsing-info';
import { reservedJsKeywords } from './reserved-words';
import { ensureUniqueNames } from './unique-naming';
import { ParserOptions } from './options';

/**
 * Parse an operation info into a serialization-ready object.
 * @param operationInfo Parsing relevant information on an operation.
 * @param refs Object representing cross references throughout the document.
 * @param options Parser options.
 * @returns A flat list of parsed operations.
 */
export function parseOperation(
  { operation, pathPattern, method, pathItemParameters }: OperationInfo,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiOperation {
  const requestBody = parseRequestBody(operation.requestBody, refs, options);
  const response = parseResponses(operation.responses, refs, options);
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
    refs,
    options
  );

  return {
    ...operation,
    method,
    requestBody,
    response,
    queryParameters: parseParameters(queryParams, refs, options),
    pathParameters,
    pathPattern: parsePathPattern(pathPattern, pathParameters),
    operationId: operation.operationId!,
    tags: operation.tags!
  };
}

export function getRelevantParameters(
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  refs: OpenApiDocumentRefs
): OpenAPIV3.ParameterObject[] {
  const resolvedParameters = parameters
    .map(param => refs.resolveObject(param))
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

function isValidPlaceholder(placeholder: string): boolean {
  // This regex matches the cases:
  // 1. it starts with `{`
  // 2. it ends with `}`
  // 3. it does not contain any other `{` or `}` in the middle
  return /^\{[^{}]+\}$/.test(placeholder);
}

// This function checks whether the given path pattern is valid. Typically, it detects the invalid pattern like below
// 1. `/path/{p1}:{p2}`
// 2. `/path?{param}`
function isValidPathPattern(
  pathPattern: string,
  placeholders: string[]
): boolean {
  return (
    pathPattern.includes('?') ||
    placeholders.some(placeholder => !isValidPlaceholder(placeholder))
  );
}

function sortPathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  pathPattern: string
): OpenAPIV3.ParameterObject[] {
  const pathParts = pathPattern.split('/');
  const placeholders = pathParts.filter(part => isPlaceholder(part));

  if (isValidPathPattern(pathPattern, placeholders)) {
    throw new Error(
      `Path pattern '${pathPattern}' is invalid or not supported.`
    );
  }

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
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiParameter[] {
  // todo validate
  const sortedPathParameters = sortPathParameters(pathParameters, pathPattern);
  const parsedParameters = parseParameters(sortedPathParameters, refs, options);
  const uniqueNames = ensureUniqueNames(
    parsedParameters.map(({ originalName }) => originalName),
    options,
    {
      reservedWords: ['body', 'queryParameters', ...reservedJsKeywords]
    }
  );

  return parsedParameters.map((param, i) => {
    param.name = uniqueNames[i];
    return param;
  });
}

export function parseParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiParameter[] {
  return pathParameters.map(param => ({
    ...param,
    originalName: param.name,
    schema: parseSchema(param.schema, refs, options)
  }));
}
