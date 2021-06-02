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

const logger = createLogger('openapi-generator');

/**
 * Parse the original schema or reference object to a serializable schema.
 * @param schema Originally provided schema or reference object.
 * @param refs Object representing cross references throughout the document.
 * @returns The parsed schema.
 */
export function parseSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  refs: OpenApiDocumentRefs
): OpenApiSchema {
  if (!schema) {
    logger.verbose("No schema provided, continuing with 'any'.");
    return { type: 'any' };
  }

  if (isReferenceObject(schema)) {
    return parseReferenceSchema(schema, refs);
  }

  if (schema.type === 'array') {
    return parseArraySchema(schema, refs);
  }

  if (
    schema.type === 'object' ||
    schema.properties ||
    'additionalProperties' in schema
  ) {
    return parseObjectSchema(schema, refs);
  }

  if (schema.enum?.length) {
    return parseEnumSchema(schema);
  }

  if (schema.oneOf?.length) {
    return parseXOfSchema(schema, refs, 'oneOf');
  }

  if (schema.allOf?.length) {
    return parseXOfSchema(schema, refs, 'allOf');
  }

  if (schema.anyOf?.length) {
    return parseXOfSchema(schema, refs, 'anyOf');
  }

  if (schema.not) {
    return {
      not: parseSchema(schema.not, refs)
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
 * @returns The recursively parsed array schema.
 */
function parseArraySchema(
  schema: OpenAPIV3.ArraySchemaObject,
  refs: OpenApiDocumentRefs
): OpenApiArraySchema {
  return {
    uniqueItems: schema.uniqueItems,
    items: parseSchema(schema.items, refs)
  };
}

/**
 * Parse a schema to an object schema.
 * @param schema Original schema representing an object.
 * @param refs Object representing cross references throughout the document.
 * @returns The recursively parsed object schema.
 */
function parseObjectSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs
): OpenApiObjectSchema {
  const properties = parseObjectSchemaProperties(schema, refs);

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
      ? parseSchema(schema.additionalProperties, refs)
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
 * @returns The list of parsed property schemas.
 */
function parseObjectSchemaProperties(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs
): OpenApiObjectSchemaProperty[] {
  return Object.entries(schema.properties || {}).reduce(
    (props, [propName, propSchema]) => [
      ...props,
      {
        schema: parseSchema(propSchema, refs),
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
 * @returns The parsed enum schema.
 */
function parseEnumSchema(
  schema: OpenAPIV3.NonArraySchemaObject
): OpenApiEnumSchema {
  const type = schema.type ? getType(schema.type) : 'string';
  return {
    type,
    enum: (schema.enum || []).map(entry => {
      if (type === 'string' && entry !== null) {
        return getEnumStringValue(String(entry));
      }
      if (entry === null && !schema.nullable) {
        throw new Error(
          "'Null' was used as a parameter, but nullable wasn't declared"
        );
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
 * @returns The parsed schema based on the given key.
 */
function parseXOfSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  refs: OpenApiDocumentRefs,
  xOf: 'oneOf' | 'allOf' | 'anyOf'
): any {
  return {
    [xOf]: (schema[xOf] || []).map(entry => parseSchema(entry, refs))
  };
}
