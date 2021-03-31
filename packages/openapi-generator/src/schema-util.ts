import { kebabCase, last } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import {
  OpenApiAllOfSchema,
  OpenApiAnyOfSchema,
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiNotSchema,
  OpenApiObjectSchema,
  OpenApiOneOfSchema,
  OpenApiReferenceSchema,
  OpenApiSchema
} from './openapi-types';

/**
 * Collect all unique reference schemas within a schema.
 * @param schema Parsed schema to retrieve all references for.
 * @returns Returns a list of unique reference schemas within a schema.
 */
export function collectRefs(
  schema: OpenApiSchema | undefined
): OpenApiReferenceSchema[] {
  return getUniqueRefs(collectAllRefs(schema));
}

/**
 * Collect all reference schemas within a schema.
 * The resulting list of references might contain duplicates.
 * @param schema Parsed schema to retrieve all references for.
 * @returns Returns a list of reference schemas within a schema. Might contain duplicates.
 */
function collectAllRefs(
  schema: OpenApiSchema | undefined
): OpenApiReferenceSchema[] {
  if (!schema) {
    return [];
  }
  if (isReferenceObject(schema)) {
    return [schema];
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce((refs, value) => [...refs, ...collectAllRefs(value)], []);
}

/**
 * Reduce a list of reference schemas to a list of unique reference schemas, based on $ref.
 * @param refs List of reference schemas.
 * @returns List of unique reference schemas.
 */
export function getUniqueRefs(
  refs: OpenApiReferenceSchema[]
): OpenApiReferenceSchema[] {
  return refs.reduce((uniqueRefs: OpenApiReferenceSchema[], collectedRef) => {
    if (!uniqueRefs.some(ref => ref.$ref === collectedRef.$ref)) {
      uniqueRefs.push(collectedRef);
    }
    return uniqueRefs;
  }, []);
}

/**
 * Check whether a schema includes the not schema.
 * @param schema Parsed schema to check.
 * @returns True if the parsed schema contains am not schema, false otherwise.
 */
export function hasNotSchema(schema: OpenApiSchema | undefined): boolean {
  if (!schema) {
    return false;
  }
  if (isNotSchema(schema)) {
    return true;
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .some(value => hasNotSchema(value));
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
  return obj?.items;
}

/**
 * Type guard to check whether an object is of type `OpenApiObjectSchema`.
 * @param obj Object to check.
 * @returns True if the object is an object schema, false otherwise.
 */
export function isObjectSchema(obj: any): obj is OpenApiObjectSchema {
  return obj?.properties;
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

/**
 * Parse the type name of a reference object.
 * @param obj Reference object to get the type name from.
 * @param schemaRefMapping Mapping between reference paths and schema names.
 * @returns Parsed type name.
 */
export function parseTypeNameFromRef(
  obj: OpenAPIV3.ReferenceObject | string,
  schemaRefMapping: Record<string, string>
): string {
  const ref = isReferenceObject(obj) ? obj.$ref : obj;
  const schemaName = schemaRefMapping[ref];
  if (!schemaName) {
    throw new Error(
      `Could not find schema name for reference path '${ref}'. Schema does not exist.`
    );
  }
  return schemaName;
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
