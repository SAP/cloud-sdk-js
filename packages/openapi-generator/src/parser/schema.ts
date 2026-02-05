import { createLogger } from '@sap-cloud-sdk/util';
import { isReferenceObject } from '../schema-util';
import { getType } from './type-mapping';
import type { OpenAPIV3 } from 'openapi-types';
import type {
  OpenApiArraySchema,
  OpenApiDiscriminator,
  OpenApiEnumSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiReferenceSchema,
  OpenApiSchema,
  OpenApiSchemaProperties
} from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

const logger = createLogger('openapi-generator');

/**
 * Parse the original schema or reference object to a serializable schema.
 * @param schema - Originally provided schema or reference object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @param mediaType - Optional media type context for proper type mapping (e.g., 'multipart/form-data').
 * @returns The parsed schema.
 * @internal
 */
export function parseSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  refs: OpenApiDocumentRefs,
  options: ParserOptions,
  mediaType?: string
): OpenApiSchema {
  if (!schema) {
    logger.verbose("No schema provided, continuing with 'any'.");
    return { type: 'any' };
  }

  if (isReferenceObject(schema)) {
    return parseReferenceSchema(schema, refs);
  }

  if (schema.type === 'array') {
    return parseArraySchema(schema, refs, options, mediaType);
  }

  if (schema.enum?.length) {
    return parseEnumSchema(schema, options);
  }

  if (schema.oneOf?.length || schema.discriminator) {
    return parseXOfSchema(schema, refs, 'oneOf', options, mediaType);
  }

  if (schema.allOf?.length) {
    return parseXOfSchema(schema, refs, 'allOf', options, mediaType);
  }

  if (schema.anyOf?.length) {
    return parseXOfSchema(schema, refs, 'anyOf', options, mediaType);
  }

  // An object schema should be parsed after allOf, anyOf, oneOf.
  // When object.properties are at the same level with anyOf, oneOf, allOf, they should be treated as part of allOf, etc.
  if (
    schema.type === 'object' ||
    schema.properties ||
    schema.additionalProperties
  ) {
    return parseObjectSchema(schema, refs, options, mediaType);
  }

  if (schema.not) {
    return {
      not: parseSchema(schema.not, refs, options, mediaType)
    };
  }

  return {
    type: getType(schema.type, schema.format, mediaType)
  };
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
 * Parse a schema to an array schema.
 * @param schema - Original schema representing an array.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @param mediaType - Optional media type context for proper type mapping.
 * @returns The recursively parsed array schema.
 */
function parseArraySchema(
  schema: OpenAPIV3.ArraySchemaObject,
  refs: OpenApiDocumentRefs,
  options: ParserOptions,
  mediaType?: string
): OpenApiArraySchema {
  return {
    uniqueItems: schema.uniqueItems,
    items: parseSchema(schema.items, refs, options, mediaType)
  };
}

/**
 * @internal
 * Parse a schema to an object schema.
 * @param schema - Original schema representing an object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @param mediaType - Optional media type context for proper type mapping.
 * @returns The recursively parsed object schema.
 */
export function parseObjectSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  options: ParserOptions,
  mediaType?: string
): OpenApiObjectSchema {
  if (schema.discriminator) {
    return parseXOfSchema(schema, refs, 'oneOf', options, mediaType);
  }
  const properties = parseObjectSchemaProperties(
    schema,
    refs,
    options,
    mediaType
  );

  if (schema.additionalProperties === false) {
    if (!properties.length) {
      throw new Error(
        'Could not parse object schema without neither properties nor additional properties.'
      );
    }

    return { properties };
  }

  const additionalProperties =
    typeof schema.additionalProperties === 'object' &&
    Object.keys(schema.additionalProperties).length
      ? parseSchema(schema.additionalProperties, refs, options, mediaType)
      : { type: 'any' };

  return {
    properties,
    additionalProperties
  };
}

/**
 * Parse properties of an object as property schemas.
 * @param schema - Original schema representing an object.
 * @param refs - Object representing cross references throughout the document.
 * @param options - Options that were set for service generation.
 * @param mediaType - Optional media type context for proper type mapping.
 * @returns The list of parsed property schemas.
 */
function parseObjectSchemaProperties(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  options: ParserOptions,
  mediaType?: string
): OpenApiObjectSchemaProperty[] {
  return Object.entries(schema.properties || {}).reduce(
    (props, [propName, propSchema]) => [
      ...props,
      {
        schema: parseSchema(propSchema, refs, options, mediaType),
        description: isReferenceObject(propSchema)
          ? undefined
          : propSchema.description,
        nullable:
          (!isReferenceObject(propSchema) && propSchema.nullable) ?? false,
        name: propName,
        required: schema.required?.includes(propName) || false,
        schemaProperties: { ...parseSchemaProperties(propSchema) }
      }
    ],
    []
  );
}

/**
 * Parse an enum schema.
 * @param schema - Original schema representing an enum.
 * @param options - Options that were set for service generation.
 * @returns The parsed enum schema.
 */
function parseEnumSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  options: ParserOptions
): OpenApiEnumSchema {
  const type = schema.type ? getType(schema.type) : 'string';
  return {
    type,
    enum: (schema.enum || []).map(entry => {
      if (type === 'string' && entry !== null) {
        return getEnumStringValue(String(entry));
      }
      if (entry === null && !schema.nullable) {
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
 * @param mediaType - Optional media type context for proper type mapping.
 * @returns The parsed schema based on the given key.
 */
function parseXOfSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  xOf: 'oneOf' | 'allOf' | 'anyOf',
  options: ParserOptions,
  mediaType?: string
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
        options,
        mediaType
      )
    )
  };

  if (schema.discriminator && xOf !== 'allOf') {
    return {
      ...xOfSchema,
      discriminator: parseDiscriminator(schema, refs, xOf, options, mediaType)
    };
  }

  return xOfSchema;
}

function parseDiscriminator(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  xOf: 'oneOf' | 'anyOf',
  options: ParserOptions,
  mediaType?: string
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
        [propertyValue]: parseSchema(
          { $ref: schemaMapping },
          refs,
          options,
          mediaType
        )
      }),
      {}
    )
  };
}

/**
 * @internal
 */
export function normalizeSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  xOf: 'oneOf' | 'allOf' | 'anyOf'
): OpenAPIV3.NonArraySchemaObject {
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
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
): OpenApiSchemaProperties {
  if (isReferenceObject(schema)) {
    return {};
  }
  const schemaPropertyNames = [
    'deprecated',
    'example',
    'format',
    'default',
    'multipleOf',
    'maximum',
    'minimum',
    'maxLength',
    'minLength',
    'minItems',
    'maxItems',
    'pattern'
  ];
  return schemaPropertyNames.reduce((properties, propertyName) => {
    if (schema[propertyName]) {
      return { ...properties, [propertyName]: schema[propertyName] };
    }
    return properties;
  }, {});
}

function getDiscriminatorMapping(
  schema: OpenAPIV3.NonArraySchemaObject,
  xOf: 'oneOf' | 'anyOf'
): Record<string, string> {
  return (
    schema.discriminator?.mapping ||
    (schema[xOf] || [])
      .filter(subSchema => isReferenceObject(subSchema))
      .reduce((mapping, subSchema) => {
        const originalSchemaName = subSchema.$ref.split('/').reverse()[0];

        return {
          ...mapping,
          [originalSchemaName]: subSchema.$ref
        };
      }, {})
  );
}
