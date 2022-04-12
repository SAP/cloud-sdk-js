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
  // Replace the old placeholder with the name of the corresponding path parameter
  for (const pathParameter of pathParameters) {
    // Check if path contains the provided path parameter
    if (!pathPattern.includes(pathParameter.originalName)) {
      throw new Error(
        `Could not find placeholder for path parameter '${pathParameter.originalName}'.`
      );
    }
    // Temporarily using TEMP_LEFT_CURLY_BRACKET and TEMP_RIGHT_CURLY_BRACKET to avoid re-substitution
    // Check test 'parses path template for parameters' for the edge case input
    pathPattern = pathPattern.replace(
      new RegExp(`{${pathParameter.originalName}}`, 'g'),
      `TEMP_LEFT_CURLY_BRACKET${pathParameter.name}TEMP_RIGHT_CURLY_BRACKET`
    );
  }

  // Check if there is still curly bracket in the replaced path pattern
  // This will match the innermost curly bracket pair
  const matchedPlaceholders = pathPattern.match(/{[^/?#{}]+}/);
  if (matchedPlaceholders !== null) {
    throw new Error(
      `Could not find path parameter for placeholder '${matchedPlaceholders.join(
        "', '"
      )}'.`
    );
  }

  pathPattern = pathPattern.replace(/TEMP_LEFT_CURLY_BRACKET/g, '{');
  pathPattern = pathPattern.replace(/TEMP_RIGHT_CURLY_BRACKET/g, '}');

  return pathPattern;
}

/**
 * @internal
 * Check if path parameters and path pattern match.
 * @param pathParameters - Path parameters for path templates
 * @param pathPattern - Path containing path templates
 */
export function validatePathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  pathPattern: string
): void {
  // Replace the old placeholder with the name of the corresponding path parameter
  for (const pathParameter of pathParameters) {
    // Check if path contains the provided path parameter
    if (!pathPattern.includes(pathParameter.name)) {
      throw new Error(
        `Could not find placeholder for path parameter '${pathParameter.name}'.`
      );
    }
    // Remove the matched path parameter to mark the path parameter
    pathPattern = pathPattern.replace(
      new RegExp(`{${pathParameter.name}}`, 'g'),
      'REMOVED'
    );
  }

  // Check if there is still curly bracket in the replaced path pattern
  // This will match the innermost curly bracket pair
  const matchedPlaceholders = pathPattern.match(/{[^/?#{}]+}/);
  if (matchedPlaceholders !== null) {
    throw new Error(
      `Could not find path parameter for placeholder '${matchedPlaceholders.join(
        "', '"
      )}'.`
    );
  }
}

/**
 * @internal
 */
export function parsePathParameters(
  pathParameters: OpenAPIV3.ParameterObject[],
  pathPattern: string,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiParameter[] {
  validatePathParameters(pathParameters, pathPattern);
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
