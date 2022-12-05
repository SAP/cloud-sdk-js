import { OpenAPIV3 } from 'openapi-types';
import { filterDuplicatesRight, partition } from '@sap-cloud-sdk/util';
import { reservedJsKeywords } from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { OpenApiDocumentRefs } from './refs';
import { parseSchema } from './schema';
import { parseResponses } from './responses';
import { OperationInfo } from './parsing-info';
import { ensureUniqueNames } from './unique-naming';
import { ParserOptions } from './options';

/**
 * Parse an operation info into a serialization-ready object.
 * @param operationInfo - Parsing relevant information on an operation.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Parser options.
 * @returns A flat list of parsed operations.
 * @internal
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

  const pathParameters = parsePathParameters(pathParams, refs, options);

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

/**
 * @internal
 */
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

/**
 * @internal
 */
export function parsePathPattern(
  pathPattern: string,
  pathParameters: OpenApiParameter[]
): string {
  // Get the innermost curly bracket pairs with non-empty and legal content as placeholders
  const placeholders: string[] = pathPattern.match(/{[^/?#{}]+}/g) || [];
  // Get the non-parameter strings as static parts
  const staticParts = pathPattern.split(/{[^/?#{}]+}/);

  const sortedPathParameters = placeholders.map(placeholder => {
    const strippedPlaceholder = placeholder.slice(1, -1);
    const pathParameter = pathParameters.find(
      param => param.originalName === strippedPlaceholder
    );
    if (!pathParameter) {
      throw new Error(
        `Could not find path parameter for placeholder '{${strippedPlaceholder}}'.`
      );
    }
    return `{${pathParameter.name}}`;
  });

  // Check if all path parameters match placeholders
  const originalParameterNames = pathParameters.map(
    pathParameter => pathParameter.originalName
  );
  const missingPlaceholders = originalParameterNames.filter(
    originalParameterName =>
      !placeholders.includes(`{${originalParameterName}}`)
  );
  if (missingPlaceholders.length) {
    throw new Error(
      `Could not find placeholder for path parameter(s) ${missingPlaceholders
        .map(placeholder => `'${placeholder}'`)
        .join(', ')}.`
    );
  }

  return staticParts
    .flatMap((staticPart, index) => {
      const paramName = sortedPathParameters[index];
      return paramName ? [staticPart, paramName] : [staticPart];
    })
    .join('');
}

/**
 * @internal
 */
export function parsePathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiParameter[] {
  const parsedParameters = parseParameters(pathParameters, refs, options);
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
/**
 * @internal
 */
export function parseParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiParameter[] {
  return pathParameters.map(param => ({
    ...param,
    originalName: param.name,
    schema: parseSchema(param.schema, refs, options),
    schemaProperties: {}
  }));
}
