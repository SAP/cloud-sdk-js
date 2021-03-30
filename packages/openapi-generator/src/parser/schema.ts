import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { isReferenceObject, parseTypeNameFromRef } from '../schema-util';
import {
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiReferenceSchema,
  OpenApiSchema
} from '../openapi-types';
import { getType } from './type-mapping';

const logger = createLogger('openapi-generator');

/**
 * Parse the original schema or reference object to a serializable schema.
 * @param schema Originally provided schema or reference object.
 * @param schemaRefMapping Mapping between references and parsed names of the schemas.
 * @returns The parsed schema.
 */
export function parseSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  schemaRefMapping: Record<string, string>
): OpenApiSchema {
  if (!schema) {
    logger.debug("No schema provided, continuing with 'any'.");
    return { type: 'any' };
  }

  if (isReferenceObject(schema)) {
    return parseReferenceSchema(schema, schemaRefMapping);
  }

  if (schema.type === 'array') {
    return parseArraySchema(schema, schemaRefMapping);
  }

  if (
    schema.type === 'object' ||
    schema.properties ||
    'additionalProperties' in schema
  ) {
    return parseObjectSchema(schema, schemaRefMapping);
  }

  if (schema.enum?.length) {
    return parseEnumSchema(schema);
  }

  if (schema.oneOf?.length) {
    return parseXOfSchema(schema, schemaRefMapping, 'oneOf');
  }

  if (schema.allOf?.length) {
    return parseXOfSchema(schema, schemaRefMapping, 'allOf');
  }

  if (schema.anyOf?.length) {
    return parseXOfSchema(schema, schemaRefMapping, 'anyOf');
  }

  if (schema.not) {
    return {
      not: parseSchema(schema.not, schemaRefMapping)
    };
  }

  return {
    type: getType(schema.type)
  };
}

function parseReferenceSchema(
  schema: OpenAPIV3.ReferenceObject,
  schemaRefMapping: Record<string, string>
): OpenApiReferenceSchema {
  return {
    ...schema,
    schemaName: parseTypeNameFromRef(schema, schemaRefMapping)
  };
}

/**
 * Parse a schema to an array schema.
 * @param schema Original schema representing an array.
 * @param schemaRefMapping Mapping between references and parsed names of the schemas.
 * @returns The recursively parsed array schema.
 */
function parseArraySchema(
  schema: OpenAPIV3.ArraySchemaObject,
  schemaRefMapping: Record<string, string>
): OpenApiArraySchema {
  return {
    uniqueItems: schema.uniqueItems,
    items: parseSchema(schema.items, schemaRefMapping)
  };
}

/**
 * Parse a schema to an object schema.
 * @param schema Original schema representing an object.
 * @param schemaRefMapping Mapping between references and parsed names of the schemas.
 * @returns The recursively parsed object schema.
 */
function parseObjectSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  schemaRefMapping: Record<string, string>
): OpenApiObjectSchema {
  const properties = parseObjectSchemaProperties(schema, schemaRefMapping);

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
      ? parseSchema(schema.additionalProperties, schemaRefMapping)
      : { type: 'any' };

  return {
    properties,
    additionalProperties
  };
}

/**
 * Parse properties of an object as property schemas.
 * @param schema Original schema representing an object.
 * @param schemaRefMapping Mapping between references and parsed names of the schemas.
 * @returns The list of parsed property schemas.
 */
function parseObjectSchemaProperties(
  schema: OpenAPIV3.NonArraySchemaObject,
  schemaRefMapping: Record<string, string>
): OpenApiObjectSchemaProperty[] {
  return Object.entries(schema.properties || {}).reduce(
    (props, [propName, propSchema]) => [
      ...props,
      {
        schema: parseSchema(propSchema, schemaRefMapping),
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
 * @param schemaRefMapping Mapping between references and parsed names of the schemas.
 * @param xOf Key to identify which schema to parse.
 * @returns The parsed schema based on the given key.
 */
function parseXOfSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  schemaRefMapping: Record<string, string>,
  xOf: 'oneOf' | 'allOf' | 'anyOf'
): any {
  return {
    [xOf]: (schema[xOf] || []).map(entry =>
      parseSchema(entry, schemaRefMapping)
    )
  };
}
