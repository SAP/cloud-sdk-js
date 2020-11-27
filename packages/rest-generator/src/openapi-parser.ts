import * as path from 'path';
import { parse, resolve, $Refs } from '@apidevtools/swagger-parser';
import { toPascalCase, toPropertyFormat } from '@sap-cloud-sdk/core';
import { OpenAPIV3 } from 'openapi-types';
import { last } from '@sap-cloud-sdk/util';
import {
  Method,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiRequestBody,
  OpenApiDocument
} from './openapi-types';
import { getType } from './type-mapping';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Parse an OpenApi document at the given location.
 * @param filePath Path to OpenApi service specification.
 * @returns The parsed service data.
 */
export async function parseOpenApiDocument(
  filePath: string
): Promise<OpenApiDocument> {
  const document = (await parse(filePath)) as OpenAPIV3.Document;
  const refs = await resolve(document);
  const operations = getAllOperations(document, refs);
  const serviceName = getServiceName(filePath);
  return {
    operations,
    refs,
    apiName: toPascalCase(serviceName) + 'Api',
    serviceDirName: serviceName
  };
}

/**
 * Typeguard to check wheter an object is of type `OpenAPIV3.ReferenceObject`.
 * @param obj Object to check.
 * @returns True if the object is a reference object, false otherwise.
 */
export function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return !!obj?.$ref;
}

/**
 * Collect and parse all operations of an `OpenAPIV3.Document`.
 * @param document The OpenApi document to parse.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A flat list of parsed operations.
 */
function getAllOperations(
  document: OpenAPIV3.Document,
  refs: $Refs
): OpenApiOperation[] {
  return Object.entries(document.paths).reduce(
    (allOperations, [pattern, pathDefinition]) => [
      ...allOperations,
      ...Object.values(Method)
        .filter(method => method in pathDefinition)
        .map(method =>
          // The line above makes sure that the pathDefinition[method] is not undefined
          getOperation(pattern, method, pathDefinition[method]!, refs)
        )
    ],
    []
  );
}

/**
 * Parse one operation.
 * @param pattern The url pattern, i. e. the key in the original operation definition object.
 * @param method HTTP method for this operation.
 * @param operation The original operation definition.
 * @param refs List of crossreferences that can occur in the document.
 * @returns The parsed operation.
 */
function getOperation(
  pattern: string,
  method: Method,
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenApiOperation {
  // TODO: What does the OpenApi generator do in this case?
  const requestBody = getRequestBody(operation.requestBody, refs);
  const parameters = getParameters(operation, refs);

  return {
    ...operation,
    pattern,
    method,
    requestBody,
    parameters
  };
}

/**
 * Parse the request body.
 * @param requestBody Original request body to parse.
 * @param refs List of crossreferences that can occur in the document.
 * @returns The parsed request body.
 */
function getRequestBody(
  requestBody:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | undefined,
  refs: $Refs
): OpenApiRequestBody | undefined {
  const resolvedRequestBody = getResolvedObject(requestBody, refs);
  const requestBodyType = getRequestBodyType(resolvedRequestBody);
  if (requestBodyType && resolvedRequestBody) {
    return {
      ...resolvedRequestBody,
      name: toPropertyFormat(requestBodyType),
      type: toPascalCase(requestBodyType)
    };
  }
}

/**
 * Parse the type of a resolved request body.
 * @param requestBody The body to parse the type from.
 * @returns The type name of the request body if there is one.
 */
function getRequestBodyType(
  requestBody: OpenAPIV3.RequestBodyObject | undefined
): string | undefined {
  const mediaType = getMediaType(requestBody, 'application/json');
  const schema = mediaType?.schema;
  // TODO: What about inline schemas?
  if (isReferenceObject(schema)) {
    return getTypeName(schema);
  }
}

/**
 * Parse the type name of a reference object.
 * @param obj Reference object to get the type name from.
 * @returns Parsed type name.
 */
function getTypeName(obj: OpenAPIV3.ReferenceObject): string {
  // TODO: How do we know that this is correct?
  return toPascalCase(last(obj.$ref.split('/'))!);
}

/**
 * Get the media type for a specific content type from a request body object.
 * @param requestBody Request body to get the media type from.
 * @param contentType Content type to retrieve the media type by.
 * @returns The mediatype for the given content type if available.
 */
function getMediaType(
  requestBody: OpenAPIV3.RequestBodyObject | undefined,
  contentType: string
): OpenAPIV3.MediaTypeObject | undefined {
  if (requestBody?.content) {
    return Object.entries(requestBody.content).find(
      ([key]) => key === contentType
    )?.[1];
  }
}

/**
 * Parse parameters of an operation.
 * @param operation The original operation definition.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A list of parsed parameters.
 */
function getParameters(
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenApiParameter[] {
  // TODO: What if this is a reference? What does OpenApi do?
  return (
    operation.parameters
      ?.map(param => getResolvedObject(param, refs))
      .map(param => ({
        ...param,
        type: getType(getResolvedObject(param.schema, refs)?.type?.toString())
      })) || []
  );
}

/**
 * Check whether the given object is a reference object and resolve if necessary.
 * This operates only on the current level.
 * @param obj Object to resolve if necessary.
 * @param refs References to resolve by.
 * @returns A resolved object.
 */
function getResolvedObject<T>(
  obj: T | OpenAPIV3.ReferenceObject,
  refs: $Refs
): T {
  return isReferenceObject(obj) ? refs.get(obj.$ref) : obj;
}

/**
 * Parse the name of the service based on the file path.
 * @param filePath Path of the service specification.
 * @returns The parsed name.
 */
function getServiceName(filePath: string): string {
  return path.parse(filePath).name.replace(/-openapi$/, '');
}
