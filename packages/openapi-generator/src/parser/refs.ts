import { last, pascalCase, kebabCase } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { $Refs } from '@apidevtools/swagger-parser';
import {} from 'voca';

/**
 * Type guard to check whether an object is of type `OpenAPIV3.ReferenceObject`.
 * @param obj Object to check.
 * @returns True if the object is a reference object, false otherwise.
 */
export function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return !!obj?.$ref;
}

/**
 * Parse the type name of a reference object.
 * @param obj Reference object to get the type name from.
 * @returns Parsed type name.
 */
export function parseTypeName(obj: OpenAPIV3.ReferenceObject): string {
  // TODO: How do we know that this is correct?
  return pascalCase(last(obj.$ref.split('/'))!);
}

export function parseFileName(obj: OpenAPIV3.ReferenceObject): string {
  // TODO: How do we know that this is correct?
  return kebabCase(last(obj.$ref.split('/'))!);
}

/**
 * Check whether the given object is a reference object and resolve if necessary.
 * This operates only on the current level and does not resolve the object recursively.
 * @param obj Object to resolve if necessary.
 * @param refs References to resolve by.
 * @returns A resolved object.
 */
export function resolveObject<T>(
  obj: T | OpenAPIV3.ReferenceObject,
  refs: $Refs
): T {
  return isReferenceObject(obj) ? refs.get(obj.$ref) : obj;
}
