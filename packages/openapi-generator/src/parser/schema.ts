import { createLogger } from '@sap-cloud-sdk/util';
import { isReferenceObject } from '../schema-util';
import { getType } from './type-mapping';
import type { OpenAPIV3 } from 'openapi-types';
import type {
  OpenApiArraySchema,
  OpenApiConstSchema,
  OpenApiDiscriminator,
  OpenApiEnumSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiReferenceSchema,
  OpenApiSchema,
  OpenApiSchemaProperties,
  OpenApiSpecSchema,
  OpenApiTupleSchema
} from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

const logger = createLogger('openapi-generator');

/**
 * A schema object as it may appear in the source document. Accepts both the
 * OpenAPI 3.0.x `OpenAPIV3.SchemaObject` shape and the JSON Schema 2020-12
 * aligned 3.1 shape (array `type`, `const`, `prefixItems`, etc.), modeled by
 * {@link OpenApiSpecSchema}.
 * @internal
 */
export type InputSchemaObject = OpenApiSpecSchema;

/**
 * Get the `type` keyword of a schema as an array of type strings.
 * In OpenAPI 3.0.x this is a single string, in 3.1 it may already be an array.
 * @param schema - The schema to read the type from.
 * @returns The declared types as an array. Empty if no type is declared.
 * @internal
 */
export function getSchemaTypes(schema: OpenApiSpecSchema): string[] {
  const { type } = schema;
  if (type === undefined) {
    return [];
  }
  return Array.isArray(type) ? type : [type];
}

/**
 * Check whether a schema declares the given type. Handles both the single
 * string (3.0) and array (3.1) forms of the `type` keyword.
 * @param schema - The schema to check.
 * @param type - The type to check for.
 * @returns Whether the schema declares the given type.
 * @internal
 */
export function hasType(schema: OpenApiSpecSchema, type: string): boolean {
  return getSchemaTypes(schema).includes(type);
}

/**
 * Check whether a schema is nullable. In OpenAPI 3.0.x this is expressed via
 * `nullable: true`, in 3.1 via a `"null"` entry in the `type` array.
 * @param schema - The schema to check.
 * @returns Whether the schema is nullable.
 * @internal
 */
export function isNullableSchema(
  schema: OpenAPIV3.ReferenceObject | OpenApiSpecSchema
): boolean {
  if (isReferenceObject(schema)) {
    return false;
  }
  return !!schema.nullable || hasType(schema, 'null');
}

/**
 * Parse the original schema or reference object to a serializable schema.
 * @param schema - Originally provided schema or reference object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The parsed schema.
 * @internal
 */
export function parseSchema(
  schema: InputSchemaObject | OpenAPIV3.ReferenceObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiSchema {
  if (!schema) {
    logger.verbose("No schema provided, continuing with 'any'.");
    return { type: 'any' };
  }

  if (isReferenceObject(schema)) {
    return parseReferenceSchema(schema, refs);
  }

  const types = getSchemaTypes(schema);

  // OpenAPI 3.1: nullability expressed as '"null"' within the 'type' array.
  if (types.includes('null')) {
    const nonNullTypes = types.filter(type => type !== 'null');
    // A schema that is only 'null'.
    if (!nonNullTypes.length && !hasStructuralKeywords(schema)) {
      return { type: 'null' };
    }
    const { nullable, ...coreSchema } = schema;
    return makeNullable(
      parseSchema(
        {
          ...coreSchema,
          type: nonNullTypes.length === 1 ? nonNullTypes[0] : nonNullTypes
        },
        refs,
        options
      )
    );
  }

  // OpenAPI 3.1: multiple types form a union.
  if (types.length > 1) {
    return {
      anyOf: types.map(type => parseSchema({ ...schema, type }, refs, options))
    };
  }

  // OpenAPI 3.1: 'const' represents a single fixed value.
  if (schema.const !== undefined) {
    return parseConstSchema(schema);
  }

  // OpenAPI 3.1: 'prefixItems' represents a tuple.
  if (schema.prefixItems?.length) {
    return parseTupleSchema(schema, refs, options);
  }

  if (
    hasType(schema, 'array') ||
    (schema.items && !hasType(schema, 'object'))
  ) {
    return parseArraySchema(schema, refs, options);
  }

  if (schema.enum?.length) {
    return parseEnumSchema(schema, options);
  }

  if (schema.oneOf?.length || schema.discriminator) {
    return parseXOfSchema(schema, refs, 'oneOf', options);
  }

  if (schema.allOf?.length) {
    return parseXOfSchema(schema, refs, 'allOf', options);
  }

  if (schema.anyOf?.length) {
    return parseXOfSchema(schema, refs, 'anyOf', options);
  }

  // An object schema should be parsed after allOf, anyOf, oneOf.
  // When object.properties are at the same level with anyOf, oneOf, allOf, they should be treated as part of allOf, etc.
  if (
    hasType(schema, 'object') ||
    schema.properties ||
    schema.additionalProperties ||
    schema.patternProperties
  ) {
    return parseObjectSchema(schema, refs, options);
  }

  if (schema.not) {
    return {
      not: parseSchema(schema.not, refs, options)
    };
  }

  // OpenAPI 3.1 / JSON Schema 2020-12 expresses binary string content via
  // 'contentEncoding'/'contentMediaType' instead of the 3.0 'format: binary'
  // idiom. Map such content-encoded strings to 'Blob', consistent with the
  // binary handling elsewhere.
  if (
    hasType(schema, 'string') &&
    (schema.contentEncoding || schema.contentMediaType)
  ) {
    return { type: 'Blob' };
  }

  return {
    type: getType(schema.type, schema.format)
  };
}

/**
 * Check whether a schema defines structural keywords that carry meaning beyond
 * its declared `type`.
 * @param schema - The schema to check.
 * @returns Whether the schema has structural keywords.
 */
function hasStructuralKeywords(schema: OpenApiSpecSchema): boolean {
  return !!(
    schema.properties ||
    schema.additionalProperties ||
    schema.patternProperties ||
    schema.items ||
    schema.prefixItems ||
    schema.oneOf ||
    schema.allOf ||
    schema.anyOf ||
    schema.not ||
    schema.enum ||
    schema.const !== undefined ||
    schema.discriminator
  );
}

/**
 * Wrap a parsed schema so that it also allows `null`.
 * @param schema - The parsed schema to make nullable.
 * @returns A schema that additionally allows `null`.
 */
function makeNullable(schema: OpenApiSchema): OpenApiSchema {
  if ('anyOf' in schema && Array.isArray(schema.anyOf)) {
    return { ...schema, anyOf: [...schema.anyOf, { type: 'null' }] };
  }
  return { anyOf: [schema, { type: 'null' }] };
}

function parseReferenceSchema(
  schema: OpenAPIV3.ReferenceObject,
  refs: OpenApiDocumentRefs
): OpenApiReferenceSchema {
  return {
    ...schema,
    ...refs.getSchemaNaming(schema)
  };
}

/**
 * Parse a schema representing a single fixed value (`const`, OpenAPI 3.1).
 * @param schema - Original schema with a `const` keyword.
 * @returns The parsed const schema.
 */
function parseConstSchema(schema: OpenApiSpecSchema): OpenApiConstSchema {
  return {
    const: serializeLiteralValue(schema.const)
  };
}

/**
 * Serialize a literal value to its TypeScript literal type representation.
 * @param value - The value to serialize.
 * @returns The serialized literal type.
 */
function serializeLiteralValue(value: any): string {
  if (typeof value === 'string') {
    return getEnumStringValue(value);
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

/**
 * Parse a schema to an array schema.
 * @param schema - Original schema representing an array.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The recursively parsed array schema.
 */
function parseArraySchema(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiArraySchema {
  return {
    uniqueItems: schema.uniqueItems,
    items: parseSchema(
      typeof schema.items === 'object' ? schema.items : undefined,
      refs,
      options
    )
  };
}

/**
 * Parse a schema to a tuple schema, based on the JSON Schema 2020-12
 * `prefixItems` keyword adopted by OpenAPI 3.1.
 * @param schema - Original schema representing a tuple.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The recursively parsed tuple schema.
 */
function parseTupleSchema(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiTupleSchema {
  const tuple: OpenApiTupleSchema = {
    prefixItems: (schema.prefixItems || []).map(item =>
      parseSchema(item, refs, options)
    )
  };
  // 'items' governs additional entries beyond the tuple. 'false' disallows them.
  if (typeof schema.items === 'object') {
    tuple.additionalItems = parseSchema(schema.items, refs, options);
  }
  return tuple;
}

/**
 * @internal
 * Parse a schema to an object schema.
 * @param schema - Original schema representing an object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The recursively parsed object schema.
 */
export function parseObjectSchema(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiObjectSchema {
  if (schema.discriminator) {
    return parseXOfSchema(schema, refs, 'oneOf', options);
  }
  const properties = parseObjectSchemaProperties(schema, refs, options);

  if (schema.additionalProperties === false && !schema.patternProperties) {
    if (!properties.length) {
      throw new Error(
        'Could not parse object schema without neither properties nor additional properties.'
      );
    }

    return { properties };
  }

  const additionalProperties = parseAdditionalProperties(schema, refs, options);

  return {
    properties,
    additionalProperties
  };
}

/**
 * Parse the schema of additional properties of an object schema. In OpenAPI
 * 3.1 the `patternProperties` keyword can also constrain arbitrary keys; since
 * the generated `Record<string, ...>` type cannot express per-pattern value
 * types, the pattern value schemas are merged into the additional properties
 * type as a union.
 * @param schema - Original schema representing an object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The parsed additional properties schema.
 */
function parseAdditionalProperties(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiSchema {
  const patternPropertySchemas = Object.values(schema.patternProperties || {});
  const additionalPropertiesSchema =
    typeof schema.additionalProperties === 'object' &&
    Object.keys(schema.additionalProperties).length
      ? [schema.additionalProperties]
      : [];

  // When 'additionalProperties: false' but 'patternProperties' exist, only the
  // pattern value schemas govern additional keys.
  const valueSchemas =
    schema.additionalProperties === false
      ? patternPropertySchemas
      : [...patternPropertySchemas, ...additionalPropertiesSchema];

  if (!valueSchemas.length) {
    return { type: 'any' };
  }
  if (valueSchemas.length === 1) {
    return parseSchema(valueSchemas[0], refs, options);
  }
  return {
    anyOf: valueSchemas.map(valueSchema =>
      parseSchema(valueSchema, refs, options)
    )
  };
}

/**
 * Remove the nullability markers from a schema. Used where nullability is
 * carried separately by a `nullable` flag (object properties and persisted
 * schemas), to avoid emitting `| null` twice. Strips `nullable` and any
 * `"null"` entry from the `type` array.
 * @param schema - The schema or reference to strip nullability from.
 * @returns The schema without nullability markers.
 * @internal
 */
export function stripNullability(
  schema: OpenAPIV3.ReferenceObject | InputSchemaObject
): OpenAPIV3.ReferenceObject | InputSchemaObject {
  if (isReferenceObject(schema)) {
    return schema;
  }
  const types = getSchemaTypes(schema);
  if (!schema.nullable && !types.includes('null')) {
    return schema;
  }
  const { nullable, ...rest } = schema as OpenApiSpecSchema;
  const nonNullTypes = types.filter(type => type !== 'null');
  if (schema.type === undefined) {
    return rest;
  }
  return {
    ...rest,
    type: nonNullTypes.length === 1 ? nonNullTypes[0] : nonNullTypes
  };
}

/**
 * Parse properties of an object as property schemas.
 * @param schema - Original schema representing an object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @returns The list of parsed property schemas.
 */
function parseObjectSchemaProperties(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiObjectSchemaProperty[] {
  return Object.entries(schema.properties || {}).reduce(
    (props, [propName, propSchema]) => [
      ...props,
      {
        // Nullability is carried by the 'nullable' flag below, so strip it
        // from the schema itself to avoid emitting '| null' twice.
        schema: parseSchema(stripNullability(propSchema), refs, options),
        // OpenAPI 3.1 allows sibling annotations (e.g. 'description') next to
        // a '$ref'; prefer them when present.
        description: isReferenceObject(propSchema)
          ? (propSchema as OpenAPIV3.ReferenceObject & { description?: string })
              .description
          : propSchema.description,
        nullable: isNullableSchema(propSchema),
        name: propName,
        required: schema.required?.includes(propName) || false,
        schemaProperties: { ...parseSchemaProperties(propSchema) }
      }
    ],
    [] as OpenApiObjectSchemaProperty[]
  );
}

/**
 * Parse an enum schema.
 * @param schema - Original schema representing an enum.
 * @param options - Options that were set for service generation.
 * @returns The parsed enum schema.
 */
function parseEnumSchema(
  schema: OpenApiSpecSchema,
  options: ParserOptions
): OpenApiEnumSchema {
  const enumTypes = getSchemaTypes(schema).filter(type => type !== 'null');
  const type = enumTypes.length ? getType(enumTypes) : 'string';
  const nullable = isNullableSchema(schema);
  return {
    type,
    enum: (schema.enum || []).map(entry => {
      if (type === 'string' && entry !== null) {
        return getEnumStringValue(String(entry));
      }
      if (entry === null && !nullable) {
        if (options.strictNaming) {
          throw new Error(
            'null was used as a parameter in an enum, although the schema was not declared as nullable'
          );
        } else {
          logger.warn(
            'null was used as a parameter in an enum, although the schema was not declared as nullable'
          );
        }
      }
      return entry;
    })
  };
}

function getEnumStringValue(input: string): string {
  return `'${input.replace(/'/g, "\\'")}'`;
}

/**
 * Parse a 'oneOf', 'allOf' or 'anyOf' schema.
 * @param schema - Original schema to parse.
 * @param refs - Object representing cross references throughout the document.
 * @param xOf - Key to identify which schema to parse.
 * @param options - Options that were set for service generation.
 * @returns The parsed schema based on the given key.
 */
function parseXOfSchema(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  xOf: 'oneOf' | 'allOf' | 'anyOf',
  options: ParserOptions
): any {
  const normalizedSchema = normalizeSchema(schema, xOf);

  const xOfSchema = {
    [xOf]: (normalizedSchema[xOf] || []).map(entry =>
      parseSchema(
        {
          ...entry,
          required: [
            // Add required properties from the entry.
            ...('required' in entry && entry.required ? entry.required : []),
            // Add required properties from the top level schema (xOf).
            ...(normalizedSchema.required || [])
          ]
        },
        refs,
        options
      )
    )
  };

  if (schema.discriminator && xOf !== 'allOf') {
    return {
      ...xOfSchema,
      discriminator: parseDiscriminator(schema, refs, xOf, options)
    };
  }

  return xOfSchema;
}

function parseDiscriminator(
  schema: OpenApiSpecSchema,
  refs: OpenApiDocumentRefs,
  xOf: 'oneOf' | 'anyOf',
  options: ParserOptions
): OpenApiDiscriminator {
  const { discriminator } = schema;

  if (!discriminator) {
    throw new Error(
      'Could not parse discriminator schema without discriminator.'
    );
  }

  const discriminatorMapping = getDiscriminatorMapping(schema, xOf);

  return {
    propertyName: discriminator.propertyName,
    mapping: Object.entries(discriminatorMapping).reduce(
      (mapping, [propertyValue, schemaMapping]) => ({
        ...mapping,
        [propertyValue]: parseSchema({ $ref: schemaMapping }, refs, options)
      }),
      {}
    )
  };
}

/**
 * @internal
 */
export function normalizeSchema(
  schema: OpenApiSpecSchema,
  xOf: 'oneOf' | 'allOf' | 'anyOf'
): OpenApiSpecSchema {
  if (schema.discriminator) {
    return schema;
  }
  if (schema.properties || schema.additionalProperties) {
    logger.info(
      `Detected schema with ${xOf} and properties in the same level. This was refactored to a schema with ${xOf} only, containing all the properties from the top level.`
    );

    const { [xOf]: xOfSchema = [], ...objectSchema } = schema;
    return { [xOf]: [...xOfSchema, objectSchema] };
  }
  return schema;
}

/**
 * Parse schema properties e.g. 'maxLength', 'minimum', etc.
 * @param schema - Original schema representing a ref or schema object.
 * @returns The parsed schema properties object.
 * @internal
 */
export function parseSchemaProperties(
  schema: OpenAPIV3.ReferenceObject | InputSchemaObject
): OpenApiSchemaProperties {
  if (isReferenceObject(schema)) {
    return {};
  }
  const schemaPropertyNames = [
    'deprecated',
    'example',
    'examples',
    'format',
    'default',
    'multipleOf',
    'maximum',
    'minimum',
    'exclusiveMaximum',
    'exclusiveMinimum',
    'maxLength',
    'minLength',
    'minItems',
    'maxItems',
    'pattern',
    'contentEncoding',
    'contentMediaType'
  ];
  return schemaPropertyNames.reduce((properties, propertyName) => {
    const schemaAny = schema as Record<string, any>;
    const value = schemaAny[propertyName];
    // Numeric 'exclusiveMinimum'/'exclusiveMaximum' of '0' and empty 'examples'
    // arrays are meaningful, so guard on 'undefined' rather than falsiness for
    // those keywords.
    const isMeaningful =
      propertyName === 'exclusiveMaximum' || propertyName === 'exclusiveMinimum'
        ? value !== undefined
        : value;
    if (isMeaningful) {
      return { ...properties, [propertyName]: value };
    }
    return properties;
  }, {});
}

function getDiscriminatorMapping(
  schema: OpenApiSpecSchema,
  xOf: 'oneOf' | 'anyOf'
): Record<string, string> {
  return (
    schema.discriminator?.mapping ||
    (schema[xOf] || [])
      .filter(subSchema => isReferenceObject(subSchema))
      .reduce((mapping, subSchema) => {
        const originalSchemaName = (subSchema as OpenAPIV3.ReferenceObject).$ref
          .split('/')
          .reverse()[0];

        return {
          ...mapping,
          [originalSchemaName]: (subSchema as OpenAPIV3.ReferenceObject).$ref
        };
      }, {})
  );
}
