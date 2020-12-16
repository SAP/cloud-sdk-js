import { OpenAPIV3 } from 'openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of a parsed OpenApi Service.
 */
export interface OpenApiDocument {
  apiName: string;
  operations: OpenApiOperation[];
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of an operation.
 */
export interface OpenApiOperation extends OpenAPIV3.OperationObject {
  operationName: string;
  method: string;
  pattern: string;
  requestBody?: OpenApiRequestBody;
  parameters: OpenApiParameter[];
}

const supportedMethods = {
  get: 'get',
  put: 'put',
  post: 'post',
  patch: 'patch',
  delete: 'delete',
  head: 'head',
  options: 'options'
} as const;

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Methods supported by OpenApi and SAP Cloud SDK.
 */
export type Method = typeof supportedMethods[keyof typeof supportedMethods];

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Get supported methods.
 * @returns Methods supported by OpenApi and SAP Cloud SDK.
 */
export function methods(): Method[] {
  return Object.values(supportedMethods);
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Represenatiation of a parameter for both queries and path parameters.
 */
export interface OpenApiParameter extends OpenAPIV3.ParameterObject {
  type: string;
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Represenation of the request body.
 */
export interface OpenApiRequestBody extends OpenAPIV3.RequestBodyObject {
  parameterName: string;
  parameterType: string;
}
