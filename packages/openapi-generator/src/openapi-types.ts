import type { OpenAPIV3 } from 'openapi-types';
import { ServiceOptions } from './options';

/**
 * Representation of an OpenAPI specification/document.
 */
export interface OpenApiDocument {
  /**
   * Name of the service. This is used for documentation.
   */
  serviceName: string;

  /**
   * Configuration as defined in the options per service.
   */
  serviceOptions: ServiceOptions;

  /**
   * Parsed schemas of the document.
   */
  schemas: OpenApiPersistedSchema[];

  /**
   * Parsed APIs of the document.
   */
  apis: OpenApiApi[];
}

/**
 * Represents one API of the service.
 */
export interface OpenApiApi {
  /**
   * Name of the API. Used for serialization.
   */
  name: string;

  /**
   * List of operations that belong to one API.
   */
  operations: OpenApiOperation[];
}

/**
 * Representation of an operation.
 */
export interface OpenApiOperation
  extends Omit<OpenAPIV3.OperationObject, 'requestBody'> {
  /**
   * List of tags on an operation. Used for documentation.
   */
  tags: string[];

  /**
   * Name of the operation. Used for serialization.
   */
  operationId: string;

  /**
   * HTTP method used in request for this operation.
   */
  method: string;

  /**
   * Pattern of the path to be used for requests with this operation.
   */
  pathPattern: string;

  /**
   * Request body of an operation.
   */
  requestBody?: OpenApiRequestBody;

  /**
   * Schema of the response for a given request.
   */
  response: OpenApiSchema;

  /**
   * Path parameters used to complete the path.
   */
  pathParameters: OpenApiParameter[];

  /**
   * Query parameters available for this operation.
   */
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
 * Methods supported by OpenAPI and SAP Cloud SDK.
 */
export type Method = typeof supportedMethods[keyof typeof supportedMethods];

/**
 * Get supported methods.
 * @returns Methods supported by OpenAPI and SAP Cloud SDK.
 */
export const methods: Method[] = Object.values(supportedMethods);

/**
 * Representation of a parameter for both queries and path parameters.
 */
export interface OpenApiParameter
  extends Omit<OpenAPIV3.ParameterObject, 'schema'>,
    OpenApiNamedSchema {
  /**
   * Name as in the specification.
   */
  originalName: string;
}

/**
 * Representation of a request body.
 */
export interface OpenApiRequestBody {
  /**
   * Denotes whether the request body is required for the according operation.
   */
  required: boolean;

  /**
   * Schema of the body.
   */
  schema: OpenApiSchema;

  /**
   * Description of the body
   */
  description?: string;
}

/**
 * Represents all possible Types of schemas.
 */
export type OpenApiSchema =
  | OpenApiReferenceSchema
  | OpenApiArraySchema
  | OpenApiSimpleSchema
  | OpenApiObjectSchema
  | OpenApiEnumSchema
  | OpenApiOneOfSchema
  | OpenApiAllOfSchema
  | OpenApiAnyOfSchema
  | OpenApiNotSchema;

/**
 * Represents a reference to a schema, that has a name.
 */
export interface OpenApiNamedSchema {
  /**
   * Name of the type represented by the schema.
   */
  name: string;

  /**
   * The schema.
   */
  schema: OpenApiSchema;

  /**
   * Description of the schema.
   */
  description?: string;
}

/**
 * Represents a reference to a schema, that will be saved in a file.
 */
export interface OpenApiPersistedSchema extends SchemaNaming {
  /**
   * The schema.
   */
  schema: OpenApiSchema;

  /**
   * Description of the schema.
   */
  description?: string;
}

/**
 * Represents an object that can be referenced by the given path.
 */
export interface WithRefPath {
  /**
   * Path as referenced in reference objects.
   */
  refPath: string;
}

/**
 * A schema representing an array.
 */
export interface OpenApiArraySchema {
  /**
   * Schema representing the type of the items in an array.
   */
  items: OpenApiSchema;

  /**
   * Determines whether the items have to be unique at runtime.
   */
  uniqueItems?: boolean;
}

/**
 * Any schema that is no other specific schema. This includes primitive types.
 */
export interface OpenApiSimpleSchema {
  /**
   * Type represented by the schema.
   */
  type: string;
}

/**
 * Schema representing an enum type.
 */
export interface OpenApiEnumSchema extends OpenApiSimpleSchema {
  /**
   * Values enumerated by the enum.
   */
  enum: string[];
}

/**
 * Schema representing an object.
 */
export interface OpenApiObjectSchema {
  /**
   * Represents the properties of the object schema.
   */
  properties: OpenApiObjectSchemaProperty[];
  /**
   * Represents the type of additional properties.
   */
  additionalProperties?: OpenApiSchema;
}

/**
 * Represets a type where one of the given schemas can be chosen exclusively.
 */
export interface OpenApiOneOfSchema {
  /**
   * Represents the schemas to chose from.
   */
  oneOf: OpenApiSchema[];
}

/**
 * Represets a type where all of the given schemas are combined into one.
 */
export interface OpenApiAllOfSchema {
  /**
   * Represents the schemas to combine.
   */
  allOf: OpenApiSchema[];
}

/**
 * Represets a type where one of the given schemas can be chosen inclusively.
 */
export interface OpenApiAnyOfSchema {
  /**
   * Represents the schemas to chose from.
   */
  anyOf: OpenApiSchema[];
}

/**
 * Represets a type where any type can be used except the given one.
 */
export interface OpenApiNotSchema {
  /**
   * Represents the disallowed schema.
   */
  not: OpenApiSchema;
}

/**
 * Represents the schema of a property.
 */
export interface OpenApiObjectSchemaProperty extends OpenApiNamedSchema {
  /**
   * Denotes whether the parameter is required for the according object.
   */
  required: boolean;
}

/**
 * Represents a schema referencing another schema by name.
 */
export type OpenApiReferenceSchema = OpenAPIV3.ReferenceObject & SchemaNaming;

/**
 * Represents an object containing the parsed names for a schema.
 */
export interface SchemaNaming {
  /**
   * Name of the referenced schema.
   */
  schemaName: string;

  /**
   * File name of the referenced schema file.
   */
  fileName: string;
}
