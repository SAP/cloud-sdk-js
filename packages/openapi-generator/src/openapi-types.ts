import type { OpenAPIV3 } from 'openapi-types';

export interface OpenApiDocument {
  serviceName: string;
  npmPackageName: string;
  directoryName: string;
  originalFileName: string;
  components: {
    schemas: OpenApiNamedSchema[];
  };
  apis: OpenApiApi[];
}

export interface OpenApiApi {
  name: string;
  operations: OpenApiOperation[];
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Representation of an operation.
 */
export interface OpenApiOperation extends OpenAPIV3.OperationObject {
  tags: string[];
  operationId: string;
  method: string;
  pathPattern: string;
  requestBody?: OpenApiRequestBody;
  pathParameters: OpenApiParameter[];
  queryParameters: OpenApiParameter[];
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

// export type OpenApiSchemaObject =
//   | OpenApiArraySchemaObject
//   | OpenApiNonArraySchemaObject;
// export type OpenApiNamedSchemaObject = OpenApiSchemaObject & { name: string };
// export interface OpenApiArraySchemaObject
//   extends Omit<OpenAPIV3.ArraySchemaObject, 'items'> {
//   items: OpenApiSchemaObject | OpenAPIV3.ReferenceObject;
// }

// export interface OpenApiNamedReferenceObject extends OpenAPIV3.ReferenceObject {
//   name: string;
// }

// export type OpenApiNonArraySchemaObject = Omit<
//   OpenAPIV3.NonArraySchemaObject,
//   'properties'
// > & {
//   properties?: (OpenApiNamedSchemaObject | OpenApiNamedReferenceObject)[];
//   oneOf?: (OpenApiSchemaObject | OpenAPIV3.ReferenceObject)[];
// };

// TODO create completely custom types. This will be too complicated

export interface Named {
  name: string;
}

export type OpenApiSchema =
  | OpenAPIV3.ReferenceObject
  | OpenApiArraySchema
  | OpenApiSimpleSchema
  | OpenApiObjectSchema
  | OpenApiEnumSchema
  | OpenApiOneOfSchema
  | OpenApiAllOfSchema
  | OpenApiAnyOfSchema
  | OpenApiNotSchema;

export interface OpenApiNamedSchema extends Named {
  schema: OpenApiSchema;
}

export interface OpenApiArraySchema {
  type: 'array';
  items: any;
  uniqueItems: boolean;
}

export interface OpenApiSimpleSchema {
  type: string;
}

export interface OpenApiEnumSchema extends OpenApiSimpleSchema {
  enum: string[];
}

export interface OpenApiObjectSchema {
  type: 'object';
  properties: OpenApiObjectSchemaProperty[];
  additionalProperties: boolean | OpenApiSchema;
}

export interface OpenApiOneOfSchema {
  oneOf: OpenApiSchema[];
}

export interface OpenApiAllOfSchema {
  allOf: OpenApiSchema[];
}

export interface OpenApiAnyOfSchema {
  anyOf: OpenApiSchema[];
}

export interface OpenApiNotSchema {
  not: OpenApiSchema;
}

export interface OpenApiObjectSchemaProperty extends OpenApiNamedSchema {
  required: boolean;
}
