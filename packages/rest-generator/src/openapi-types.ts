import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of a parsed OpenApi Service.
 */
export interface OpenApiDocument {
  apiName: string;
  serviceDirName: string;
  refs: $Refs;
  operations: OpenApiOperation[];
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of an operation.
 */
export interface OpenApiOperation extends OpenAPIV3.OperationObject {
  method: string;
  pattern: string;
  requestBody?: OpenApiRequestBody;
  parameters: OpenApiParameter[];
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Methods supported by OpenApi and SAP Cloud SDK.
 */
export enum Method {
  get = 'get',
  put = 'put',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
  head = 'head',
  options = 'options'
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
  name: string;
  type: string;
}
