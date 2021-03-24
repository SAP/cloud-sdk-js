import { kebabCase, last, pascalCase, unique } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import {
  OpenApiAllOfSchema,
  OpenApiAnyOfSchema,
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiNotSchema,
  OpenApiObjectSchema,
  OpenApiOneOfSchema,
  OpenApiSchema
} from './openapi-types';

/**
 * Collect all reference paths within a schema.
 * @param schema Parsed schema to retrieve all references for.
 * @returns Returns a list of reference paths within a schema.
 */
export function collectRefs(schema: OpenApiSchema | undefined): string[] {
  if (!schema) {
    return [];
  }
  if (isReferenceObject(schema)) {
    return [schema.$ref];
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce((refs, value) => unique([...refs, ...collectRefs(value)]), []);
}

/**
 * Check whether a schema includes the not schema.
 * @param schema Parsed schema to check.
 * @returns True if the parsed schema contains am not schema, false otherwise.
 */
export function hasNotSchema(schema: OpenApiSchema): boolean {
  if (isNotSchema(schema)) {
    return true;
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce(
      (containsNotSchema, value) => containsNotSchema || hasNotSchema(value),
      false
    );
}

/**
 * Type guard to check whether an object is of type `OpenAPIV3.ReferenceObject`.
 * @param obj Object to check.
 * @returns True if the object is a reference object, false otherwise.
 */
export function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return !!obj?.$ref;
}

/**
 * Type guard to check whether an object is of type `OpenApiArraySchema`.
 * @param obj Object to check.
 * @returns True if the object is an array schema, false otherwise.
 */
export function isArraySchema(obj: any): obj is OpenApiArraySchema {
  return obj?.type === 'array';
}

/**
 * Type guard to check whether an object is of type `OpenApiObjectSchema`.
 * @param obj Object to check.
 * @returns True if the object is an object schema, false otherwise.
 */
export function isObjectSchema(obj: any): obj is OpenApiObjectSchema {
  return obj?.type === 'object';
}

/**
 * Type guard to check whether an object is of type `OpenApiEnumSchema`.
 * @param obj Object to check.
 * @returns True if the object is an enum schema, false otherwise.
 */
export function isEnumSchema(obj: any): obj is OpenApiEnumSchema {
  return obj?.enum;
}

/**
 * Type guard to check whether an object is of type `OpenApiOneOfSchema`.
 * @param obj Object to check.
 * @returns True if the object is an oneOf schema, false otherwise.
 */
export function isOneOfSchema(obj: any): obj is OpenApiOneOfSchema {
  return obj?.oneOf;
}

/**
 * Type guard to check whether an object is of type `OpenApiAllOfSchema`.
 * @param obj Object to check.
 * @returns True if the object is an allOf schema, false otherwise.
 */
export function isAllOfSchema(obj: any): obj is OpenApiAllOfSchema {
  return obj?.allOf;
}

/**
 * Type guard to check whether an object is of type `OpenApiAnyOfSchema`.
 * @param obj Object to check.
 * @returns True if the object is an anyOf schema, false otherwise.
 */
export function isAnyOfSchema(obj: any): obj is OpenApiAnyOfSchema {
  return obj?.anyOf;
}

/**
 * Type guard to check whether an object is of type `OpenApiNotSchema`.
 * @param obj Object to check.
 * @returns True if the object is a not schema, false otherwise.
 */
export function isNotSchema(obj: any): obj is OpenApiNotSchema {
  return obj?.not;
}

// TODO: handle duplicates after pascal case => my-type, MyType
/**
 * Parse the type name of a reference object.
 * @param obj Reference object to get the type name from.
 * @returns Parsed type name.
 */
export function parseTypeNameFromRef(
  obj: OpenAPIV3.ReferenceObject | string
): string {
  return pascalCase(parseType(obj));
}

/**
 * Parse the file name for a serialized reference object.
 * @param obj Reference object to get the type name from.
 * @returns Parsed file name.
 */
export function parseFileNameFromRef(
  obj: OpenAPIV3.ReferenceObject | string
): string {
  return kebabCase(parseType(obj));
}

function parseType(obj: OpenAPIV3.ReferenceObject | string): string {
  const ref = isReferenceObject(obj) ? obj.$ref : obj;
  return last(ref.split('/'))!;
}
