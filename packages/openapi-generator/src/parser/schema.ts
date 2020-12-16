import { OpenAPIV3 } from 'openapi-types';

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

/**
 * Type guard to check whether an object is of type `OpenAPIV3.NonArraySchemaObject`.
 * @param obj Object to check.
 * @returns True if the object is a non-array schema object, false otherwise.
 */
export function isNonArraySchemaObject(
  obj: any
): obj is OpenAPIV3.NonArraySchemaObject {
  return !!obj?.type && obj.type !== 'array';
}
