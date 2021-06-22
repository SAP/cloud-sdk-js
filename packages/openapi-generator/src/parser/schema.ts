import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { isReferenceObject } from '../schema-util';
import {
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiReferenceSchema,
  OpenApiSchema
} from '../openapi-types';
import { getType } from './type-mapping';
import { OpenApiDocumentRefs } from './refs';
import { ParserOptions } from './options';

const logger = createLogger('openapi-generator');

/**
 * Parse the original schema or reference object to a serializable schema.
 * @param schema Originally provided schema or reference object.
 * @param refs Object representing cross references throughout the document.
 * @param options Options that were set for service generation.
 * @returns The parsed schema.
 */
export function parseSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
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

  if (schema.type === 'array') {
    return parseArraySchema(schema, refs, options);
  }

  if (
    schema.type === 'object' ||
    schema.properties ||
    'additionalProperties' in schema
  ) {
    return parseObjectSchema(schema, refs, options);
  }

  if (schema.enum?.length) {
    return parseEnumSchema(schema, options);
  }

  if (schema.oneOf?.length) {
    return parseXOfSchema(schema, refs, 'oneOf', options);
  }

  if (schema.allOf?.length) {
    return parseXOfSchema(schema, refs, 'allOf', options);
  }

  if (schema.anyOf?.length) {
    return parseXOfSchema(schema, refs, 'anyOf', options);
  }

  if (schema.not) {
    return {
      not: parseSchema(schema.not, refs, options)
    };
  }

  return {
    type: getType(schema.type)
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
 * @param schema Original schema representing an array.
 * @param refs Object representing cross references throughout the document.
 * @param options Options that were set for service generation.
 * @returns The recursively parsed array schema.
 */
function parseArraySchema(
  schema: OpenAPIV3.ArraySchemaObject,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiArraySchema {
  return {
    uniqueItems: schema.uniqueItems,
    items: parseSchema(schema.items, refs, options)
  };
}

/**
 * Parse a schema to an object schema.
 * @param schema Original schema representing an object.
 * @param refs Object representing cross references throughout the document.
 * @param options Options that were set for service generation.
 * @returns The recursively parsed object schema.
 */
function parseObjectSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiObjectSchema {
  const properties = parseObjectSchemaProperties(schema, refs, options);

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
      ? parseSchema(schema.additionalProperties, refs, options)
      : { type: 'any' };

  return {
    properties,
    additionalProperties
  };
}

/**
 * Parse properties of an object as property schemas.
 * @param schema Original schema representing an object.
 * @param refs Object representing cross references throughout the document.
 * @param options Options that were set for service generation.
 * @returns The list of parsed property schemas.
 */
function parseObjectSchemaProperties(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiObjectSchemaProperty[] {
  return Object.entries(schema.properties || {}).reduce(
    (props, [propName, propSchema]) => [
      ...props,
      {
        schema: parseSchema(propSchema, refs, options),
        description: isReferenceObject(propSchema)
          ? undefined
          : propSchema.description,
        name: propName,
        required: schema.required?.includes(propName) || false
      }
    ],
    []
  );
}

/**
 * Parse an enum schema
 * @param schema Original schema representing an enum.
 * @param options Options that were set for service generation.
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
 * @param schema Original schema to parse.
 * @param refs Object representing cross references throughout the document.
 * @param xOf Key to identify which schema to parse.
 * @param options Options that were set for service generation.
 * @returns The parsed schema based on the given key.
 */
function parseXOfSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  xOf: 'oneOf' | 'allOf' | 'anyOf',
  options: ParserOptions
): any {
  return {
    [xOf]: (schema[xOf] || []).map(entry => parseSchema(entry, refs, options))
  };
}
