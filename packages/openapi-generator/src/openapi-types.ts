import type { OpenAPIV3 } from 'openapi-types';
import type { ServiceOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * A schema object as it may appear in an OpenAPI 3.0.x or 3.1.0 document.
 *
 * OpenAPI 3.1 aligns the Schema Object with JSON Schema 2020-12. Compared to
 * 3.0 this allows, amongst others, `type` to be an array (possibly containing
 * `"null"`), numeric `exclusiveMinimum`/`exclusiveMaximum`, `const`,
 * `prefixItems` (tuples), `contentEncoding`/`contentMediaType`, an `examples`
 * array and `patternProperties`. This type is intentionally permissive (it
 * carries an index signature) so the parser can read any of these keywords
 * regardless of the source document version.
 * @internal
 */
export interface OpenApiSpecSchema {
  /**
   * Allows reading arbitrary JSON Schema 2020-12 keywords that are not modeled
   * explicitly below.
   */
  [key: string]: any;

  /**
   * Type of the schema. A single string in 3.0, possibly an array of types
   * (optionally including `"null"`) in 3.1.
   */
  type?: string | string[];

  /**
   * Format hint for the schema type.
   */
  format?: string;

  /**
   * Title of the schema.
   */
  title?: string;

  /**
   * Description of the schema.
   */
  description?: string;

  /**
   * Denotes whether the schema is nullable. Only present in OpenAPI 3.0.x; in
   * 3.1 nullability is expressed via `"null"` in the `type` array.
   */
  nullable?: boolean;

  /**
   * A single fixed value the schema must equal (JSON Schema 2020-12, 3.1).
   */
  const?: any;

  /**
   * Enumeration of allowed values.
   */
  enum?: any[];

  /**
   * Schema of the items of an array. In a tuple (`prefixItems`) schema this
   * governs additional items beyond the tuple; `false` disallows them.
   */
  items?: OpenApiSpecSchema | OpenAPIV3.ReferenceObject | boolean;

  /**
   * Positional tuple item schemas (JSON Schema 2020-12, 3.1).
   */
  prefixItems?: (OpenApiSpecSchema | OpenAPIV3.ReferenceObject)[];

  /**
   * Denotes whether the items of an array have to be unique.
   */
  uniqueItems?: boolean;

  /**
   * Properties of an object schema.
   */
  properties?: Record<string, OpenApiSpecSchema | OpenAPIV3.ReferenceObject>;

  /**
   * Schemas for properties matching a regular expression (JSON Schema
   * 2020-12, 3.1).
   */
  patternProperties?: Record<
    string,
    OpenApiSpecSchema | OpenAPIV3.ReferenceObject
  >;

  /**
   * Schema for additional properties of an object.
   */
  additionalProperties?:
    boolean | OpenApiSpecSchema | OpenAPIV3.ReferenceObject;

  /**
   * List of required property names.
   */
  required?: string[];

  /**
   * List of schemas of which exactly one has to match.
   */
  oneOf?: (OpenApiSpecSchema | OpenAPIV3.ReferenceObject)[];

  /**
   * List of schemas of which all have to match.
   */
  allOf?: (OpenApiSpecSchema | OpenAPIV3.ReferenceObject)[];

  /**
   * List of schemas of which at least one has to match.
   */
  anyOf?: (OpenApiSpecSchema | OpenAPIV3.ReferenceObject)[];

  /**
   * Schema that must not match.
   */
  not?: OpenApiSpecSchema | OpenAPIV3.ReferenceObject;

  /**
   * Discriminator to distinguish between `oneOf`/`anyOf` schemas.
   */
  discriminator?: OpenAPIV3.DiscriminatorObject;
}

/**
 * Representation of an OpenAPI specification/document.
 * @internal
 */
export interface OpenApiDocument {
  /**
   * Name of the service. This is used for documentation.
   */
  serviceName: string;

  /**
   * Description of the service. This is used for documentation.
   */
  serviceDescription?: string;

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
 * @internal
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
 * @internal
 */
export interface OpenApiOperation extends Omit<
  OpenAPIV3.OperationObject,
  'requestBody'
> {
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

  /**
   * Header parameters available for this operation.
   */
  headerParameters: OpenApiParameter[];
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
 * @internal
 */
export type Method = (typeof supportedMethods)[keyof typeof supportedMethods];

/**
 * Get supported methods.
 * @returns Methods supported by OpenAPI and SAP Cloud SDK.
 * @internal
 */
export const methods: Method[] = Object.values(supportedMethods);

/**
 * Representation of a parameter for both queries and path parameters.
 * @internal
 */
export interface OpenApiParameter
  extends Omit<OpenAPIV3.ParameterObject, 'schema'>, OpenApiNamedSchema {
  /**
   * Name as in the specification.
   */
  originalName: string;
}

/**
 * Representation of a request body.
 * @internal
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
   * Media type of the body.
   */
  mediaType: string;

  /**
   * Description of the body.
   */
  description?: string;

  /**
   * Encoding options for multipart/form-data properties.
   * Maps property names to their encoding configuration (e.g., contentType).
   */
  encoding?: Record<
    string,
    {
      contentType: string;
      isImplicit: boolean;
      parsedContentTypes: {
        type: string;
        parameters: { [key: string]: string };
      }[];
    }
  >;
}

/**
 * Representation of a media type.
 * @internal
 */
export type OpenApiMediaTypeObject = OpenAPIV3.MediaTypeObject & {
  mediaType: string;
};

/**
 * Represents all possible Types of schemas.
 * @internal
 */
export type OpenApiSchema =
  | OpenApiReferenceSchema
  | OpenApiArraySchema
  | OpenApiTupleSchema
  | OpenApiSimpleSchema
  | OpenApiConstSchema
  | OpenApiObjectSchema
  | OpenApiEnumSchema
  | OpenApiOneOfSchema
  | OpenApiAllOfSchema
  | OpenApiAnyOfSchema
  | OpenApiNotSchema;

/**
 * Represents a reference to a schema, that has a name.
 * @internal
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

  /**
   * Denotes the schema properties.
   */
  schemaProperties: OpenApiSchemaProperties;
}

/**
 * Represents a reference to a schema, that will be saved in a file.
 * @internal
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

  /**
   * Denotes the schema properties.
   */
  schemaProperties: OpenApiSchemaProperties;

  /**
   * Denotes whether the schema is nullable.
   */
  nullable: boolean;
}

/**
 * Represents an object that can be referenced by the given path.
 * @internal
 */
export interface WithRefPath {
  /**
   * Path as referenced in reference objects.
   */
  refPath: string;
}

/**
 * A schema representing an array.
 * @internal
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
 * A schema representing a tuple, i.e. an array with positional item schemas.
 * This corresponds to the JSON Schema 2020-12 `prefixItems` keyword adopted by
 * OpenAPI 3.1.
 * @internal
 */
export interface OpenApiTupleSchema {
  /**
   * Positional schemas for the leading elements of the tuple.
   */
  prefixItems: OpenApiSchema[];

  /**
   * Schema for elements beyond the positional ones. When `undefined`, no
   * additional items are allowed (the array is a fixed-length tuple).
   */
  additionalItems?: OpenApiSchema;
}

/**
 * Any schema that is no other specific schema. This includes primitive types.
 * @internal
 */
export interface OpenApiSimpleSchema {
  /**
   * Type represented by the schema.
   */
  type: string;
}

/**
 * Schema representing a single fixed value, corresponding to the JSON Schema
 * 2020-12 `const` keyword adopted by OpenAPI 3.1.
 * @internal
 */
export interface OpenApiConstSchema {
  /**
   * The serialized TypeScript literal type of the fixed value.
   */
  const: string;
}

/**
 * Schema representing an enum type.
 * @internal
 */
export interface OpenApiEnumSchema extends OpenApiSimpleSchema {
  /**
   * Values enumerated by the enum.
   */
  enum: string[];
}

/**
 * Schema representing an object.
 * @internal
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
 * Parsed discriminator of a `oneOf` or `anyOf` schema.
 * @internal
 */
export type OpenApiDiscriminator = Omit<
  OpenAPIV3.DiscriminatorObject,
  'mapping'
> & {
  mapping: Record<string, OpenApiReferenceSchema>;
};

/**
 * Represents a type where one of the given schemas can be chosen exclusively.
 * @internal
 */
export interface OpenApiOneOfSchema {
  /**
   * Represents the schemas to chose from.
   */
  oneOf: OpenApiSchema[];
  /**
   * Represents a discriminator.
   */
  discriminator?: OpenApiDiscriminator;
}

/**
 * Represents a type where all of the given schemas are combined into one.
 * @internal
 */
export interface OpenApiAllOfSchema {
  /**
   * Represents the schemas to combine.
   */
  allOf: OpenApiSchema[];
}

/**
 * Represents a type where one of the given schemas can be chosen inclusively.
 * @internal
 */
export interface OpenApiAnyOfSchema {
  /**
   * Represents the schemas to chose from.
   */
  anyOf: OpenApiSchema[];
  /**
   * Represents a discriminator.
   */
  discriminator?: OpenApiDiscriminator;
}

/**
 * Represents a type where any type can be used except the given one.
 * @internal
 */
export interface OpenApiNotSchema {
  /**
   * Represents the disallowed schema.
   */
  not: OpenApiSchema;
}

/**
 * Represents the schema of a property.
 * @internal
 */
export interface OpenApiObjectSchemaProperty extends OpenApiNamedSchema {
  /**
   * Denotes whether the parameter is required for the according object.
   */
  required: boolean;
  /**
   * Denotes whether the parameter is nullable.
   */
  nullable: boolean;
}

/**
 * Represents a schema referencing another schema by name.
 * @internal
 */
export type OpenApiReferenceSchema = OpenAPIV3.ReferenceObject & SchemaNaming;

/**
 * Represents an object containing the parsed names for a schema.
 * @internal
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
/**
 * @internal
 */
export interface OpenApiSchemaProperties {
  /**
   * Serves as a hint at the contents of the type.
   */
  format?: string;

  /**
   * Denotes the default value for a property.
   */
  default?: any;

  /**
   * Specifies that a number must be the multiple of another number.
   */
  multipleOf?: number;

  /**
   * Denotes the maximum range of possible values.
   */
  maximum?: number;

  /**
   * Denotes the minimum range of possible values.
   */
  minimum?: number;

  /**
   * Denotes an exclusive upper bound. A boolean modifier of `maximum` in
   * OpenAPI 3.0.x, a numeric bound in OpenAPI 3.1.
   */
  exclusiveMaximum?: number | boolean;

  /**
   * Denotes an exclusive lower bound. A boolean modifier of `minimum` in
   * OpenAPI 3.0.x, a numeric bound in OpenAPI 3.1.
   */
  exclusiveMinimum?: number | boolean;

  /**
   * Denotes the maximum length of a string.
   */
  maxLength?: number;

  /**
   * Denotes the minimum length of a string.
   */
  minLength?: number;

  /**
   * Denotes the minimum length of an array.
   */
  minItems?: number;

  /**
   * Denotes the maximum length of an array.
   */
  maxItems?: number;

  /**
   * Denotes a regular expression template for the string value.
   */
  pattern?: string;

  /**
   * Denotes whether the schemas or schema property is deprecated.
   */
  deprecated?: boolean;

  /**
   * Example value for schema or schema property.
   */
  example?: any;

  /**
   * Example values for schema or schema property (JSON Schema 2020-12, 3.1).
   * Supersedes the singular, deprecated `example`.
   */
  examples?: any[];

  /**
   * Denotes the encoding of string content, e.g. `base64` (JSON Schema
   * 2020-12, 3.1).
   */
  contentEncoding?: string;

  /**
   * Denotes the media type of string content, e.g. `image/png` (JSON Schema
   * 2020-12, 3.1).
   */
  contentMediaType?: string;
}
