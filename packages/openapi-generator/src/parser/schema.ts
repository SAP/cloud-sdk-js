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

/**
 * Type guard to check whether an object is of type `OpenAPIV3.ArraySchemaObject`.
 * @param obj Object to check.
 * @returns True if the object is a array schema object, false otherwise.
 */
export function isArraySchemaObject(
  obj: any
): obj is OpenAPIV3.ArraySchemaObject {
  return obj?.type === 'array';
}

export function parseSchema(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
): OpenApiSchema {
  if (isReferenceObject(schema)) {
    return schema;
  }
  if (isArraySchemaObject(schema)) {
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

export function parseArraySchema(
  schema: OpenAPIV3.ArraySchemaObject
): OpenApiArraySchema {
  return {
    type: 'array',
    uniqueItems: !!schema.uniqueItems,
    items: parseSchema(schema.items)
  };
}

export function parseObjectSchema(
  schema: OpenAPIV3.NonArraySchemaObject
): OpenApiObjectSchema {
  return {
    type: 'object',
    properties: parseObjectSchemaProperties(schema),
    additionalProperties:
      typeof schema.additionalProperties === 'object'
        ? !Object.keys(schema.additionalProperties).length
          ? true
          : parseSchema(schema.additionalProperties)
        : schema.additionalProperties ?? true
  };
}

export function parseObjectSchemaProperties(
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

export function parseEnumSchema(
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

// export function parseXOfSchema(
//   schema: OpenAPIV3.NonArraySchemaObject,
//   xOf: 'oneOf'
// ): OpenApiOneOfSchema;
// export function parseXOfSchema(
//   schema: OpenAPIV3.NonArraySchemaObject,
//   xOf: 'allOf'
// ): OpenApiAllOfSchema;
// export function parseXOfSchema(
//   schema: OpenAPIV3.NonArraySchemaObject,
//   xOf: 'anyOf'
// ): OpenApiAnyOfSchema;

export function parseXOfSchema(
  schema: OpenAPIV3.NonArraySchemaObject,
  xOf: 'oneOf' | 'allOf' | 'anyOf'
): any {
  return {
    [xOf]: (schema[xOf] || []).map(entry => parseSchema(entry))
  };
}

// export function parseOneOfSchema(
//   schema: OpenAPIV3.NonArraySchemaObject
// ): OpenApiOneOfSchema {
//   return parseXOfSchema(schema, 'oneOf');
// }

// export function parseAllOfSchema(
//   schema: OpenAPIV3.NonArraySchemaObject
// ): OpenApiAllOfSchema {
//   return parseXOfSchema(schema, 'allOf');
// }

// export function parseAnyOfSchema(
//   schema: OpenAPIV3.NonArraySchemaObject
// ): OpenApiAnyOfSchema {
//   return parseXOfSchema(schema, 'anyOf');
// }
