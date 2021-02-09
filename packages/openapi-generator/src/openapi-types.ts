import type { OpenAPIV3 } from 'openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of a parsed OpenApi Service.
 */
export interface OpenApiDocument {
  serviceName: string;
  npmPackageName: string;
  directoryName: string;
  originalFileName: string;
  tags: string[];
  operations: OpenApiOperation[];
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of an operation.
 */
export interface OpenApiOperation extends OpenAPIV3.OperationObject {
  operationId: string;
  method: string;
  path: string;
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
  options: 'options',
  trace: 'trace'
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
export const methods: Method[] = Object.values(supportedMethods);

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of a parameter for both queries and path parameters.
 */
export interface OpenApiParameter extends OpenAPIV3.ParameterObject {
  type: string;
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of the request body.
 */
export interface OpenApiRequestBody extends OpenAPIV3.RequestBodyObject {
  parameterName: string;
  parameterType: SchemaMetadata;
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of the schema of the request body.
 */
export interface SchemaMetadata {
  isArrayType: boolean;
  innerType: string;
  isInnerTypeReferenceType: boolean;
  arrayLevel?: number;
}
