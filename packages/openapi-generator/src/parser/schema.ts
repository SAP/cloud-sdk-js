import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { isReferenceObject } from '../model';
import {
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiSchema
} from '../openapi-types';
import { getType } from './type-mapping';

const logger = createLogger('openapi-generator');

/**
 * Parse the original schema or reference object to a serializable schema.
 * @param schema Originally provided schema or reference object.
 * @returns The parsed schema.
 */
export function parseSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined
): OpenApiSchema {
  if (!schema) {
    logger.debug("No schema provided, continuing with 'any'.");
    return { type: 'any' };
  }

  if (isReferenceObject(schema)) {
    return schema;
  }

  if (schema.type === 'array') {
    return parseArraySchema(schema);
  }

  if (
    schema.type === 'object' ||
    schema.properties ||
    'additionalProperties' in schema
  ) {
    return parseObjectSchema(schema);
  }

  if (schema.enum?.length) {
    return parseEnumSchema(schema);
  }

  if (schema.oneOf?.length) {
    return parseXOfSchema(schema, 'oneOf');
  }

  if (schema.allOf?.length) {
    return parseXOfSchema(schema, 'allOf');
  }

  if (schema.anyOf?.length) {
    return parseXOfSchema(schema, 'anyOf');
  }

  if (schema.not) {
    return {
      not: parseSchema(schema.not)
    };
  }

  return {
    type: getType(schema.type)
  };
}

/**
 * Parse a schema to an array schema.
 * @param schema Original schema representing an array.
 * @returns The recursively parsed array schema.
 */
function parseArraySchema(
  schema: OpenAPIV3.ArraySchemaObject
): OpenApiArraySchema {
  return {
    type: 'array',
    uniqueItems: !!schema.uniqueItems,
    items: parseSchema(schema.items)
  };
}

/**
 * Parse a schema to an object schema.
 * @param schema Original schema representing an object.
 * @returns The recursively parsed object schema.
 */
function parseObjectSchema(
  schema: OpenAPIV3.NonArraySchemaObject
): OpenApiObjectSchema {
  const properties = parseObjectSchemaProperties(schema);
  const additionalProperties =
    typeof schema.additionalProperties === 'object'
      ? !Object.keys(schema.additionalProperties).length
        ? true
        : parseSchema(schema.additionalProperties)
      : schema.additionalProperties ?? true;
  if (!properties.length && !additionalProperties) {
    throw new Error(
      'Could not parse object schema without neither properties nor additional properties.'
    );
  }

  return {
    type: 'object',
    properties,
    additionalProperties
  };
}

/**
 * Parse properties of an object as property schemas.
 * @param schema Original schema representing an object.
 * @returns The list of parsed property schemas.
 */
function parseObjectSchemaProperties(
  schema: OpenAPIV3.NonArraySchemaObject
): OpenApiObjectSchemaProperty[] {
  return Object.entries(schema.properties || {}).reduce(
    (props, [propName, propSchema]) => [
      ...props,
      {
        schema: parseSchema(propSchema),
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
  const type = getType(schema.type);
  return {
    type,
    enum: (schema.enum || []).map(entry =>
      type === 'string' ? `'${entry}'` : entry
    )
  };
}

/**
 * Parse a 'oneOf', 'allOf' or 'anyOf' schema.
 * @param schema Original schema to parse.
 * @param xOf Key to identify which schema to parse.
 * @returns The parsed schema based on the given key.
 */
function parseXOfSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  xOf: 'oneOf' | 'allOf' | 'anyOf'
): any {
  return {
    [xOf]: (schema[xOf] || []).map(entry => parseSchema(entry))
  };
}
